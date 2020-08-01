import { v4 as uuidv4 } from 'uuid'

// Setup the empty todos array
let todos = []

// loadTodos
// Arguments: none
// Return value: none
// Get saved data from localStorage
const loadTodos = () => {
    let checkStored = localStorage.getItem('todos')
    try{
        todos =  checkStored ? JSON.parse(checkStored) : []
    }catch (e){
        todos = []
    }
}

// saveTodos
// Arguments: none
// Return value: none
// Save the application to local-storage
const saveTodos = () => localStorage.setItem('todos', JSON.stringify(todos))

// getTodos
// Arguments: none
// Return value: todos array
const getTodos = () => todos

// createTodo
// Arguments: todo text
// Return value: none
const createTodo = text => {
    todos.push({
        id : uuidv4(),
        text,
        completed : false
    })
    saveTodos()
}

// removeTodo
// Arguments: id of todo to remove
// Return value: none
// Remove todo by id
const removeTodo = id => {
    let todoIndex = todos.findIndex(todo => todo.id === id)

    if(todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodos()
    }
}

// toggleTodo
// Arguments: id of todo to toggle
// Return value: none
// Checkbox checked
const toggleTodo = id => {
    let todoArray = todos.find(todo => todo.id === id )

    if(todoArray) {
        todoArray.completed = !todoArray.completed
        saveTodos()
    }
}

loadTodos()

// Make sure to call loadTodos and setup the exports
export { getTodos, createTodo, removeTodo, toggleTodo, loadTodos }