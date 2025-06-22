"use client"
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../convex/_generated/api'
import Image from 'next/image'

function Dashboard() {
    const {user} = useUser()

    const fileList= useQuery(api.fileStorage.GetUserFiles,{
        userEmail:user?.primaryEmailAddress?.emailAddress
    });

    console.log(fileList)
    return (
        <div>
            <h2 className='font-bold text-2xl'>Workspace</h2>

            <div>
                {fileList&&fileList?.map((file,index)=>(
                    <div key={index}>
                       <Image src={'/pdf1.png'} alt='file' width={50} height={50}/>
                       <h2>{file?.fileName}</h2>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Dashboard
