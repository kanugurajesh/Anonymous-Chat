'use client';
import { useAppDispatch, useAppSelector } from '@/helper/hook';
import { addProfile, clearProfile } from '@/features/profile/profileSlice';
import { UploadButton } from '@uploadthing/react';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';

export default function Profile() {
  const profile = useAppSelector((state) => state.profile.profile);
  const dispatch = useAppDispatch();
  return (
    <main>
      <Toaster />
      <h1>Set Profile</h1>
      <Image src={profile} alt='profile' width={200} height={200} />
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
