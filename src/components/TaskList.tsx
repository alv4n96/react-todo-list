import { useTaskContext } from "../context/TaskContext"
import TaskItem from "./TaskItem";

const TaskList = () => {
    const { optimisticTasks, deleteTask, editTask } = useTaskContext();

    return (
        <div>
            {optimisticTasks.map(task =>
                <TaskItem key={task.id}
                    {...task}
                    onDelete={() => deleteTask(task.id)}
                    onEdit={() => editTask(task.id, { completed: !task.completed })}
                />
            )}
        </div>
    )
}

export default TaskList
