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
    dispatch(addChat({ message: input, image: image }));
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input, image: image }),
    });
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
    <main>
      <Toaster />
      <h1>Chat</h1>
      <ul>
        {/* @ts-ignore */}
        {chat.map((chat: Chat, index: number) => (
          <li key={index}>
            <p>{chat.message}</p>
            {chat.image && (
              <Image src={chat.image} alt="image" width={150} height={150} />
            )}
          </li>
        ))}
      </ul>

      <UploadButton
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
      <input type="text" onChange={(e) => handleInput(e)} />
      <button onClick={() => handleAddChat()}>Add</button>
    </main>
  );
}
