import { ITask } from '@/types/task'

const baseUrl = 'http://localhost:3001'

export const getTodos = async (): Promise<ITask[]> => {
    const response = await fetch(`${baseUrl}/tasks`, { cache: 'no-store' })
    return await response.json()
}

export const addTodo = async (todo: ITask): Promise<ITask> => {
    const response = await fetch(`${baseUrl}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    return await response.json()
}

export const editTodo = async (todo: ITask): Promise<ITask> => {
    const response = await fetch(`${baseUrl}/tasks/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    return await response.json()
}

export const deleteTodo = async (id: string): Promise<void> => {
    await fetch(`${baseUrl}/tasks/${id}`, {
        method: 'DELETE'
    })
}
