import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import logo from '../../../public/logo.svg'
import { isAuthenticated } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation'
import SignOutButton from '../../../components/SignOutButton'
redirect
const  RootLayout= async ({children}: {children:ReactNode}) => {

  const isUserAuthenticated = await isAuthenticated(); 
  if(!isUserAuthenticated) redirect('/sign-in');
  return (
    <div className='root-layout'>
        <nav className="flex justify-between items-center px-4 py-2 ">
            <Link href='/' className='flex items-center gap-2'>
            <Image src={logo} alt="Logo" width={38} height={32}/>
            <h2 className='text-primary-100'>MockMate</h2>

            </Link>
            <SignOutButton />

        </nav>
        {children}
    </div>
  )
}

export default RootLayout