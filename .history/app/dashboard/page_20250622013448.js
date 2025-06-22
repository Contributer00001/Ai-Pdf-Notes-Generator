"use client"
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../convex/_generated/api'

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
                {fileList.map((file,index)=>(
                    <div
                ))}
            </div>

        </div>
    )
}

export default Dashboard
