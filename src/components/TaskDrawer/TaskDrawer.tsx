import { Badge, Button, Drawer, Input, message } from 'antd'
import React, { useState } from 'react'
import { T_Task } from '../../types/task'
import dayjs from 'dayjs'
import styles from './TaskDrawer.module.scss'
import { TbCheck } from 'react-icons/tb'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import { useUpdateTask } from '../../api/task.hooks'
interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    taskDetails: T_Task
    statustype: string
}
export default function TaskDrawer({ open, setOpen, taskDetails,statustype }: Props) {
    const userDetails = useSelector((state: RootState) => state.userDetails)
    const updateTask = useUpdateTask(statustype);
    const [expandDesc, setExpandDesc] = useState(false)
    const [currentTask, setCurrentTask] = useState<T_Task>(taskDetails);
    const [taskTitle, setTaskTitle] = useState(false);
    const [taskDesc, setTaskDesc] = useState(false);
    const type = currentTask.type;
    const status = currentTask.status;
    const taskType = type === 'bug' ? 'error' : type === 'task' ? 'processing' : 'warning';
    const taskTypeName = type[0].toUpperCase() + type.slice(1)
    const taskTypeClass = type === 'bug' ? 'bg-red-100 text-red-600' : type === 'task' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600';

    const statusType = status === 'todo' ? 'warning' : status === 'inProgress' ? 'processing' : 'success';
    const taskStatusClass = status === 'todo' ? 'bg-yellow-100 text-yellow-600' : status === 'inProgress' ? 'bg-violet-100 text-violet-600' : 'bg-green-100 text-green-600';
    const handleSaveChanges = () => {
        updateTask.mutateAsync({
            userId: userDetails._id,
            taskId: taskDetails._id,
            body: currentTask
        }).then(() => {
            message.success('Task updated successfully')
        }).catch((err) => {
            message.error(err.message)
        })
    }
    const handleExpand = () => {
        setExpandDesc(!expandDesc)
    }
    const toggleTitleInput = () => {
        setTaskTitle(!taskTitle)
    }
    const toggleDescInput = () => {
        setTaskDesc(!taskDesc)
    }
    return (
        <Drawer
            title={"Task details"}
            placement="right"
            size={"large"}
            onClose={() => setOpen(false)}
            open={open}
            extra={
                <Button type="primary" onClick={handleSaveChanges} loading={updateTask.isPending}>
                    Save
                </Button>
            }
            className={styles.drawer}
        >
            {taskTitle ? <Input value={currentTask.title} onChange={(e)=>{
                setCurrentTask({
                    ...currentTask,
                    title: e.target.value
                })
            }} suffix={<TbCheck onClick={toggleTitleInput}/>}/> :<h2 onClick={toggleTitleInput}>{currentTask.title}</h2>}
            {taskDesc ? 
            <>
                <Input.TextArea
                    rows={currentTask.desc.length /80}
                style={{resize:"none"}} value={currentTask.desc} onChange={(e)=>{
                    setCurrentTask({
                        ...currentTask,
                        desc: e.target.value
                    })
                }}/>
                <div className='flex justify-end'>
                    <Button type='primary' onClick={toggleDescInput}>Save</Button>
                </div>
            </>

            :<p className='text-gray-500 whitespace-pre-wrap mt-3' onClick={toggleDescInput}>
                {currentTask.desc.length > 400 && !expandDesc ? <>{currentTask.desc.slice(0, 400)}... </> : currentTask.desc}
                {currentTask.desc.length > 400 && <span className='text-gray-800 font-bold cursor-pointer' onClick={(e)=>{
                    e.stopPropagation()
                    handleExpand()
                }}>
                    {expandDesc ? ' Read less' : 'Read more'}
                </span>}
            </p>}
            <div className="flex flex-wrap gap-y-3 mt-5">

                <div className="sm:w-1/2 w-full">
                    <h4 className='text-gray-600'>Created at</h4>
                    <p className='text-gray-500'>{dayjs(currentTask.createdAt).format("DD MMM, YYYY - hh:mm A")}</p>
                </div>

                <div className="sm:w-1/2 w-full">
                    <h4 className='text-gray-600'>Updated at</h4>
                    <p className='text-gray-500'>{dayjs(currentTask.updatedAt).format("DD MMM, YYYY - hh:mm A")}</p>
                </div>
                <div className="sm:w-1/2 w-full">
                    <h4 className='text-gray-600'>Task type</h4>
                    <div className='mt-2'>
                        <Badge className={`${taskTypeClass} px-3 rounded-md`} status={taskType} text={taskTypeName} />
                    </div>
                </div>


                <div className="sm:w-1/2 w-full">
                    <h4 className='text-gray-600'>Status</h4>
                    <div className="mt-2">
                        <Badge className={`${taskStatusClass} px-3 rounded-md`} status={statusType} text={status} />
                    </div>
                </div>
            </div>
        </Drawer>
    )
}
