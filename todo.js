document.addEventListener("DOMContentLoaded", function() {
    const todoInput = document.getElementById("todoInput");
    const addBtn = document.getElementById("addBtn");
    const todoList = document.getElementById("todoList");
    const showDoneCheckbox = document.getElementById("showDone");

    addBtn.addEventListener("click", function() {
        const todoText = todoInput.value.trim();
        if (todoText !== "") {
            addTodoItem(todoText);
            todoInput.value = "";
        }
    });

    function addTodoItem(text) {
        const li = document.createElement("li");
        li.className = "list-group-item todo-item";
        li.innerHTML = `
            <input type="checkbox" class="form-check-input mr-2 todo-checkbox">
            <span class="todo-text">${text}</span>
            <div class="todo-item-buttons">
                <button class="btn btn-sm btn-info edit-btn">Edit</button>
                <button class="btn btn-sm btn-danger delete-btn">Delete</button>
            </div>
        `;
        todoList.appendChild(li);

        
        const editBtn = li.querySelector(".edit-btn");
        editBtn.addEventListener("click", function() {
            const todoText = this.parentElement.previousElementSibling;
            const newText = prompt("Edit Todo", todoText.textContent.trim());
            if (newText !== null && newText.trim() !== "") {
                todoText.textContent = newText.trim();
            }
        });
    }

    todoList.addEventListener("click", function(e) {
        if (e.target.classList.contains("delete-btn")) {
            e.target.parentElement.parentElement.remove();
        } else if (e.target.classList.contains("todo-checkbox")) {
            const todoText = e.target.nextElementSibling;
            todoText.classList.toggle("done");
        }
    });

    showDoneCheckbox.addEventListener("change", function() {
        const doneTodos = document.querySelectorAll(".todo-item .done");
        if (showDoneCheckbox.checked) {
            doneTodos.forEach(todo => todo.parentElement.style.display = "none");
        } else {
            doneTodos.forEach(todo => todo.parentElement.style.display = "flex");
        }
    });
});
