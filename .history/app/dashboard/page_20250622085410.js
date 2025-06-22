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

            <div className='grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10 '>
                {fileList?.length>0 ? fileList?.map((file,index)=>(
                    <div key={index} className='flex p-5 shadow-md rounded-md flex-col justify-center items-center
                    border cursor-pointer hover:scale-105 transition-all'>
                       <Image src={'/pdf1.png'} alt='file' width={50} height={50}/>
                       <h2 className='mt-3 font-medium '>{file?.fileName}</h2>
                       {/* <h2>{file?._creationTime}</h2> */}
                    </div>
                ))
                : [1,2,3,4,5,6,7].map
                <div>

                </div>
                }
            </div>

        </div>
    )
}

export default Dashboard
