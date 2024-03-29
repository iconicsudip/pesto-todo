import { Badge, Segmented, Select, Table, message } from 'antd';
import { useEffect, useState } from 'react'
import { useResponsive } from '../../../../utils/useResponsive';
import { T_Task } from '../../../../types/task';
import dayjs from 'dayjs';
import { useUpdateTask } from '../../../../api/task.hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { TbTrash } from 'react-icons/tb';
import DeleteTaskModal from '../DeleteTaskModal';
import TaskDrawer from '../../../../components/TaskDrawer';

type Props = {
    taskList: T_Task[] | undefined
    loading: boolean,
    setTab: React.Dispatch<React.SetStateAction<string>>
}
export default function TaskList({ taskList, loading, setTab }: Props) {
    const [currentTab, setCurrentTab] = useState('All');
    const [currentTask, setCurrentTask] = useState<T_Task | null>(null);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const updateTask = useUpdateTask(currentTab);
    const [deleteModal, setDeleteModal] = useState(false);
    const { isMobile } = useResponsive();
    const [selectedTaskId, setSelectedTaskId] = useState<string>("")
    const handleOpenDelete = (_id:string) => {
        setDeleteModal(true)
        setSelectedTaskId(_id)
    }
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc',
            width: 300,
            render: (text: string) => {
                const isLong = text.length > 30;
                return <p className='text-sm text-gray-500'>
                    {isLong ? text.slice(0, 30) + '...' : text}
                </p>
            }
        },
        {
            title: 'Assigned',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => {
                const formattedDate = dayjs(date).format('DD MMM, YYYY');
                return <p className='text-sm text-gray-500 w-[100px]'>{formattedDate}</p>
            }
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
            render: (date: string) => {
                const formattedDate = dayjs(date).format('DD MMM, YYYY');
                return <p className='text-sm text-gray-500 w-[100px]'>{formattedDate}</p>
            }
        },
        {
            title: 'Task type',
            dataIndex: 'type',
            key: 'type',
            render: (type: string,data:any) => {
                // const taskType = type === 'bug' ? 'error' : type === 'task' ? 'processing' : 'warning';
                // const taskTypeName = type[0].toUpperCase() + type.slice(1)
                const taskTypeClass = type === 'bug' ? 'bg-red-100 text-red-600' : type === 'task' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600';
                return <div className={isMobile ? `w-[120px]` : ``}>
                    <Select
                        onClick={(e) => e.stopPropagation()}
                        className={`${taskTypeClass} px-3 rounded-md`}
                        value={type}
                        style={{ width: 140 }}
                        bordered={false}
                        dropdownMatchSelectWidth={false}
                        onChange={(value) => {
                            handleChangeType(value, data)
                        }}
                    >
                        <Select.Option value="task">Task</Select.Option>
                        <Select.Option value="bug">Bug</Select.Option>
                        <Select.Option value="error">Error</Select.Option>
                    </Select>
                </div>
            }
        },
        {
            title: "Status",
            dataIndex: 'status',
            key: 'status',
            render: (status: string, data: any) => {
                const taskTypeClass = status === 'todo' ? 'bg-yellow-100 text-yellow-600' : status === 'inProgress' ? 'bg-violet-100 text-violet-600' : 'bg-green-100 text-green-600';
                return (
                    <div className={isMobile ? `w-[120px]` : ``}>
                        <Select
                            onClick={(e) => e.stopPropagation()}
                            className={`${taskTypeClass} px-3 rounded-md`}
                            value={status}
                            style={{ width: 140 }}
                            bordered={false}
                            dropdownMatchSelectWidth={false}
                            onChange={(value) => {
                                handleChangeStatus(value, data)
                            }}
                        >
                            <Select.Option value="todo">Todo</Select.Option>
                            <Select.Option value="inProgress">In Progress</Select.Option>
                            <Select.Option value="completed">Completed</Select.Option>
                        </Select>
                    </div>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_:any,data:any) => {
                return <div>
                    <TbTrash onClick={(e) =>{
                        e.stopPropagation()
                        handleOpenDelete(data._id)
                    }} className='bg-violet-100 text-violet-500 text-4xl rounded-full hover:bg-violet-200 transition cursor-pointer p-2' />
                </div>
            }
        }
    ]
    const handleChangeType = (value: string, data: any) => {
        updateTask.mutateAsync({
            userId: data.userId,
            taskId: data._id,
            body: {
                ...data,
                type: value
            }
        }).then(() => {
            message.success('Task updated successfully')
        }).catch((err) => {
            message.error(err.message)
        })
    }
    const handleChangeStatus = (value: string, data: any) => {
        updateTask.mutateAsync({
            userId: data.userId,
            taskId: data._id,
            body: {
                ...data,
                status: value
            }
        }).then(() => {
            message.success('Task updated successfully')
        }).catch((err) => {
            message.error(err.message)
        })
    }
    const handleChangeTab = (tab: string) => {
        setCurrentTab(tab)
        setTab(tab)
    }


    return (
        <div className='flex flex-col gap-3'>
            <div className="flex p-1 items-center justify-between flex-wrap gap-y-3">
                <div className='flex flex-col'>
                    <h3>{currentTab}</h3>
                    <p className='text-gray-500 text-sm'>
                        Here are the list of '{currentTab.toLowerCase()}' tasks for you.
                    </p>
                </div>
                <Segmented
                    className={isMobile ? 'w-full overflow-auto' : ''}
                    options={['All', 'Todo', 'In Progress', 'Completed']}
                    value={currentTab}
                    onChange={handleChangeTab}
                />
            </div>

            <Table
                columns={columns}
                dataSource={taskList}
                size='small'
                loading={loading}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            setCurrentTask(record)
                            setShowTaskModal(true)
                        }
                    }
                }}
            />

            {deleteModal && 
                <DeleteTaskModal
                    open={deleteModal}
                    setOpen={setDeleteModal}
                    currentItem={selectedTaskId}
                    statusType={currentTab}
                />
            }
            {showTaskModal && currentTask && (
                <TaskDrawer
                    open={showTaskModal}
                    setOpen={setShowTaskModal}
                    taskDetails={currentTask}
                    statustype={currentTab}
                />
            )}
        </div>
    )
}
