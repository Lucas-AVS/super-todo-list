import '../styles/header.css'

export default function todoListHeader() {
  const content = document.querySelector('.content')
  const header = document.createElement('header')
  header.classList.add('todo-header')

  const headerTittle = document.createElement('h1')
  headerTittle.textContent = 'JS Todo list'

  header.appendChild(headerTittle)
  content.appendChild(header)
}
