'use client'

import { AiOutlinePlus } from 'react-icons/ai'
import Modal from './Modal'
import { FormEventHandler, useState } from 'react'
import { addTodo } from '@/lib/api'
import { useRouter } from 'next/navigation'

const AddTask = () => {
    const router = useRouter()
    const [modalVisibility, setModalVisibility] = useState<boolean>(false)
    const [newTask, setNewTask] = useState<string>('')
    const [inputError, setInputError] = useState<boolean>(false)

    const handleTodoSubmission: FormEventHandler<HTMLFormElement> = async (
        e
    ) => {
        e.preventDefault()
        if (!newTask) {
            setInputError(true)
            return
        }
        await addTodo({
            id: crypto.randomUUID(),
            text: newTask
        })
        setNewTask('')
        setModalVisibility(false)
        router.refresh()
    }

    const resetInputValue = () => setNewTask('')

    return (
        <div>
            <button
                className='btn btn-neutral w-full'
                onClick={() =>
                    setModalVisibility((modalVisibility) => !modalVisibility)
                }
            >
                Add new task <AiOutlinePlus size={18} className='ml-2' />
            </button>

            <Modal
                modalVisibility={modalVisibility}
                setModalVisibility={setModalVisibility}
                resetInputValue={resetInputValue}
            >
                <form onSubmit={handleTodoSubmission}>
                    <h3 className='font-bold text-lg'>Add new task</h3>
                    <div className='modal-action'>
                        <input
                            value={newTask}
                            onChange={(e) => {
                                setNewTask(e.target.value)
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
        </div>
    )
}

export default AddTask
