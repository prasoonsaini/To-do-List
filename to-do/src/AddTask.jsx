import { useState } from "react";
import DropdownList from "./DropdownList";
import './style.css';

function AddTask ({todo,setTodo,setAddingTask}) {
    const [state,setState] = useState("High")
    const [heading,setHeading] = useState(false);
    const [des,setDes] = useState(false);
    async function handleCreate (){
       const heading = document.querySelector("input").value;
       const description = document.querySelector("textarea").value;
       const st = state;
       /// it works without backend too
       const response = await axios.post("https://to-do-list-nu-sooty-99.vercel.app/",{
        heading: heading,
        description: description,
        priority: st,
        id: todo.length+1,
        state: "todo"
       })
       setTodo(response.data.todos);
       localStorage.setItem('todo', JSON.stringify(todo));
       setAddingTask(false)
    }
    return (
        <div class="task-content">
            <input type="text" placeholder="Heading" onChange={()=>{
              if(document.querySelector("input").value.length>0)
              setHeading(true);
              else 
              setHeading(false);
            }}/>
            <textarea rows="15" cols="10" id="TITLE" placeholder="Description" onChange={()=>{
              if(document.querySelector("textarea").value.length>0)
              setDes(true);
              else 
              setDes(false);
            }}></textarea>
            <DropdownList setState={setState}/>
            <div class="bnt-parent">
                {heading && des ? <button class="create-btn" onClick={handleCreate}>Create</button> :
                <button class="create-btn-unclickable">Create</button>}
                <button class="delete-btn" onClick={()=>{
                    setAddingTask(false);
                }}>Close</button>
            </div>
        </div>
        
    )
}

export default AddTask;