import {useEffect, useState} from "react";

const states = ['PENDING', 'PROCESS', 'FINISHED', 'BLOCKED']

export const calculateNewState = (actualState, positions) => {
    const actualStateIndex = states.findIndex(state => state === actualState)
    let nextStateIndex = actualStateIndex + positions
    return states[nextStateIndex]
}

export const useFetchTasks = () => {
    const [tasks, setTasks] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        (async function () {
            try {
                const request = await fetch('http://127.0.0.1:8000/api/tasks/all')
                const responseData = await request.json()
                setTasks(responseData)
            } catch (error) {
                setError(error)
            }
        })()
    }, [])

    return {tasks, setTasks, error, setError}
}