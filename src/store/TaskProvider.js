import TaskContext from "./TaskContext";
import {useFetchTasks} from "../service/TaskService";

function TaskProvider({children}) {

    const {tasks, setTasks, error, setError} = useFetchTasks()

    const addTaskHandler = item => {
        fetch(`http://localhost:8000/api/tasks`, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(response => response.json())
            .then(data => {
                setTasks(prev => {
                    const newTasks = [...prev]
                    newTasks.push(data)
                    return newTasks
                })
            })
            .catch(err => {
                setError(err)
            });
    }

    const removeTaskHandler = item => setTasks(prev => prev.filter(task => item.id !== task.id))

    const updateTaskHandler = task => {
        return fetch(`http://localhost:8000/api/tasks/state/${task.id}`, {
            method: 'PUT',
            body: JSON.stringify(task),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(response => response.json())
            .then(data => {
                setTasks(prev => {
                    const newTasks = [...prev]
                    const updatedTaskIndex = newTasks.findIndex(task => task.id === data.id)
                    newTasks[updatedTaskIndex] = data
                    return newTasks
                })
            })
            .catch(err => {
                setError(err)
            });
    }

    const taskContext = {
        tasks: tasks,
        addTask: addTaskHandler,
        removeTask: removeTaskHandler,
        updateTask: updateTaskHandler
    }


    return (
        <TaskContext.Provider value={taskContext}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider