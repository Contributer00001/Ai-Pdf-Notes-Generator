import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function WorkspaceHeader() {

    return (
        <div className='p-4 flex justify-between'>
            <div className='flex items-center justify-center'>
                <Image src={'/pdf.png'} alt='logo' width={70} height={70} />
                <span className='text-black font-bold text-xl justify-center'>AI  </span>
                <span className='text-red-500 font-bold text-xl justify-center'> PDF </span>
                <span className='text-black font-bold text-xl justify-center'> NOTES </span>
            </div>
            <UserButton />
        </div>
    )

}
export default WorkspaceHeader
