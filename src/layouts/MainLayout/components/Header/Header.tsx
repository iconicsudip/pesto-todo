import { Avatar, Layout } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'

export default function Header() {
    const headerDetails = useSelector((state: any) => state.headerDetails)
    const userDetails = useSelector((state: RootState) => state.userDetails)

    return (
        <Layout.Header
            className=' lg:ml-[var(--sidebar-width)] fixed z-50 top-0 right-0 left-0 bg-white h-[var(--header-height)] border border-border-on-light transition-all duration-300 ease-in-out flex items-center justify-between px-4 shadow-sm'
        >
            <div className="flex justify-between w-full">
                <h2>{headerDetails.name}</h2>
                <div></div>
                <div className='flex gap-2 items-center'>
                    <Avatar size={40} src="https://api.dicebear.com/7.x/lorelei/svg" />
                    <div className='flex flex-col' style={{ lineHeight: 1.5 }}>
                        <h3>{userDetails?.name ?? "First Last"}</h3>
                        <p className="text-gray-500">{userDetails?.email ?? "Email"}</p>
                    </div>
                </div>
            </div>

        </Layout.Header>
    )
}