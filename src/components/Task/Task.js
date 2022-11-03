import classes from './Task.module.css'
import rightArrow from '../../assets/img/right-arrow.png'
import leftArrow from '../../assets/img/left-arrow.png'
import {useContext} from "react";
import TaskContext from "../../store/TaskContext";
import {calculateNewState} from "../../service/TaskService";

function Task ({task, parentPosition, onEditTask}) {

    const taskContext = useContext(TaskContext)

    const onMoveRightColumn = () => {
        const newState = calculateNewState(task.state, 1)
        task.state = newState
        taskContext.updateTask(task)
    }

    const onMoveLeftColumn = () => {
        const newState = calculateNewState(task.state, -1)
        task.state = newState
        taskContext.updateTask(task)
    }

    const onShowEditTaskModal = () => {
        onEditTask(task)
    }

    return (
        <div id={task.id} className={classes.task} >
            <div className={classes.tag}>
                {task.tag}
            </div>
            {parentPosition !== 'first' &&
                <div className={classes['left-arrow']} onClick={onMoveLeftColumn}>
                    <img src={leftArrow}/>
                </div>
            }
            <p onClick={onShowEditTaskModal} className={classes['task-title']}>{task.title}</p>
            {parentPosition !== 'last' &&
                <div className={classes['right-arrow']} onClick={onMoveRightColumn}>
                    <img src={rightArrow}/>
                </div>
            }
        </div>
    )
}

export default Task