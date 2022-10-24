const form = document.querySelector(".js-form");
const formInput = document.querySelector(".user-name");
const list = document.querySelector(".ol-list");
const formBtn = document.querySelector(".btn");
const elAllText = document.querySelector(".all");
const elComleted = document.querySelector(".completed");
const elUnText = document.querySelector(".uncompled");

const todos = [];
let initialId = 0;

const renderArray = function (array, wrapper) {
    const UnFiltered = array.filter(function (todo) {
        return todo.isCompleted === false;
    });
    
    const completedFiltered = array.filter(function (todo) {
        return todo.isCompleted === true;
    });
    
    elUnText.textContent = UnFiltered.length;
    elComleted.textContent = completedFiltered.length;
    elAllText.textContent = array.length;
    
    wrapper.innerHTML = ""; 
    array.forEach(function (element) { 
        const newItem = document.createElement("li");
        newItem.classList.add("item");
        
        const newItemBox = document.createElement("div");
        newItemBox.classList.add("item-box")
        
        const inputCheckbox = document.createElement("input");
        inputCheckbox.type = "checkbox";
        inputCheckbox.dataset.id =  element.id;
        inputCheckbox.classList.add("input-checkbox");
        newItemBox.appendChild(inputCheckbox);
        
        if (element.isCompleted) { 
            inputCheckbox.checked = true;
            newItem.style.textDecoration = "line-through"; 
        }
        
        const newText = document.createElement("p"); 
        newText.textContent = element.title; 
        newItemBox.appendChild(newText);
        newText.classList.add("item-text");
        
        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.textContent = "delete"; 
        deleteBtn.dataset.id = element.id;
        deleteBtn.classList.add("btn-del"); 
        newItemBox.appendChild(deleteBtn);
        
        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.textContent = "edit";
        editBtn.dataset.id = element.id; 
        editBtn.classList.add("btn-edit");
        newItemBox.appendChild(editBtn);
        
        newItem.appendChild(newItemBox);
        wrapper.appendChild(newItem);
    });
};

const formTypes = {
    SAVE: "save",
    EDIT: "edit",
};

let formType = formTypes.SAVE; 
let editingId = null;

form.addEventListener("submit", function (evt) { 
    evt.preventDefault();
    
    if (formType === formTypes.SAVE) { 
        todos.push({
            id: ++initialId,
            title: formInput.value, 
            isCompleted: false,
        });
        renderArray(todos, list); 
        form.reset();
    };
    
    if (formType === formTypes.EDIT) {
        const obj = { 
            id: editingId,
            title: formInput.value, 
            isCompleted: false, 
        }
        const editingFoundIndex = todos.findIndex(function (todo) {
            return todo.id === obj.id; 
        });
        todos.splice(editingFoundIndex, 1, obj);
        renderArray(todos, list); 
        formType = formTypes.SAVE; 
        formBtn.textContent = "Add";
        form.reset();
    };
});

list.addEventListener("click", function (evt) { 
    if (evt.target.matches(".btn-del")) {
        const deletedTodoid = Number(evt.target.dataset.id);
        const foundIndexTodo = todos.findIndex(function (element) { 
            return element.id === deletedTodoid;
        });
        todos.splice(foundIndexTodo, 1); 
        renderArray(todos, list);
    }
    
    if (evt.target.matches(".btn-edit")) { 
        const editedTodoId = Number(evt.target.dataset.id); 
        const editedTodo = todos.find(function (todo) { 
            return todo.id === editedTodoId;
        });
        formInput.value = editedTodo.title;
        formBtn.textContent = "edit";
        editingId = editedTodo.id;
        formType = formTypes.EDIT;
    } 
    
    if (evt.target.matches(".input-checkbox")) { 
        const inputCheckboxId = Number(evt.target.dataset.id); 
        const foundTodoCheckbox = todos.find( function (todo) { 
            return todo.id === inputCheckboxId;
        });
        foundTodoCheckbox.isCompleted = !foundTodoCheckbox.isCompleted; 
        renderArray(todos, list);
    }
});