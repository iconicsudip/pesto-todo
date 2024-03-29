import { Button, Form, Input, message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserLogin } from '../../../../api/user.hooks'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../../store/slices/userSlice'

type Props = {
    setType: React.Dispatch<React.SetStateAction<"login" | "register">>
}

export default function Login({ setType }: Props) {
    const [loginForm] = Form.useForm();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const login = useUserLogin()
    const handleSubmitLogin = (values: { email: string, password: string }) => {
        login.mutateAsync(values).then(async (data) => {
            dispatch(setUser({
                name: data.user?.displayName,
                email: data.user?.email,
                _id: data.user?.uid
            }))
            const token = await data.user?.getIdToken()
            localStorage.setItem("token", token!)
            localStorage.setItem("refreshToken", data?.user?.refreshToken ?? '')
            navigate('/dashboard')
            message.success('Login success')
        }).catch((err) => {
            message.error(err.message)
        })
    }
    const handleChangeType = () => {
        setType('register')
    }

    return (
        <div className='flex flex-wrap h-screen items-center'>
            <div className="col-12 col-lg-6 h-[100%] flex items-center p-[0!important] justify-center">
                <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
                    <div className="mx-auto max-w-md">
                        <h1 className="text-[2rem] font-bold">Login</h1>
                        <p className="text-gray-500">Welcome back to the fcm service. Sign in to continue using the service.</p>
                        <div className="divide-y divide-gray-300/50">
                            <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
                                <Form
                                    layout="vertical"
                                    form={loginForm}
                                    name="basic"
                                    onFinish={handleSubmitLogin}
                                >
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your email!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Email" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input.Password placeholder="Password" />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="w-full" >
                                            Login
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                            <div className="text-base font-semibold leading-7">
                                <p className="text-gray-900 flex">Don't have an account here ? <p className="text-orange-600 m-0 ml-2 cursor-pointer" onClick={handleChangeType}>Register</p></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 h-[100%] hidden lg:block p-[0!important] shadow-md">
                <div className='bg-white h-[100%] flex items-center justify-center'>
                    <img className='w-[600px] h-[600px]' src="./login.svg" alt="" />
                </div>
            </div>
        </div>
    )
}