import classes from './TaskList.module.css'
import Task from "./Task";

function TaskList({title, tasks, position, image, onEditTask}) {

    return (
        <div className={`${classes.list} ${position === 'first' ? `${classes['first-list']}` : ''} ${position === 'last' ? `${classes['last-list']}` : ''}`}>
            <header className={classes['list-header']}>
                <img src={image}/>
                <h4 className={classes['list-title']}>{title}:</h4>
            </header>
            {tasks && <ul className={classes.tasks}>
                {tasks.map(task => <li key={task.id} className={classes.task}>
                    <Task key={'task' + task.id} task={task} parentPosition={position} onEditTask={onEditTask}/>
                </li>)}
            </ul>}
            <div className={classes['list-footer']}>
                <p className={classes['footer-title']}>{tasks ? tasks.length : 0} tareas</p>
            </div>
        </div>
    )
}

export default TaskList