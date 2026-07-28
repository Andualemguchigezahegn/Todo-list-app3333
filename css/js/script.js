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
