'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import Logo from '../../public/images/twitterLogo.avif'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLoginMutation } from '@/hooks/loginHook';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/firebase';

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const loginMutation = useLoginMutation();

  const handleLogin = () => {
    loginMutation.mutate(user)
  }



  return (
    <div className='w-screen h-screen flex justify-center'>
      <div className='w-1/5 mt-10'>
        <div className='flex justify-center'>
          <Image src={Logo} className='h-auto w-20' alt='logo' />
        </div>
        <p className='text-2xl text-center font-bold mb-10'>Login to your account</p>
        <div className='mt-8'>
          <Label className={'mb-2'}>Email</Label>
          <Input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className={'mb-4'} type="text" />
          <Label className={'mb-2'}>Password</Label>
          <Input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className={'mb-4'} type="text" />
          <Button onClick={handleLogin} variant={'secondary'} className={'rounded-full w-full mb-5'}>{loginMutation.isPending ? "Processing" : 'Login'}</Button>
        </div>
        <div className='mt-4 opacity-50 my-5'>
          <hr />
          <p className='text-center -mt-3 bg-black px-2 w-fit m-auto'>OR</p>
        </div>
        {/* <Button onClick={handleGoogleLogin} variant={'secondary'} className={'rounded-full w-full mb-5'}>Google</Button>
        <Button variant={'secondary'} className={'rounded-full w-full mb-5'}>Github</Button>
         */}
        <p className='text-center font-semibold mt-20 mb-5'>Don't have an account</p>
        <Button onClick={() => router.push('/signup')} variant={'secondary'} className={'rounded-full w-full'}>Sign up</Button>
      </div>
    </div>
  );
}
