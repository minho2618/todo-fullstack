<template>
  <div class="todo-container">
    <h1>Todo List</h1>
    <div class="filters">
      <router-link to="/" :class="{ active: filter === 'all' }">전체</router-link>
      <router-link to="/active" :class="{ active: filter === 'active' }">진행 중</router-link>
      <router-link to="/completed" :class="{ active: filter === 'completed' }">완료됨</router-link>
    </div>
    <div class="add-todo">
      <input v-model="newTodo" @keyup.enter="addTodo" placeholder="새로운 할 일을 입력하세요">
      <button @click="addTodo">추가</button>
    </div>
    <ul class="todo-list">
      <li v-for="todo in filteredTodos" :key="todo.id" :class="{ completed: todo.completed }">
        <input type="checkbox" v-model="todo.completed">
        <span>{{ todo.text }}</span>
        <button @click="removeTodo(todo.id)">삭제</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  filter: {
    type: String,
    default: 'all'
  }
})

const todos = ref([])
const newTodo = ref('')

const filteredTodos = computed(() => {
  switch (props.filter) {
    case 'active':
      return todos.value.filter(todo => !todo.completed)
    case 'completed':
      return todos.value.filter(todo => todo.completed)
    default:
      return todos.value
  }
})

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodo.value.trim(),
      completed: false
    })
    newTodo.value = ''
  }
}

const removeTodo = (id) => {
  todos.value = todos.value.filter(todo => todo.id !== id)
}
</script>

<style scoped>
.todo-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.filters {
  margin: 20px 0;
}

.filters a {
  margin-right: 10px;
  text-decoration: none;
  color: #666;
}

.filters a.active {
  color: #42b983;
  font-weight: bold;
}

.add-todo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-todo input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.todo-list li.completed span {
  text-decoration: line-through;
  color: #999;
}

.todo-list li span {
  flex: 1;
  margin: 0 10px;
}

.todo-list li button {
  background-color: #ff4444;
}

.todo-list li button:hover {
  background-color: #cc0000;
}
</style>
