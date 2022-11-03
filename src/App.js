import classes from './App.module.css';
import {useContext, useState} from "react";
import TaskContext from "./store/TaskContext";
import TaskList from "./components/Task/TaskList";
import todoImage from '../src/assets/img/todo.png'
import inprocessImage from '../src/assets/img/inprocess.png'
import doneImage from '../src/assets/img/done.png'
import blockImage from '../src/assets/img/block.png'
import plusImage from '../src/assets/img/plus.png'
import Modal from "./components/UI/Modal";


function App() {

    const taskContext = useContext(TaskContext)

    const [showAddModal, setShowAddModal] = useState(false)
    const [editTask, setEditTask] = useState({})
    const [modalMode, setModalMode] = useState('create')

    const pendingTasks = taskContext.tasks.filter(task => task.state === 'PENDING')
    const inProcessTasks = taskContext.tasks.filter(task => task.state === 'PROCESS')
    const finishedTasks = taskContext.tasks.filter(task => task.state === 'FINISHED')
    const blockedTasks = taskContext.tasks.filter(task => task.state === 'BLOCKED')

    const onSubmitTaskForm = item => {
        if (modalMode === 'create') {
            taskContext.addTask(item)
        }
        if (modalMode === 'edit') {
            taskContext.updateTask(item)
        }
        setShowAddModal(false)
        setEditTask({})
    }

    const onHideAddModal = () => {
        setShowAddModal(false)
        setEditTask({})
    }

    const onAddTask = () => {
        setShowAddModal(true)
        setModalMode('create')

    }

    const onEditTask = item => {
        setEditTask(item)
        setShowAddModal(true)
        setModalMode('edit')
    }

    return (
        <>
            <div className={showAddModal ? classes['blur-filter'] : ''}>
                <h1 className={classes['app-title']}>Task list</h1>
                <div className={classes.app}>
                    <div className={classes['first-list']}>
                        <TaskList key='pendingTasks' title='Por hacer' tasks={pendingTasks} position='first' image={todoImage} onEditTask={onEditTask}/>
                        <div className={classes['add-button']} onClick={onAddTask}>
                            <img src={plusImage}/>
                        </div>
                    </div>
                    <TaskList title='En proceso' tasks={inProcessTasks} position='middle' image={inprocessImage} onEditTask={onEditTask}/>
                    <TaskList title='Finalizadas' tasks={finishedTasks} position='middle' image={doneImage} onEditTask={onEditTask}/>
                    <TaskList title='Bloqueadas' tasks={blockedTasks} position='last' image={blockImage} onEditTask={onEditTask}/>
                </div>
            </div>
            {showAddModal && <Modal mode={modalMode} editTask={editTask} onCloseModal={onHideAddModal} onSubmitForm={onSubmitTaskForm}/>}
        </>

    )
}

export default App;
