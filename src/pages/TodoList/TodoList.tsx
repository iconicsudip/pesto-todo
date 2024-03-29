import { Button, message } from 'antd'
import { useEffect, useState } from 'react'
import SearchBar from '../../components/SearchBar'
import TaskList from './components/TaskList'
import AddTaskModal from './components/AddTaskModal'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useGetTasks, useSearchTask } from '../../api/task.hooks'

export default function TodoList() {
    const {_id} = useSelector((state: RootState) => state.userDetails)
    const [currentTab, setCurrentTab] = useState('All')
    const searchTask = useSearchTask()
    const allTasks = useGetTasks({
        userId: _id!,
        status: currentTab
    });
    const [taskList, setTaskList] = useState(allTasks.data)
    const [search, setSearch] = useState('');
    const [addModal, setAddModal] = useState(false);
    const handleOpenAddModal = () => {
        setAddModal(true)
    }

    useEffect(() => {
        if (allTasks.data && _id) {
            setTaskList(allTasks.data.map((task) => {
                return {
                    ...task,
                    userId: _id
                }
            }))
        }
    }, [allTasks.data,_id])

    useEffect(() => {
        if(search){
            searchTask.mutateAsync({
                userId: _id!,
                search
            }).then((res) => {
                setTaskList(res)
            }).catch((err) => {
                message.error(err.message)
            })
        }else{
            setTaskList(allTasks.data)
        }
    }, [search])
    return (
        <div className='flex flex-col gap-3'>
            <div className="col-12 flex items-center justify-between">
                <div className="flex flex-col">
                    <h2>Your Track List</h2>
                    <p className='text-gray-500'>
                        Here are the list of tracks added for you.
                    </p>
                </div>
                <Button type='primary' onClick={handleOpenAddModal}>Add Track</Button>
            </div>
            <div className='flex flex-wrap justify-end'>
                <div className="col-12">
                    <div className="flex flex-col">
                        <h4 className='text-gray-600 mb-1'>Search Task</h4>
                        <SearchBar
                            placeholder='Search Track...'
                            setSearchText={setSearch}
                        />
                    </div>
                </div>
            </div>
            <TaskList setTab={setCurrentTab} taskList={taskList} loading={allTasks.isPending || searchTask.isPending}/>
            {addModal && (
                <AddTaskModal
                    open={addModal}
                    setOpen={setAddModal}
                    currentTab={currentTab}
                />
            )}
        </div>
    )
}