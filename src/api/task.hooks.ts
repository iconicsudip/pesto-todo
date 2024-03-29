import { useMutation, useQuery } from "@tanstack/react-query"
import { db } from "../firebase"
import { child, get, push, ref, remove, update } from "firebase/database"
import { queryClient } from "../App"

export const useCreateTask = (statusType:string) => {
    return useMutation({
        mutationKey: ['createTask'],
        mutationFn: async (data: {
            userId: string;
            body: {
                title: string;
                desc: string;
                type: string;
            }
        }) => {
            const { userId, body } = data
            const taskRef = ref(db, `tasks/${userId}`)
            const res = await push(taskRef, {
                ...body,
                status: 'todo',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            })
            return res
        },
        onSuccess: () => {
            console.log('Task created successfully')
            return queryClient.invalidateQueries({ queryKey: [`getTasks-${statusType}`] });
        }
    })
}

export const useGetTasks = (data: { userId: string, status: string }) => {
    const { userId, status } = data
    return useQuery({
        queryKey: [`getTasks-${status}`],
        queryFn: async () => {
            const taskRef = child(ref(db), `tasks/${userId}`)
            const snapshot = await get(taskRef)
            const res = Object.entries(snapshot.val()).map(([key, value]: [string, any]) => {
                return {
                    _id: key,
                    ...value
                }
            })
            if(status === "All"){
                return res
            }else if(status === "Todo"){
                return res.filter((task:any)=>task.status === 'todo')
            }else if(status === "In Progress"){
                return res.filter((task:any)=>task.status === 'inProgress')
            }
            return res.filter((task:any)=>task.status === 'completed')
        },
        enabled: !!userId || !status
    })
}

export const useUpdateTask = (statusType:string) => {
    return useMutation({
        mutationKey: ['updateTask'],
        mutationFn: async (data: {
            userId: string;
            taskId: string;
            body: {
                title?: string;
                desc?: string;
                type?: string;
                status?: string;
                createdAt?: string;
                updatedAt?: string;
                dueDate?: string;
            }
        }) => {
            const { userId, taskId, body } = data

            const updateBody = {
                title: body.title,
                desc: body.desc,
                type: body.type,
                status: body.status,
                createdAt: body.createdAt,
                dueDate: body.dueDate,
                updatedAt: new Date().toISOString()
            }
            const taskRef = ref(db, `tasks/${userId}/${taskId}`)
            update(taskRef, updateBody)
        },
        onSuccess: () => {
            console.log('Task updated successfully')
            return queryClient.invalidateQueries({ queryKey: [`getTasks-${statusType}`] });
        }
    })
}


export const useSearchTask = () =>{
    return useMutation({
        mutationKey: ['searchTask'],
        mutationFn: async (data: { userId: string, search: string }) => {
            const { userId, search } = data
            const taskRef = child(ref(db), `tasks/${userId}`)
            const snapshot = await get(taskRef)
            const res = Object.entries(snapshot.val()).map(([key, value]: [string, any]) => {
                return {
                    _id: key,
                    ...value
                }
            })
            return res.filter((task:any)=>task.title.toLowerCase().includes(search.toLowerCase()))
        }
    })
}

export const useDeleteTask = (statusType: string)=>{
    return useMutation({
        mutationKey: ['deleteTask'],
        mutationFn: async (data: { userId: string, taskId: string }) => {
            const { userId, taskId } = data
            const taskRef = ref(db, `tasks/${userId}/${taskId}`)
            await remove(taskRef)
        },
        onSuccess: () => {
            return queryClient.invalidateQueries({ queryKey: [`getTasks-${statusType}`] });
        }
    })
}