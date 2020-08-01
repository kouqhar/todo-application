// Set up index.html to load the bundle
// Make sure to load uuid via an npm module when necessary

import { createTodo, loadTodos } from './todos'
import { renderTodos } from './views'
import { setFilters } from './filters'

// Render initial todos
renderTodos()

// Set up search text handler
// Search todo
document.querySelector("#search-todo").addEventListener("input", e => {
    e.preventDefault()
    setFilters({
        searchText : e.target.value
    }) 
    renderTodos()
})

// Set up checkbox handler
// Hide completed todo via checkbox
document.querySelector("#hide-completed").addEventListener("change", e => {
    setFilters({
        hideCompleted : e.target.checked
    })
    renderTodos()
})

// Set up form submission handler
// Add todo form
document.querySelector("#todo-form").addEventListener("submit", e => {
    e.preventDefault()
    const todoText = e.target.elements.newTodo.value.trim()

    if(todoText.length > 0){
        createTodo(todoText)
        renderTodos()
    }

    e.target.elements.newTodo.value = ''

})

// Add a watcher for local storage
window.addEventListener('storage', e => {
    if(e.key === 'todos'){
        loadTodos()
        renderTodos()
    }
})