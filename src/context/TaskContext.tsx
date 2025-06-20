import { createContext, useState, use, useOptimistic } from "react";
import type { Task } from "../types/Task";
import { fetchTasks, addTask } from "../utils/Api";

interface TaskContextType {
    optimisticTasks: Task[];
    // loading: boolean;
    // fetchAllTasks: () => Promise<void>;
    editTask: (id: number, updatedTask: Partial<Task>) => void;
    addNewTask: (title: string) => void;
    deleteTask: (id: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const TaskPromise = fetchTasks();

type TaskProviderProps = {
    children: React.ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
    const tasksData = use(TaskPromise);
    const [tasks, setTasks] = useState<Task[]>(tasksData.slice(0, 5));
    const [optimisticTasks, setOptimisticTasks] = useOptimistic(tasks);

    // const [loading, setLoading] = useState<boolean>(false);
    // const [error, setError] = useState<string | null>(null);

    const createTask = async (title: string) => {
        const newOptimisticTask = {
            id: Date.now(),
            title:" Processing . . .",
            completed: false
        };
        setOptimisticTasks((prev) => [...prev, newOptimisticTask]);

        const newTask = await addTask(title);

        setTasks((prev)=> [...prev, newTask]);

    }

    const updateTask = (id: number, updatedTask: Partial<Task>) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, ...updatedTask } : task
            ));
    }

    const deleteTask = async (id: number) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    }

    return (
        <TaskContext value={{
            optimisticTasks: optimisticTasks,
            editTask: updateTask,
            addNewTask: createTask,
            deleteTask: deleteTask
        }}>
            {children}
        </TaskContext>
    );
};

export const useTaskContext = () => {
    const context = use(TaskContext);
    if (!context) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
};

export default TaskContext;





