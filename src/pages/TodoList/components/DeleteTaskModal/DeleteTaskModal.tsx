import { Modal, message } from 'antd'
import React from 'react'
import { useDeleteTask } from '../../../../api/task.hooks'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'
interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    currentItem: string
    statusType: string
}
export default function DeleteTaskModal({ open, setOpen, currentItem, statusType }:Props) {
    const deleteTask = useDeleteTask(statusType);
    const userDetails = useSelector((state: RootState) => state.userDetails)
    const handleDeleteTask = () => {
        deleteTask.mutateAsync({
            userId: userDetails._id,
            taskId: currentItem
        }).then(() => {
            message.success('Task deleted successfully')
            setOpen(false)
        }).catch((err) => {
            message.error(err.message)
        })
    }
    return (
        <Modal
            open={open}
            onOk={handleDeleteTask}
            onCancel={() => setOpen(false)}
            centered
            okText="Delete"
            okButtonProps={{ danger: true, loading: deleteTask.isPending}}
        >
            <h2>Are you sure you want to delete this task?</h2>
            <p className='text-gray-500'>
                This action cannot be undone. Please make sure you want to delete this task.
            </p>
        </Modal>
    )
}
