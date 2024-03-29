import { ConfigProvider, Layout } from 'antd'
import { Navigate, Outlet } from 'react-router-dom'

export default function AuthLayout() {
    const token = localStorage.getItem('token')

    if (token) {
        return <Navigate to="/dashboard" />
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
                },
            }}
        >
            <Layout style={{ minHeight: "100vh", overflow: "auto" }}>
                <Layout.Content>
                    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,var(--blue-200),transparent)]"></div></div>
                    <Outlet />
                </Layout.Content>
            </Layout>
        </ConfigProvider>
    )
}