'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/helper/hook';
import { addProfile, clearProfile } from '@/features/profile/profileSlice';
import { addName, clearName } from '@/features/name/nameSlice';
import Link from 'next/link';
import { UploadButton } from '@uploadthing/react';
import { MdOutlineSend } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';

export default function Profile() {
  const [input, setInput] = useState<string>('');
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    const localName = localStorage.getItem('name');
    const localProfile = localStorage.getItem('profile');

    if (localName) {
      setInput(localName);
    }

    if (localProfile) {
      setImage(localProfile);
    }
  }, []);

  const profile = useAppSelector((state) => state.profile.profile);
  const name = useAppSelector((state) => state.name.name);

  const dispatch = useAppDispatch();
  return (
    <main className='flex flex-col justify-center items-center h-screen gap-4'>
      <Toaster />
      <Link
        href='/'
        className='absolute top-5 left-5 bg-black text-white font-bold p-2 rounded-md hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-200 ease-in-out'
      >
        Go Back
      </Link>
      <Link
        href='/Contact'
        className='absolute top-5 right-5 bg-black text-white font-bold p-2 rounded-md hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-200 ease-in-out'
      >
        Contact Me
      </Link>
      <h1 className='font-black text-xl'>Set Profile</h1>
      {(profile || image) && (
        <img
          src={profile || image}
          alt='profile'
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      )}
      {(name || input) && (
        <h2 className='font-black text-xl'>{name || input}</h2>
      )}
      {/* @ts-ignore */}
      <UploadButton
        className='mt-6'
        endpoint='imageUploader'
        // @ts-ignore
        onBeforeUploadBegin={(file: File) => {
          console.log(file);
          // @ts-ignore
          toast.loading(`Uploading... ${file[0].name}`);
        }}
        onClientUploadComplete={(res: any) => {
          setImage(res[0].url);
          toast.dismiss();
          toast.success('Profile picture uploaded');
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          toast.dismiss();
          toast.error(`ERROR! ${error.message}`);
        }}
      />
      <div className='flex gap-2 justify-center items-center relative'>
        <input
          type='text'
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (input === '' && image === '') {
                toast.error('Please set profile and name');
                return;
              }
              if (input) {
                dispatch(addName(input));
                localStorage.setItem('name', input);
                toast.success('Name set');
              }
              if (image) {
                dispatch(addProfile(image));
                localStorage.setItem('profile', image);
                toast.success('Profile picture set');
              }
            }
          }}
          className='border-2 border-black h-10 max-x-[100px] p-2 rounded-sm'
        />
        <MdOutlineSend
          onClick={() => {
            if (input === '' && image === '') {
              toast.error('Please set profile and name');
              return;
            }
            if (input) {
              dispatch(addName(input));
              localStorage.setItem('name', input);
              toast.success('Name set');
            }
            if (image) {
              dispatch(addProfile(image));
              localStorage.setItem('profile', image);
              toast.success('Profile picture set');
            }
          }}
          className='w-8 h-8 bg-black text-white font-bold p-2 rounded-lg hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-200 ease-in-out outline-none outline-0 absolute top-[3.5px] right-1 mr-[1px]'
        />
      </div>
    </main>
  );
}
