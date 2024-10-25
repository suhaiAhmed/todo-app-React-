import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash } from 'react-icons/fa'; // Importing Trash icon

const TodoApp = () => {
    const [todoList, setTodoList] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Load tasks from local storage on initial render
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTodoList(JSON.parse(savedTasks));
        }
    }, []);

    // Update local storage whenever the task list changes
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(todoList));
    }, [todoList]);

    // Function to add a new task
    const addTask = () => {
        if (inputValue.trim() === "") {
            setErrorMessage("Task cannot be empty");
            return;
        }
        if (todoList.some(task => task.text.toLowerCase() === inputValue.toLowerCase().trim())) {
            setErrorMessage("Task already exists");
            return;
        }

        const newTask = { text: inputValue, completed: false };
        setTodoList([...todoList, newTask]);
        setInputValue("");
        setErrorMessage("");
    };

    // Function to remove a task
    const removeTask = (indexToRemove) => {
        const updatedList = todoList.filter((_, index) => index !== indexToRemove);
        setTodoList(updatedList);
    };

    // Function to toggle task completion
    const toggleCompletion = (indexToToggle) => {
        const updatedList = todoList.map((task, index) => {
            if (index === indexToToggle) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTodoList(updatedList);
    };

    return (
        <div className="container d-flex flex-column align-items-center mt-5">
            <h1 className="mb-4">Todo List</h1>
            <div className="input-group mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    placeholder="Enter a new task"
                />
                <button className="btn btn-primary" onClick={addTask}>Add Task</button>
            </div>

            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            <ul className="list-group w-50">
                {todoList.map((task, index) => (
                    <li key={index} className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'list-group-item-success' : ''}`}>
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.text}
                        </span>
                        <div>
                            <button 
                                className="btn btn-secondary me-2" 
                                onClick={() => toggleCompletion(index)}
                            >
                                {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
                            </button>
                            <button 
                                className="btn btn-danger" 
                                onClick={() => removeTask(index)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
