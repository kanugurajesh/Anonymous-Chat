'use client';
import { useAppDispatch, useAppSelector } from '@/helper/hook';
import { addProfile, clearProfile } from '@/features/profile/profileSlice';
import { addName, clearName } from '@/features/name/nameSlice';
import { UploadButton } from '@uploadthing/react';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';

export default function Profile() {
  const profile = useAppSelector((state) => state.profile.profile);
  const name = useAppSelector((state) => state.name.name);
  
  const dispatch = useAppDispatch();
  return (
    <main className='flex flex-col justify-center items-center h-screen'>
      <Toaster />
      <h1 className='font-black text-xl'>Set Profile</h1>
      {profile && (
        <Image src={profile} alt='profile' width={200} height={200} />
      )}
      {name && <h2 className='font-black text-xl'>{name}</h2>}
      {/* @ts-ignore */}
      <UploadButton
        className='mt-6'
        endpoint='imageUploader'
        // @ts-ignore
        onBeforeUploadBegin={(file: File) => {
          toast.loading('Uploading...');
        }}
        onClientUploadComplete={(res: any) => {
          dispatch(addProfile(res[0].url));
          toast.dismiss();
          toast.success('Profile picture uploaded');
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          toast.error(`ERROR! ${error.message}`);
          toast.error(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
