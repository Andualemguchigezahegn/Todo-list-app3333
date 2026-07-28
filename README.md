<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📝 Todo List App</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <!-- Header -->
        <header>
            <h1>📝 Todo List</h1>
            <p class="subtitle">Organize your tasks efficiently</p>
        </header>

        <!-- Todo Input Section -->
        <section class="todo-input-section">
            <div class="input-group">
                <input 
                    type="text" 
                    id="todoInput" 
                    placeholder="Enter a new task..."
                    aria-label="New todo input"
                >
                <button id="addTodoBtn" class="btn btn-primary">
                    ➕ Add
                </button>
            </div>
        </section>

        <!-- Filter Section -->
        <section class="filter-section">
            <div class="filter-buttons">
                <button class="filter-btn active" data-filter="all">All</button>
                <button class="filter-btn" data-filter="active">Active</button>
                <button class="filter-btn" data-filter="completed">Completed</button>
            </div>
        </section>

        <!-- Todo List -->
        <section class="todo-list-section">
            <div class="todo-stats">
                <span id="todoCount">0 tasks remaining</span>
                <button id="clearAllBtn" class="btn btn-danger">Clear All</button>
            </div>
            <ul id="todoList" class="todo-list">
                <!-- Todos will be dynamically inserted here -->
            </ul>
        </section>

        <!-- Empty State -->
        <div id="emptyState" class="empty-state">
            <span class="empty-icon">🎯</span>
            <p>No tasks yet. Add one above!</p>
        </div>
    </div>

    <script src="js/script.js"></script>
</body>
</html>
/* ===== RESET & BASE ===== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

/* ===== CONTAINER ===== */
.container {
    background: white;
    border-radius: 20px;
    padding: 30px;
    max-width: 600px;
    width: 100%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;
}

.container:hover {
    transform: translateY(-5px);
}

/* ===== HEADER ===== */
header {
    text-align: center;
    margin-bottom: 30px;
}

header h1 {
    font-size: 2rem;
    color: #2d3748;
    margin-bottom: 5px;
}

header .subtitle {
    color: #718096;
    font-size: 0.9rem;
}

/* ===== INPUT SECTION ===== */
.todo-input-section {
    margin-bottom: 25px;
}

.input-group {
    display: flex;
    gap: 10px;
}

#todoInput {
    flex: 1;
    padding: 14px 18px;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
    outline: none;
}

#todoInput:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

#todoInput::placeholder {
    color: #a0aec0;
}

/* ===== BUTTONS ===== */
.btn {
    padding: 14px 24px;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
}

.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.btn-primary:active {
    transform: translateY(0);
}

.btn-danger {
    background: #fc8181;
    color: white;
    padding: 8px 16px;
    font-size: 0.85rem;
}

.btn-danger:hover {
    background: #f56565;
    transform: scale(1.05);
}

.btn-complete {
    background: #48bb78;
    color: white;
    padding: 6px 12px;
    font-size: 0.8rem;
    border-radius: 8px;
}

.btn-complete:hover {
    background: #38a169;
}

.btn-delete {
    background: #fc8181;
    color: white;
    padding: 6px 12px;
    font-size: 0.8rem;
    border-radius: 8px;
}

.btn-delete:hover {
    background: #f56565;
}

/* ===== FILTER SECTION ===== */
.filter-section {
    margin-bottom: 20px;
}

.filter-buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
}

.filter-btn {
    padding: 8px 20px;
    border: 2px solid #e2e8f0;
    border-radius: 20px;
    background: transparent;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
    color: #4a5568;
}

.filter-btn:hover {
    border-color: #667eea;
    color: #667eea;
}

.filter-btn.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-color: #667eea;
}

/* ===== TODO STATS ===== */
.todo-stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 2px solid #f7fafc;
}

#todoCount {
    color: #4a5568;
    font-weight: 500;
    font-size: 0.95rem;
}

/* ===== TODO LIST ===== */
.todo-list {
    list-style: none;
    min-height: 200px;
}

.todo-item {
    display: flex;
    align-items: center;
    padding: 14px;
    background: #f7fafc;
    border-radius: 12px;
    margin-bottom: 10px;
    transition: all 0.3s ease;
    animation: slideIn 0.3s ease;
}

.todo-item:hover {
    background: #edf2f7;
    transform: translateX(5px);
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.todo-item.completed {
    opacity: 0.7;
    background: #f0fff4;
}

.todo-item.completed .todo-text {
    text-decoration: line-through;
    color: #a0aec0;
}

/* ===== CHECKBOX ===== */
.todo-checkbox {
    width: 22px;
    height: 22px;
    min-width: 22px;
    border: 2px solid #cbd5e0;
    border-radius: 6px;
    cursor: pointer;
    margin-right: 15px;
    transition: all 0.3s ease;
    appearance: none;
    position: relative;
}

.todo-checkbox:checked {
    background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
    border-color: #48bb78;
}

.todo-checkbox:checked::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 14px;
    font-weight: bold;
}

/* ===== TODO TEXT ===== */
.todo-text {
    flex: 1;
    color: #2d3748;
    font-size: 1rem;
    word-break: break-word;
}

/* ===== TODO ACTIONS ===== */
.todo-actions {
    display: flex;
    gap: 8px;
    margin-left: 10px;
}

.todo-actions button {
    border: none;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s ease;
    padding: 6px 12px;
    border-radius: 8px;
}

/* ===== EMPTY STATE ===== */
.empty-state {
    text-align: center;
    padding: 40px 20px;
    display: none;
}

.empty-state.show {
    display: block;
}

.empty-icon {
    font-size: 3rem;
    display: block;
    margin-bottom: 15px;
}

.empty-state p {
    color: #a0aec0;
    font-size: 1.1rem;
}

/* ===== EDIT MODE ===== */
.todo-edit-input {
    flex: 1;
    padding: 8px 12px;
    border: 2px solid #667eea;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    margin-right: 10px;
}

/* ===== RESPONSIVE DESIGN ===== */

/* Tablet */
@media screen and (max-width: 768px) {
    .container {
        padding: 20px;
    }

    header h1 {
        font-size: 1.75rem;
    }

    .input-group {
        flex-direction: column;
    }

    #todoInput {
        font-size: 0.95rem;
        padding: 12px 16px;
    }

    .btn {
        padding: 12px 20px;
        font-size: 0.95rem;
    }

    .filter-buttons {
        gap: 8px;
    }

    .filter-btn {
        padding: 6px 16px;
        font-size: 0.85rem;
    }
}

/* Mobile */
@media screen and (max-width: 480px) {
    body {
        padding: 10px;
    }

    .container {
        padding: 15px;
        border-radius: 15px;
    }

    header h1 {
        font-size: 1.5rem;
    }

    .subtitle {
        font-size: 0.8rem;
    }

    .todo-item {
        padding: 12px;
        flex-wrap: wrap;
        gap: 8px;
    }

    .todo-text {
        width: 100%;
        order: 1;
        font-size: 0.95rem;
    }

    .todo-checkbox {
        order: 0;
        width: 20px;
        height: 20px;
        min-width: 20px;
    }

    .todo-actions {
        order: 2;
        width: 100%;
        justify-content: flex-end;
        gap: 6px;
    }

    .todo-actions button {
        padding: 5px 10px;
        font-size: 0.75rem;
    }

    .todo-stats {
        flex-direction: column;
        gap: 10px;
        align-items: stretch;
        text-align: center;
    }

    .todo-stats .btn-danger {
        width: 100%;
        text-align: center;
    }

    .filter-buttons {
        gap: 6px;
    }

    .filter-btn {
        padding: 5px 12px;
        font-size: 0.8rem;
        flex: 1;
        text-align: center;
    }

    #todoCount {
        font-size: 0.85rem;
    }

    .empty-state {
        padding: 30px 15px;
    }

    .empty-icon {
        font-size: 2.5rem;
    }

    .empty-state p {
        font-size: 0.95rem;
    }

    .todo-edit-input {
        font-size: 0.9rem;
        padding: 6px 10px;
    }
}

/* Small Mobile */
@media screen and (max-width: 350px) {
    .container {
        padding: 10px;
        border-radius: 10px;
    }

    header h1 {
        font-size: 1.25rem;
    }

    .todo-item {
        padding: 10px;
    }

    .filter-btn {
        font-size: 0.7rem;
        padding: 4px 8px;
    }
}

/* ===== DARK MODE SUPPORT ===== */
@media (prefers-color-scheme: dark) {
    body {
        background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
    }

    .container {
        background: #2d3748;
        color: #f7fafc;
    }

    header h1 {
        color: #f7fafc;
    }

    header .subtitle {
        color: #a0aec0;
    }

    #todoInput {
        background: #4a5568;
        color: #f7fafc;
        border-color: #4a5568;
    }

    #todoInput::placeholder {
        color: #a0aec0;
    }

    .todo-item {
        background: #4a5568;
    }

    .todo-item:hover {
        background: #553c9a;
    }

    .todo-item.completed {
        background: #2f855a;
    }

    .todo-text {
        color: #f7fafc;
    }

    .todo-item.completed .todo-text {
        color: #a0aec0;
    }

    .filter-btn {
        color: #a0aec0;
        border-color: #4a5568;
    }

    .filter-btn.active {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-color: #667eea;
    }

    #todoCount {
        color: #a0aec0;
    }

    .todo-stats {
        border-bottom-color: #4a5568;
    }

    .empty-state p {
        color: #718096;
    }

    .todo-edit-input {
        background: #4a5568;
        color: #f7fafc;
        border-color: #667eea;
    }
}
// ===== STATE MANAGEMENT =====
let todos = [];
let currentFilter = 'all';

// ===== DOM ELEMENTS =====
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');
const todoCount = document.getElementById('todoCount');
const clearAllBtn = document.getElementById('clearAllBtn');
const emptyState = document.getElementById('emptyState');
const filterBtns = document.querySelectorAll('.filter-btn');

// ===== LOCAL STORAGE =====
const STORAGE_KEY = 'todos_data';

// Load todos from localStorage
function loadTodos() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            todos = JSON.parse(stored);
        } catch (e) {
            console.error('Error loading todos:', e);
            todos = [];
        }
    }
}

// Save todos to localStorage
function saveTodos() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
        console.error('Error saving todos:', e);
    }
}

// ===== CRUD OPERATIONS =====

// Add a new todo
function addTodo() {
    const text = todoInput.value.trim();
    
    // Validation
    if (!text) {
        todoInput.style.borderColor = '#fc8181';
        todoInput.placeholder = '⚠️ Please enter a task!';
        todoInput.focus();
        setTimeout(() => {
            todoInput.style.borderColor = '#e2e8f0';
            todoInput.placeholder = 'Enter a new task...';
        }, 2000);
        return;
    }

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };

    todos.push(newTodo);
    saveTodos();
    todoInput.value = '';
    todoInput.focus();
    renderTodos();
    
    // Debug: Log the new todo
    console.log('✅ Todo added:', newTodo);
}

// Toggle todo completion status
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
        console.log(`🔄 Todo ${id} toggled to:`, todo.completed);
    }
}

// Delete a single todo
function deleteTodo(id) {
    const todoToDelete = todos.find(t => t.id === id);
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    renderTodos();
    console.log(`🗑️ Todo deleted:`, todoToDelete);
}

// Clear all todos
function clearAllTodos() {
    if (todos.length === 0) return;
    
    if (confirm('Are you sure you want to delete all todos?')) {
        const count = todos.length;
        todos = [];
        saveTodos();
        renderTodos();
        console.log(`🗑️ Cleared all ${count} todos`);
    }
}

// ===== FILTERING =====

// Get filtered todos based on current filter
function getFilteredTodos() {
    switch (currentFilter) {
        case 'active':
            return todos.filter(todo => !todo.completed);
        case 'completed':
            return todos.filter(todo => todo.completed);
        default:
            return todos;
    }
}

// ===== RENDERING =====

// Render todos to the DOM
function renderTodos() {
    const filteredTodos = getFilteredTodos();
    
    // Show empty state
    if (todos.length === 0) {
        emptyState.classList.add('show');
        todoList.innerHTML = '';
        todoCount.textContent = '0 tasks remaining';
        return;
    } else {
        emptyState.classList.remove('show');
    }

    // Update count
    const remaining = todos.filter(t => !t.completed).length;
    todoCount.textContent = `${remaining} task${remaining !== 1 ? 's' : ''} remaining`;

    // Build HTML
    let html = '';
    filteredTodos.forEach(todo => {
        html += `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <input 
                    type="checkbox" 
                    class="todo-checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    aria-label="Toggle todo completion"
                >
                <span class="todo-text">${escapeHtml(todo.text)}</span>
                <div class="todo-actions">
                    <button class="btn-edit" aria-label="Edit todo">✏️</button>
                    <button class="btn-delete" aria-label="Delete todo">🗑️</button>
                </div>
            </li>
        `;
    });

    todoList.innerHTML = html;
    attachEventListeners();
    
    console.log(`📋 Rendered ${filteredTodos.length} todos (filter: ${currentFilter})`);
}

// ===== HELPER FUNCTIONS =====

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== EVENT HANDLERS =====

// Attach event listeners to dynamically created elements
function attachEventListeners() {
    // Checkbox toggle
    document.querySelectorAll('.todo-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function(e) {
            const todoItem = this.closest('.todo-item');
            const id = parseInt(todoItem.dataset.id);
            toggleTodo(id);
            e.stopPropagation();
        });
    });

    // Delete button
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const todoItem = this.closest('.todo-item');
            const id = parseInt(todoItem.dataset.id);
            deleteTodo(id);
            e.stopPropagation();
        });
    });

    // Edit button (double-click on text)
    document.querySelectorAll('.todo-text').forEach(textElement => {
        textElement.addEventListener('dblclick', function(e) {
            const todoItem = this.closest('.todo-item');
            const id = parseInt(todoItem.dataset.id);
            enableEditMode(id);
            e.stopPropagation();
        });
    });
}

// Edit todo functionality
function enableEditMode(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const todoItem = document.querySelector(`.todo-item[data-id="${id}"]`);
    const textSpan = todoItem.querySelector('.todo-text');
    const actions = todoItem.querySelector('.todo-actions');
    
    // Save current text
    const currentText = todo.text;
    
    // Replace text with input
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'todo-edit-input';
    input.value = currentText;
    input.maxLength = 100;
    
    textSpan.replaceWith(input);
    input.focus();
    input.select();

    // Save on Enter or blur
    function saveEdit() {
        const newText = input.value.trim();
        if (newText && newText !== currentText) {
            todo.text = newText;
            saveTodos();
            renderTodos();
            console.log(`✏️ Todo updated:`, todo);
        } else if (!newText) {
            // If empty, revert
            renderTodos();
        } else {
            renderTodos();
        }
    }

    input.addEventListener('blur', saveEdit);
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            input.blur();
        } else if (e.key === 'Escape') {
            renderTodos();
        }
    });
}

// ===== FILTER HANDLING =====

function setFilter(filter) {
    currentFilter = filter;
    
    // Update active button
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
    
    renderTodos();
    console.log(`🔍 Filter changed to: ${filter}`);
}

// ===== KEYBOARD SHORTCUTS =====

// Add todo on Enter key
todoInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTodo();
    }
});

// ===== INITIALIZATION =====

function init() {
    console.log('🚀 Todo App Initialized');
    
    // Load saved todos
    loadTodos();
    
    // Render todos
    renderTodos();
    
    // Add event listeners
    addTodoBtn.addEventListener('click', addTodo);
    clearAllBtn.addEventListener('click', clearAllTodos);
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            setFilter(this.dataset.filter);
        });
    });
    
    // Focus input on load
    todoInput.focus();
    
    // Debug: Show initial state
    console.log('📊 Initial todos:', todos);
}

// ===== START APP =====
document.addEventListener('DOMContentLoaded', init);

// ===== CONSOLE HELPERS (For debugging) =====

// Expose useful functions to console for debugging
window.debug = {
    todos: () => console.log('Current todos:', todos),
    filter: () => console.log('Current filter:', currentFilter),
    add: (text) => {
        todoInput.value = text;
        addTodo();
    },
    clear: () => {
        todos = [];
        saveTodos();
        renderTodos();
        console.log('🗑️ All todos cleared via debug');
    },
    stats: () => {
        const total = todos.length;
        const completed = todos.filter(t => t.completed).length;
        const active = total - completed;
        console.log(`📊 Stats: Total: ${total}, Active: ${active}, Completed: ${completed}`);
    }
};
