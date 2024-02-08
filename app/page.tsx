'use client';

import { useAppDispatch, useAppSelector } from '@/helper/hook';
import { addChat, clearChat } from '@/features/chats/chatSlice';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { UploadButton } from '@/utils/uploadthing';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

interface Chat {
  profile: string;
  name: string;
  message: string;
  image: string;
}

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [name, setName] = useState<string>('');

  const chat = useAppSelector((state) => state.chat.chats);
  const profile = useAppSelector((state) => state.profile.profile);

  const dispatch = useAppDispatch();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleAddChat = async () => {
    if (input === '' && image === '') {
      toast.error('Please enter a message or upload an image');
      return;
    }

    dispatch(
      addChat({
        name: name,
        profile:
          profile ||
          'https://ik.imagekit.io/hbzknb1hm/user.png?updatedAt=1707320612235',
        message: input,
        image: image,
      }),
    );

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        profile:
          profile ||
          'https://ik.imagekit.io/hbzknb1hm/user.png?updatedAt=1707320612235',
        message: input,
        image: image,
      }),
    });

    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
    }
  };

  const loadingToast = (loading: boolean) => {
    if (loading) {
      toast.loading('Uploading...');
    } else {
      toast.dismiss();
    }
  };

  useEffect(() => {
    // for every 1 second, fetch the chat
    const interval = setInterval(async () => {
      const response = await fetch('/api/chat');
      const data = await response.json();
      dispatch(clearChat());
      data.forEach((chat: Chat) => {
        dispatch(addChat(chat));
      });
      console.log('Chat: ', chat);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const myName = localStorage.getItem('name');
    if (myName) {
      setName(myName);
    } else {
      toast((t) => (
        <span className='flex gap-3'>
          <input
            type='text'
            className='border-2 border-black-700 rounded-sm h-9 w-[200px] p-2'
            onChange={(e) => {
              // @ts-ignore
              setName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                toast.dismiss(t.id);
                setName((prev) => {
                  localStorage.setItem('name', prev);
                  toast.success(`Name set to ${prev}`);
                  return prev;
                });
              }
            }}
          />
          <button
            className='bg-black text-white rounded-sm hover:bg-white hover:border-2 hover:border-black hover:text-black font-medium transition ease-in-out duration-200 p-2'
            onClick={() => {
              toast.dismiss(t.id);
              setName((prev) => {
                localStorage.setItem('name', prev);
                toast.success(`Name set to ${prev}`);
                return prev;
              });
            }}
          >
            Set Name
          </button>
        </span>
      ));

      return () => {
        toast.dismiss();
      };
    }
  }, []);

  useEffect(() => {
    if (name) {
      toast.success(`Welcome ${name}`);
    }
  }, []);

  return (
    <main className='flex flex-col gap-2 p-10'>
      <Toaster />
      <Link
        href='/profile'
        className='absolute top-5 right-5 bg-black text-white font-bold p-2 rounded-md hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-200 ease-in-out'
      >
        Set Profile
      </Link>
      <h1 className='text-center font-black text-3xl mb-5'>Chaty</h1>
      <div className='relative'></div>
      <ul className='overflow-y-scroll max-h-[80vh] no-scrollbar flex flex-col gap-4'>
        {/* @ts-ignore */}
        {chat.map((chat: Chat, index: number) => (
          <li key={index} className='w-full'>
            <div
              className={`flex flex-col gap-4 p-4 justify-center bg-black text-white rounded-md ${
                index % 2 == 0 ? 'float-start' : 'float-end'
              }`}
            >
              <div className='flex gap-2 items-center'>
                <Image
                  src={chat.profile as string}
                  alt='profile'
                  width={30}
                  height={30}
                />
                <p className='font-bold'>{chat.name}</p>
              </div>
              {chat.image && (
                <Image src={chat.image} alt='image' width={100} height={100} />
              )}
              {chat.message && (
                <p className='font-medium mt-3'>{chat.message}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className='flex items-center justify-center gap-2'>
        <input
          type='text'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddChat();
            }
          }}
          onChange={(e) => handleInput(e)}
          className='border-2 border-black h-10 w-1/2 p-2 rounded-sm'
        />
        <UploadButton
          className='mt-6'
          endpoint='imageUploader'
          // @ts-ignore
          onBeforeUploadBegin={(file: File) => {
            loadingToast(true);
          }}
          onClientUploadComplete={(res: any) => {
            // Do something with the response
            toast.dismiss();
            toast.success('Upload complete!');
            setImage(res[0].url);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            toast.error(`ERROR! ${error.message}`);
            loadingToast(false);
          }}
        />
        <button
          className={`bg-black text-white px-6 py-2 rounded-sm hover:bg-white hover:border-2 hover:border-black hover:text-black font-bold transition ease-in-out duration-200`}
          onClick={() => handleAddChat()}
        >
          Send
        </button>
      </div>
    </main>
  );
}
