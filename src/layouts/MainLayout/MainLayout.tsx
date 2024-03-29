import { ConfigProvider, Layout } from 'antd'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { useGetUserDetails } from '../../api/user.hooks'
import { useEffect } from 'react'
import { auth } from '../../firebase'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/slices/userSlice'

export default function MainLayout() {
    const token = localStorage.getItem('token')
    const user = useGetUserDetails()
    const dispatch = useDispatch()

    useEffect(() => {
        if (user.data) {
            auth.onAuthStateChanged((user) => {
                if (!user) {
                    localStorage.removeItem('token')
                }
            })
            dispatch(setUser({
                email: user.data.email,
                name: user.data.displayName,
                _id: user.data.uid,
            }))
        }
    }, [user.data])
    if (!token) {
        return <Navigate to="/" />
    }
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#6d28d9",
                    colorText: "var(--gray-800)",
                    borderRadius: 6,
                    fontFamily: "'Inter', sans-serif",
                },
                components: {
                    Layout: {
                        bodyBg: "transparent",
                        headerBg: "white",
                    },
                    Segmented: {
                        borderRadius: 6,
                        itemSelectedBg: "#6d28d9",
                        itemSelectedColor: "white",
                    }
                },
            }}
        >
            <Layout style={{ minHeight: "100vh", overflow: "auto" }}>
                <Header />
                <Sidebar />
                <Layout.Content
                    className='h-full relative overflow-y-auto transition-all duration-300 ease-in-out px-4 py-4 mt-[var(--header-height)] lg:ml-[var(--sidebar-width)]  min-h-screen'
                >
                    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" style={{ backgroundAttachment: "fixed" }}></div>
                    <Outlet />
                </Layout.Content>
            </Layout>
        </ConfigProvider>
    )
}