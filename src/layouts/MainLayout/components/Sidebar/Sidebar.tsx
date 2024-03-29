import { Layout, Menu } from 'antd'
import { TbCode, TbList, TbListCheck, TbLogout, TbTemplate, TbUsers } from 'react-icons/tb'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setHeader } from '../../../../store/slices/headerSlice'
import { useEffect, useState } from 'react'
import styles from './Sidebar.module.scss'

const userMenu = [
    {
        key: 'todos',
        title: 'Todos',
        icon: <TbList />,
        url: '/dashboard'
    },
]


export default function Sidebar() {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    const handleChangePage = (name: string) => {
        dispatch(setHeader(name));
    }
    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
        window.location.href = "/"
    }

    useEffect(() => {
        const userHeaderName = userMenu.filter(menu => menu.url === pathname)[0]?.title

        const headerName = userHeaderName
        handleChangePage(headerName)
    }, [])
    return (
        <Layout.Sider
            collapsed={sidebarCollapsed}
            breakpoint='lg'
            className={`bg-[var(--gray-900)!important] fixed h-full z-50 left-0 top-0 w-[var(--sidebar-width)] transition-all duration-300 ease-in-out ${styles.sidebar}`}
            width={`var(--sidebar-width)`}
            collapsedWidth="0"
            onCollapse={(collapsed) => {
                setSidebarCollapsed(collapsed)
            }}
            zeroWidthTriggerStyle={{
                top: "12px"
            }}
        >
            <div className='p-6 pt-5 flex gap-3 items-center'>
                <img src="/vite.svg" alt="" />
                <h3 className='text-white'>Track list</h3>
            </div>
            <Menu
                // theme='dark'
                mode='inline'
                key={pathname}
                defaultSelectedKeys={[pathname]}
                className={`${styles.menu_list} border-none`}
            >
                {userMenu.map((menu) => (
                    <Menu.Item key={menu.url} icon={menu.icon}
                        onClick={() => handleChangePage(menu.title)}
                    >
                        <Link to={menu.url}>
                            {menu.title}
                        </Link>
                    </Menu.Item>
                ))}
            </Menu>
            <div className={styles.sider_footer}>
                <div className={styles.logout} onClick={handleLogout}>
                    <p>Logout</p>
                    <TbLogout />
                </div>
            </div>
        </Layout.Sider>
    )
}