import { Button, Form, Input, message } from 'antd';
import React from 'react'
import { useUserRegister } from '../../../../api/user.hooks';
type Props = {
    setType: React.Dispatch<React.SetStateAction<"login" | "register">>
}
export default function Register({ setType }: Props) {
    const [registerForm] = Form.useForm();
    const register = useUserRegister()
    const handleSubmitRegister = (values: { name: string, email: string, password: string }) => {
        register.mutateAsync(values).then(() => {
            setType('login')
        }).catch((err) => {
            message.error(err.message)
        })
    }
    const handleChangeType = () => {
        setType('login')
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
                                    form={registerForm}
                                    name="basic"
                                    onFinish={handleSubmitRegister}
                                >
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your name!',
                                            },
                                        ]}>
                                        <Input placeholder="Name" />
                                    </Form.Item>
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
                                            Register
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                            <div className="text-base font-semibold leading-7">
                                <p className="text-gray-900 flex">Already have an account here ? <p className="text-orange-600 m-0 ml-2 cursor-pointer" onClick={handleChangeType}>Login</p></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 h-[100%] hidden lg:block p-[0!important] shadow-md">
                <div className='bg-white h-[100%] flex items-center justify-center'>
                    <img className='w-[600px] h-[600px]' src="./register.svg" alt="" />
                </div>
            </div>
        </div>
    )
}
