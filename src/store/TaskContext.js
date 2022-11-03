import React from "react";

const TaskContext = React.createContext({
    tasks: [],
    addTask: task => {},
    removeTask: task => {},
    updateTask: task => {}
})

export default TaskContext