import AddTask from '@/components/AddTask'
import TodoList from '@/components/TodoList'
import { getTodos } from '@/lib/api'
import { AiFillHeart } from 'react-icons/ai'

export default async function Home() {
    const tasks = await getTodos()

    return (
        <>
            <main className='max-w-4xl mx-auto mt-4 min-h-[calc(100vh-5rem)]'>
                <div className='text-center my-5 flex flex-col gap-4'>
                    <h1 className='text-2xl font-bold'>Todo App</h1>
                    <AddTask />
                </div>
                <TodoList tasks={tasks} />
            </main>
            <footer className='text-center'>
                <p className='text-sm'>
                    Made with{' '}
                    <AiFillHeart className='inline-block text-red-500' /> by
                    Lautaro Segura
                </p>
            </footer>
        </>
    )
}
