import { Form, Input, Modal, Select, message } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { useCreateTask } from '../../../../api/task.hooks'

interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    currentTab: string
}
export default function AddTaskModal({ open, setOpen, currentTab }: Props) {
    const [taskForm] = Form.useForm()
    const userDetails = useSelector((state:RootState)=>state.userDetails)
    const taskCreate = useCreateTask(currentTab)
    const taskType = [{
        label: 'Task',
        value: 'task',
        icon: '📝'
    }, {
        label: 'Bug',
        value: 'bug',
        icon: '🐞'
    }, {
        label: 'Issue',
        value: 'issue',
        icon: '❗'
    }]

    const handleCreateTask = () => {
        taskForm.submit()
    }

    const createTask = (values: {title:string,desc:string,type:string}) => {
        taskCreate.mutateAsync({
            userId: userDetails._id,
            body: values
        }).then(()=>{
            setOpen(false)
            taskForm.resetFields()
            message.success('Task created successfully')
        }).catch((err)=>{
            message.error(err.message)
        })
    }
    return (
        <Modal
            title="Add Task"
            open={open}
            onOk={handleCreateTask}
            onCancel={() => setOpen(false)}
            okText="Add Task"
            centered
            okButtonProps={{ loading: taskCreate.isPending }}
        >
            <Form
                name="add-task-form"
                layout="vertical"
                form={taskForm}
                onFinish={createTask}
            >
                <Form.Item
                    label="Task Name"
                    name="title"
                    rules={[{ required: true, message: 'Please input your task name!' }]}
                >
                    <Input placeholder="Task Name" />
                </Form.Item>
                <Form.Item
                    label="Task Description"
                    name="desc"
                    rules={[{ required: true, message: 'Please input your task description!' }]}
                >
                    <Input.TextArea placeholder="Task Description" rows={6} style={{resize:"none"}} />
                </Form.Item>
                <Form.Item
                    label="Task Type"
                    name="type"
                    rules={[{ required: true, message: 'Please select your task type!' }]}
                >
                    <Select
                        placeholder="Select Task Type"
                    >
                        {taskType.map((item) => (
                            <Select.Option key={item.value} value={item.value}>
                                {item.icon} {item.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}
