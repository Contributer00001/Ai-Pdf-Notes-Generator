import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import React from 'react'

function Dashboard() {
    const {user} = useUser()

    const fileList= useQuery
    return (
        <div>
            <h2 className='font-bold text-2xl'>Workspace</h2>

        </div>
    )
}

export default Dashboard
