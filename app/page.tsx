"use client";

import { useAppDispatch, useAppSelector } from "@/helper/hook";
import { addChat } from "@/features/chats/chatSlice";
import { useState, useEffect } from "react";
import { UploadButton } from "@/utils/uploadthing";

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

  const handleAddChat = () => {
    dispatch(addChat({ message: input, image: image }));
  };

  useEffect(() => {
    console.log(chat);
  }, [chat]);

  return (
    <main>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res:any) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      <input type="text" onChange={(e) => handleInput(e)}/>
      <button onClick={() => handleAddChat()}>Add</button>
    </main>
  );
}
