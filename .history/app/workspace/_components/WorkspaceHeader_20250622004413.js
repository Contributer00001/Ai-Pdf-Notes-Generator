import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import Button from "../../../components/ui/button"

function WorkspaceHeader({fileName}) {

    return (
        <div className='p-4 flex justify-between shadow-md items-center'>
            <div className='flex items-center justify-center'>
                <Image src={'/pdf.png'} alt='logo' width={70} height={70} />
                <span className='text-black font-bold text-xl justify-center'>AI  </span>
                <span className='text-red-500 font-bold text-xl justify-center'> PDF </span>
                <span className='text-black font-bold text-xl justify-center'> NOTES </span>
            </div>
            <h1 className='font-bold text-xl'>{fileName}</h1>
            <div className='flex gap-2 items-center'>
                <Button }>Save</Button>
            <UserButton />
            </div>
        </div>
    )

}
export default WorkspaceHeader
