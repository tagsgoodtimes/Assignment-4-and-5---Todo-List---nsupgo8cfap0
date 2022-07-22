import React from "react";
import "./../styles/App.css";
import {useState} from 'react';
function App() 
{
	const [toDo, setToDo] = useState([]);

	const [newTask, setNewTask] = useState('');
	const [updateData, setUpdateData] = useState('');

	//Add Task
	const addTask = () => {
		if (newTask) {
			let num = toDo.length + 1;
			let newEntry = { id: num, title: newTask }
			setToDo([...toDo, newEntry]);
			setNewTask('');
		}
	}

	//Delete Task
	const deleteTask = (id) => {
		let newTasks = toDo.filter(task => task.id !== id)
		setToDo(newTasks);
	}

	//Cancel update
	const cancelUpdate = () => {
		setUpdateData('');
	}

	const changeTask = (e) => {
		let newEntry = {
			id: updateData.id,
			title: e.target.value
		}
		setUpdateData(newEntry);
	}

	const updateTask = () => {
		let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
		let updatedObject = [...filterRecords, updateData];
		setToDo(updatedObject);
		setUpdateData('');
	}
	return (
	<div id="main">
			<div>
				<br /><br />
				<h1>To Do List</h1>
				<br /><br />

				{/* Update Task */}
				{updateData && updateData ? (
					<>
						<div>
							<div>
								<textarea id="task"
									value={updateData && updateData.title}
									onChange={(e) => changeTask(e)} />
							</div>
							<div>
								<button id="btn" onClick={updateTask}>Save</button>
								<button id="btn" onClick={cancelUpdate}>Cancel</button>
							</div>
						</div>
					</>
				) : (
					<>
						{/* Add Task */}
						<div>
							<div>
									<textarea id="task"
									value={newTask}
									onChange={(e) => setNewTask(e.target.value)} />
							</div>
							<div>
									<button id="btn" onClick={addTask}>Add Task</button>
							</div>
						</div>
					</>

				)}



				{/* Display ToDos */}
				{toDo && toDo
					.sort((a, b) => a.id > b.id ? 1 : -1)
					.map((task, index) => {
						return (
							<React.Fragment key={task.id}>
								<div>
									<span className="taskText">{task.title}</span>
								</div>
								<div>
									<span title="Edit" onClick={() => setUpdateData({ id: task.id, title: task.title })}><button id="btn">Edit</button></span>
									<span title="Delete" onClick={() => deleteTask(task.id)}><button id="btn">Delete</button></span>
								</div>
							</React.Fragment>
						)
					})}

			</div>
	</div>
	);
}


export default App;
