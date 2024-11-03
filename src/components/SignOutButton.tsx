'use client'
import React from 'react'
import { Button } from './ui/button'
import { logOut } from '@/app/authenticate/auth.action'

type Props = {
    children: React.ReactNode
}

const SignOutButton = ({ children }: Props) => {
    return (
        <Button className='bg-transparent text-black border-0 hover:bg-transparent' onClick={() => { logOut() }}>{children}</Button>
    )
}

export default SignOutButton