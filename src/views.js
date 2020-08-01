import { getTodos, toggleTodo, removeTodo } from './todos'
import { getFilters } from './filters'

// renderTodos
// Arguments: none
// Return value: none
// Render the application
const renderTodos = () => {
    const myTodo = document.querySelector('#my-todo')
    const filters = getFilters()
    // Filter todo  
    let filteredTodos = getTodos().filter(note => {
        const searchedTodo =  note.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const checkedTodo = !filters.hideCompleted || !note.completed
        return searchedTodo && checkedTodo
    })

    // Filter todos not completed
    let summary = filteredTodos.filter(note => !note.completed)

    myTodo.innerHTML = ''

    /*
    filteredTodos = filteredTodos.filter(function(note){
        if(text.hideCompleted){
            return !note.completed
        }else{
            return true
        }
    })
    */

    // Render summary
    let leftTodos = generateSummaryDOM(summary)
    myTodo.appendChild(leftTodos)

    if(filteredTodos.length > 0){
        // Loop through and generate todo
        filteredTodos.forEach(todo => {
            const myElem = generateTodoDOM(todo)
            myTodo.appendChild(myElem)
        })
    }else{
        let emptyMessage = document.createElement('p')
        emptyMessage.classList.add('empty-message')
        emptyMessage.textContent = 'No To-dos to show'
        myTodo.appendChild(emptyMessage)
    }

}

// generateTodoDOM
// Arguments: todo
// Return value: the todo element
// Get the DOM elements
const generateTodoDOM = todo => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    let checkbox = document.createElement('input')
    let todoText = document.createElement('span')
    let removeButton = document.createElement('button')

    // Setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        renderTodos()
    })

    // Setup the todo text
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // Setup the remove button
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        renderTodos()
    }) 

    return todoEl
}

// generateSummaryDOM
// Arguments: incompletedTodos
// Return value: the summary element
// Get the DOM elements for its summary
const generateSummaryDOM = summary => {
    const totalTodos = summary.length
    const totalTodosLength = totalTodos > 1 ? 'Todos' : 'Todo'

    const leftTodos = document.createElement('h1')
    leftTodos.classList.add('list-title')
    leftTodos.textContent = `You have ${totalTodos} ${totalTodosLength} left`
    return leftTodos
}

// Make sure to set up the exports
export { generateTodoDOM, generateSummaryDOM, renderTodos }