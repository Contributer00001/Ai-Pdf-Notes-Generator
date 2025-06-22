import { useUser } from '@clerk/nextjs'
import React from 'react'

function Dashboard() {
    const {user} = useUser()
    return (
        <div>
            <h2 className='font-bold text-2xl'>Workspace</h2>

        </div>
    )
}

export default Dashboard
