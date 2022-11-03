import classes from './Modal.module.css'
import {useState} from "react";

function Modal({mode, editTask, onCloseModal, onSubmitForm}) {

    const [error, setError] = useState(null)

    const [titleValue, setTitleValue] = useState(editTask.title)
    const [descriptionValue, setDescriptionValue] = useState(editTask.description)
    const [stateValue, setStateValue] = useState(editTask.state)
    const [tagValue, setTagValue] = useState(editTask.tag)

    const handleCloseModal = () => onCloseModal()

    const handleSubmitForm = event => {
        event.preventDefault()
        const title = titleValue
        const description = descriptionValue
        const state = mode === 'edit' ? stateValue : 'PENDING'
        const tag = tagValue

        if (!title || !description || !state || !tag) {
            setError('Todos los campos tienen que ser obligatorios')
            return
        }

        const task = {
            id: editTask ? editTask.id : null,
            title: titleValue,
            description: descriptionValue,
            state: mode === 'edit' ? stateValue : 'PENDING',
            tag: tagValue
        }
        onSubmitForm(task)
    }

    const handleUpdateTitleValue = event => {
        setTitleValue(event.target.value)
    }

    const handleUpdateDescriptionValue = event => {
        setDescriptionValue(event.target.value)
    }

    const handleUpdateTagValue = event => {
        setTagValue(event.target.value)
    }

    const handleUpdateStateValue = event => {
        setStateValue(event.target.value)
    }

    return (
        <>
            <div className={classes.modal}>
                <form onSubmit={handleSubmitForm} className={classes.form}>
                    <button type="button" onClick={handleCloseModal} className={classes['close-button']}>
                    </button>
                    <div className={classes.input}>
                        <label>Título</label>
                        <input type="text" value={titleValue} onChange={handleUpdateTitleValue}/>
                    </div>
                    <div className={classes.input}>
                        <label>Descripción</label>
                        <input type="text" value={descriptionValue} onChange={handleUpdateDescriptionValue}/>
                    </div>
                    {mode === 'edit' && <div className={classes.input}>
                        <label>Estado</label>
                        <select value={stateValue} onChange={handleUpdateStateValue}>
                            <option disabled value={null}>---</option>
                            <option value="PENDING">Por hacer</option>
                            <option value="PROCESS">En proceso</option>
                            <option value="FINISHED">Finalizada</option>
                            <option value="BLOCKED">Bloqueada</option>
                        </select>
                    </div>}
                    <div className={classes.input}>
                        <label>Tag</label>
                        <input type="text" value={tagValue} onChange={handleUpdateTagValue}/>
                    </div>
                    {error && <p className={classes.error}>{error}</p>}
                    <button className={classes['submit-button']}>{mode === 'edit' ? 'Editar' : 'Crear tarea'}</button>
                </form>
            </div>

        </>
    )
}

export default Modal