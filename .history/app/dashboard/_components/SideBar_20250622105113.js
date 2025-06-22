"use client"
import Image from 'next/image'
import React from 'react'
import Button from '../../../components/ui/button'
import { Layout, Shield } from 'lucide-react'
import { Progress } from '../../../components/ui/progress'
import UploadPdfDialog from './UploadPdfDialog'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { usePathname } from 'next/navigation'

function SideBar() {
     const {user} = useUser()
     const path = usePathname()
     const normalizedPath = path.replace(/\/+$/, '');
    const fileList= useQuery(api.fileStorage.GetUserFiles,{
        userEmail:user?.primaryEmailAddress?.emailAddress
    });
    return (

        <div className='shadow-md h-screen p-7'>
            <div className='flex items-center justify-center'>
                <Image src={'/pdf.png'} alt='logo' width={70} height={70} />
                <span className='text-black font-bold text-xl justify-center'>AI  </span>
                <span className='text-red-500 font-bold text-xl justify-center'> PDF </span>
                <span className='text-black font-bold text-xl justify-center'> NOTES </span>
            </div>
            <div className='mt-10 ml-5'>
                <UploadPdfDialog isMaxFile={fileList?.length>=5 ? true : false}>
                    <Button>+ Upload Pdf</Button>
                </UploadPdfDialog>
                <Link href={'/dashboard'}>
                <div className={`flex gap-2 items-center py-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer
                    ${normalizedPath === '/dashboard' &&'bg-slate-200'}`}>
                    <Layout />
                    <h2>Workspace</h2>
                </div>
                <div className={`flex gap-2 items-center py-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer
                    ${normalizedPath === '/dashboard/upgrade' &&'bg-slate-200'}`}>
                    <Shield />
                    <h2>Upgrade</h2>
                </div>
            </div>
            <div className='absolute bottom-20 w-[80%]'>
                <Progress value={(fileList?.length/5)*100} />
                <p className='text-sm mt-1'>{fileList?.length} out of 5 pdf uploaded</p>

                <p className='text-sm text-gray-500 mt-2'>Upgrade to Upload more pdf</p>
            </div>
        </div>
    )
}

export default SideBar
