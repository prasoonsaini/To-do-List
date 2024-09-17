const app = express();
import express from "express"
import cors from "cors";

let todos = [];

app.use(express.json());
app.use(cors())
app.get('/',function(req,res){
   res.json({
    todos: todos
   })
})

app.post('/',function(req,res){
   const heading = req.body.heading;
   const description = req.body.description;
   const priority = req.body.priority;
   const id = todos.length+1;
   todos.push({
    heading: heading,
    description: description,
    priority: priority,
    id: id,
    state: "todo"
   });
   res.json({todos: todos})
})

app.put('/', function(req, res) {
   const id = parseInt(req.body.id);

   todos.forEach((todo, index) => {
       if (todo.id === id) {
           todos[index] = req.body; // Update the todo item in the array
       }
   });

   console.log("todos", todos);
   res.json({ todos: todos });
});


app.delete('/:id',function(req,res){
   const id = parseInt(req.params.id);
   
   todos = todos.filter((todo)=>{
       return todo.id!=id;
   })
   console.log("todos",todos)
   res.json({message: "todo is deleted!"})
})

app.listen("https://to-do-list-nu-sooty-99.vercel.app/");