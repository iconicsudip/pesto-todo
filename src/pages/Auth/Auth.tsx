import React, { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register/Register'

export default function Auth() {
    const [type, setType] = useState<'login' | 'register'>('login')
    return (
        <div>
            {type === 'login' && <Login setType={setType} />}
            {type === 'register' && <Register setType={setType} />}
        </div>
    )
}
