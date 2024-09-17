import { useState } from 'react'
import './style.css';
import AddTask from './AddTask';

function App() {
  const [todo,setTodo] = useState([]);
  const [draggedTodo,setDraggedTodo] = useState('');
  const [addingTask,setAddingTask] = useState(false);
  function handleDragStart(e,task) {
    setDraggedTodo(task);
  }
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  async function getTodos(){
    const response = await axios.get("https://to-do-list-nu-sooty-99.vercel.app/")
    setTodo(response.data.todos)
  }

  window.onload = function() {
    getTodos();
};
  async function handleDrop (state){
    const task = draggedTodo;
    task.state=state;
    const res = await axios.put("https://to-do-list-nu-sooty-99.vercel.app/",task)
      setTodo(res.data.todos)
      localStorage.setItem('todo', JSON.stringify(todo));
      const storedPeople = JSON.parse(localStorage.getItem('todo'));
  }

  const addTodo = () => {
    setAddingTask(true);
  }
  const getPriorityColor=(priority)=>{
    switch (priority) {
      case 'High':
          return 'rgb(255 55 95)';
      case 'Medium':
          return 'rgb(255 192 30)';
      case 'Low':
          return 'rgb(0 184 163)';
      default:
          return 'black';  // Default color
  }
  }
  return (
    <>
      <div className='main'>
      <div class="columns" onDragOver={handleDragOver} onDrop={(e)=>handleDrop("todo")}>
            <div className="heading" >
                <div>To Do</div>
            </div>
            {
              todo.map((task)=>(
                task.state === 'todo' ? <div key={task.id} class="task" draggable onDragStart={(e)=>{
                  handleDragStart(e,task);
                }}>
                <div class="task-content">
                    {task.heading}
                    <div>
                        {task.description}
                    </div>
                    <button class="priority" style={{background: getPriorityColor(task.priority)}}>{task.priority}</button>
                </div>
            </div> : <></>
              ))
            }
            <button class="addButton" onClick={addTodo}>Add New +</button>
            {
              addingTask ? 
              <div class="task">
                <div>
                  <AddTask todo={todo} setTodo={setTodo} setAddingTask={setAddingTask}/>
                </div>
              </div> : <></>
            }
        </div>
        <div className="columns" onDragOver={handleDragOver} onDrop={(e)=>handleDrop("progress")}>
            <div className="heading">
                <div>In Progress</div>
            </div>
            {
              todo.map(task=>(
                task.state === 'progress' ? <div class="task" draggable onDragStart={(e)=>{
                  handleDragStart(e,task);
                }}>
                <div class="task-content">
                    <div>{task.heading}</div>
                    <div>
                        {task.description}
                    </div>
                    <button class="priority" style={{background: getPriorityColor(task.priority)}}>{task.priority}</button>
                </div>
            </div> : <></>
              ))
            }
        </div>
        <div className="columns" onDragOver={handleDragOver} onDrop={(e)=>handleDrop("review")}>
            <div className="heading">
                <div>Under Review</div>
            </div>
            {
              todo.map(task=>(
                task.state === 'review' ? <div class="task" draggable onDragStart={(e)=>{
                  handleDragStart(e,task);
                }}>
                <div class="task-content">
                    <div>{task.heading}</div>
                    <div>
                        {task.description}
                    </div>
                    <button class="priority" style={{background: getPriorityColor(task.priority)}}>{task.priority}</button>
                </div>
            </div> : <></>
              ))
            }
        </div>
        <div className="columns" onDragOver={handleDragOver} onDrop={(e)=>handleDrop("done")}>
            <div className="heading">
                <div>Finished</div>
            </div>
            {
              todo.map(task=>(
                task.state === 'done' ? <div class="task" draggable onDragStart={(e)=>{
                  handleDragStart(e,task);
                }}>
                <div class="task-content">
                    <div>{task.heading}</div>
                    <div>
                        {task.description}
                    </div>
                    <button class="priority" style={{background: getPriorityColor(task.priority)}}>{task.priority}</button>
                </div>
            </div> : <></>
              ))
            }
        </div>
      </div>
    </>
  )
}

export default App
