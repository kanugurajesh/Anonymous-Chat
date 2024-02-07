"use client";

import { useAppDispatch, useAppSelector } from "@/helper/hook";
import { addChat, clearChat } from "@/features/chats/chatSlice";
import { useState, useEffect } from "react";
import Image from "next/image";
import { UploadButton } from "@/utils/uploadthing";
import toast, { Toaster } from "react-hot-toast";

interface Chat {
  message: string;
  image: string;
}

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const chat = useAppSelector((state) => state.chat.chats);

  const dispatch = useAppDispatch();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleAddChat = async () => {

    if(input === "") {
      toast.error("Please enter a message");
      return;
    }

    dispatch(addChat({ message: input, image: image }));

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input, image: image }),
    });

    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
    }
  };

  const loadingToast = (loading: boolean) => {
    if (loading) {
      toast.loading("Uploading...");
    } else {
      toast.dismiss();
    }
  };

  useEffect(() => {
    // for every 1 second, fetch the chat
    const interval = setInterval(async () => {
      const response = await fetch("/api/chat");
      const data = await response.json();
      dispatch(clearChat());
      data.forEach((chat: Chat) => {
        dispatch(addChat(chat));
      });
      console.log("Chat: ", chat);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-col gap-2 p-10">
      <Toaster />
      <h1 className="text-center font-black text-3xl">Chaty</h1>
      <ul>
        {/* @ts-ignore */}
        {chat.map((chat: Chat, index: number) => (
          <li key={index} className="mb-5">
            <div className="flex flex-col gap-3 justify-center">
              {chat.image && (
                <Image src={chat.image} alt="image" width={100} height={100} className="float-left"/>
              )}
              <p className="bg-black text-white mr-auto p-2 rounded-sm">{chat.message}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2">
        <input
          type="text"
          onChange={(e) => handleInput(e)}
          className="border-2 border-black h-10 w-1/2 p-2 rounded-sm"
        />
        <UploadButton
        className="mt-6"
          endpoint="imageUploader"
          // @ts-ignore
          onBeforeUploadBegin={(file: File) => {
            loadingToast(true);
          }}
          onClientUploadComplete={(res: any) => {
            // Do something with the response
            toast.dismiss();
            toast.success("Upload complete!");
            setImage(res[0].url);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            toast.error(`ERROR! ${error.message}`);
            loadingToast(false);
          }}
        />
        <button className="bg-black text-white px-6 py-2 rounded-sm hover:bg-white hover:border-2 hover:border-black hover:text-black font-bold transition ease-in-out duration-200" onClick={() => handleAddChat()}>Add</button>
      </div>
    </main>
  );
}
