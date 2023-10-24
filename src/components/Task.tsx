'use client'

import { ITask } from '@/types/task'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import Modal from './Modal'
import { EventHandler, FormEventHandler, useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteTodo, editTodo } from '@/lib/api'

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter()
    const [editModalVisibility, setEditModalVisibility] =
        useState<boolean>(false)
    const [deleteModalVisibility, setDeleteModalVisibility] =
        useState<boolean>(false)
    const [editedTask, setEditedTask] = useState<string>(task.text)
    const [inputError, setInputError] = useState<boolean>(false)

    const handleTodoEdition: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        await editTodo({
            id: task.id,
            text: editedTask
        })
        setEditModalVisibility(false)
        router.refresh()
    }

    const handleTodoDeletion = async (id: string) => {
        await deleteTodo(id)
        setDeleteModalVisibility(false)
        router.refresh()
    }

    return (
        <tr>
            <td className='w-full'>{task.text}</td>
            <td className='flex gap-2'>
                <FiEdit
                    size={20}
                    className='text-blue-400 cursor-pointer hover:text-blue-300'
                    onClick={() => setEditModalVisibility(true)}
                />
                <Modal
                    modalVisibility={editModalVisibility}
                    setModalVisibility={setEditModalVisibility}
                >
                    <form onSubmit={handleTodoEdition}>
                        <h3 className='font-bold text-lg'>Edit task</h3>
                        <div className='modal-action'>
                            <input
                                value={editedTask}
                                onChange={(e) => {
                                    setEditedTask(e.target.value)
                                    setInputError(false)
                                }}
                                type='text'
                                placeholder='Enter a task'
                                className={`input input-bordered w-full ${
                                    inputError ? `border-red-400` : ``
                                }`}
                            />
                            <button className='btn btn-neutral'>Submit</button>
                        </div>
                    </form>
                </Modal>
                <FiTrash2
                    size={20}
                    className='text-red-400 cursor-pointer hover:text-red-300'
                    onClick={() => setDeleteModalVisibility(true)}
                />
                <Modal
                    modalVisibility={deleteModalVisibility}
                    setModalVisibility={setDeleteModalVisibility}
                >
                    <h3 className='text-lg'>
                        Are you sure you want to delete this task?
                    </h3>
                    <div className='modal-action'>
                        <button
                            className='btn btn-neutral'
                            onClick={() => handleTodoDeletion(task.id)}
                        >
                            Confirm
                        </button>
                    </div>
                </Modal>
            </td>
        </tr>
    )
}

export default Task
