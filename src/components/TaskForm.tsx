import { useActionState } from "react"
import { useTaskContext } from "../context/TaskContext"

const TaskForm = () => {
    const { addNewTask } = useTaskContext();

    const createTodo = async (prevState: any, formData: FormData) => {
        // "use server"
        const title = formData.get("title")?.toString().trim();
        if (!title) {
            return {
                error: "Title is required",
                success: false
            };
        }
        await addNewTask(title);
        return { error: "", success: true };
    }

    const [message, formAction, isPending] = useActionState(createTodo, {
        error: "",
        success: false
    }
    );


    return (
        <form action={formAction} className="mb-4 flex flex-col">
            <input type="text" name="title" placeholder="New Task" className="border-2 border-gray-300 rounded w-full px-2 py-1" />
            {message.error && < span className="text-red-500 text-sm mt-1">{message.error}</span>}
            <button type="submit"
                disabled={isPending}
                className={`bg-blue-500 text-white px-4 py-2 rounded mt-2 ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                {isPending ? "Processing..." : "Add Task"}
            </button>


        </form >
    )
}

export default TaskForm
