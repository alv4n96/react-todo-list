import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"

interface Props {

}

const Home = (props: Props) => {
    return (
        <div className="container mx-auto p-4">
            <title>Daily Task</title>
            <link rel="icon" href="airtable-svgrepo-com.svg" />

            <TaskForm />
            <TaskList />
        </div>
    )
}

export default Home;
