let input = document.getElementById("addTask");
let ul = document.getElementById("taskList");
let categoryInput = document.getElementById("categoryInput");
let dateInput = document.getElementById("dateInput");


// گرفتن دیتا از localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Empty State
let emptyState = document.createElement("div");
emptyState.textContent = "No tasks yet ✨";
emptyState.classList.add("empty-state");
ul.parentNode.insertBefore(emptyState, ul);

// آپدیت Empty State
function updateEmptyState() {
    emptyState.style.display = tasks.length === 0 ? "block" : "none";
}

// ذخیره در localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// رندر کامل لیست
function renderTasks() {
    ul.innerHTML = "";

    tasks.forEach(task => createTask(task));

    updateEmptyState();
}

// ساخت UI تسک
function createTask(task) {
    let li = document.createElement("li");

    let text = document.createElement("span");
    text.textContent = task.text;
    if (task.completed) {
        li.classList.add("done");
    }

    // Category
    let categoryEl = document.createElement("span");
    categoryEl.textContent = task.category || "none";
    categoryEl.classList.add("category-badge");
    categoryEl.classList.add(task.category);

    // Date
    let dateEl = document.createElement("span");
    dateEl.textContent = task.date || "";
    dateEl.classList.add("date");

    // Checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", function () {
        task.completed = checkbox.checked;
        saveTasks();
        renderTasks();
    });

    // DELETE
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function (event) {
        event.stopPropagation();

        tasks = tasks.filter(t => t.id !== task.id);

        saveTasks();
        renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(categoryEl);
    li.appendChild(dateEl);
    li.appendChild(deleteBtn);

    ul.appendChild(li);
}

// لود اولیه
renderTasks();

// اضافه کردن تسک
function addTask() {
    let taskText = input.value.trim();
    let categoryValue = categoryInput.value.trim();
    let dateValue = dateInput.value;

    const validCategories = ["Work", "Home", "Urgent" , "Health"];
    if (!validCategories.includes(categoryValue)) {
        categoryValue = "home"; // default category
    }
    

    if (!taskText) return;

    let newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        category: categoryValue,
        date: dateValue
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    input.value = "";
    categoryInput.value = "";
    dateInput.value = "";
}

// Enter key
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});