const elForm = document.querySelector(".js-form");
const elNameInp = document.querySelector(".user-name");
const elList = document.querySelector(".ol-list");


elForm.addEventListener("submit", function(evt){
    evt.preventDefault();
    
    const newNameValue = elNameInp.value;
    
    const newObject = {
        name: newNameValue, 
    };
    
    const newArr = [];
    
    newArr.push(newObject);
    elForm.reset();
    
    newArr.forEach(function(value) {
        const newItem = document.createElement("li");
        const newBox = document.createElement("div")
        const newLabel = document.createElement("label");
        const newInput = document.createElement("input");
        const newText = document.createElement("p");
        const newBtn = document.createElement("button");
        const newBtnEdit = document.createElement("button");
        
        newItem.classList.add("item");
        newBox.classList.add("item-box")
        newText.classList.add("item-text");
        newBtn.classList.add("btn-remove");
        newBtnEdit.classList.add("btn-remove");
        newInput.classList.add("item-check");
        
        newText.textContent = value.name;

        newLabel.for = "chec";

        newInput.id = "chec";
        newInput.name = "user_check";
        newInput.type = "checkbox";
        
        newBtn.textContent = "Remove";
        newBtn.type = "button";

        newBtnEdit.textContent = "Edit";
        newBtnEdit.type = "button";
        
        newBox.appendChild(newLabel);
        newBox.appendChild(newInput);
        newBox.appendChild(newText);
        newBox.appendChild(newBtnEdit);
        newBox.appendChild(newBtn);

        newItem.appendChild(newBox);
        
        elList.appendChild(newItem);
        
        newBtn.addEventListener('click', () => {
            newItem.style.display = "none"
        })
    });
});