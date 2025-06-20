type Props = {
    id: number;
    title: string;
    completed: boolean;
    onEdit: () => void;
    onDelete: () => void;
}

const TaskItem = ({ title, completed, onEdit, onDelete }: Props) => {
    return (
        <div className='flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow mb-2'>
            <div className="text-left">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-gray-600 ">
                    {completed ? "Done" : "Not Started"}
                </p>
            </div>
            <div className="flex gap-2">
                <button onClick={onEdit} className='text-blue-500 hover:underline'>
                    {completed ? "Mark as Incomplete" : "Mark as Complete"}
                </button>
                <button onClick={onDelete} className='text-red-500 hover:underline'>
                    Delete
                </button>
            </div>

        </div>
    )
}

export default TaskItem
