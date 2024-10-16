const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const Users = new Schema({
    username: String,
    password: String
})
const Todos = new Schema({
    heading: String,
    description: String,
    priority: String,
    id: Number,
    state: { type: String, default: 'todo' }
});

const TodosModel = mongoose.model('todos', Todos);
const UserModel = mongoose.model('users',Users);

module.exports={
    UserModel:UserModel,
    TodosModel:TodosModel
}