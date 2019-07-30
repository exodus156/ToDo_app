//Selectors
const addObject = document.querySelector('.add');
const deleteObject = document.getElementsByClassName('delete');
const searchObject = document.querySelector('.search input');
const todoList = document.querySelector('.todos');
const searchForm = document.querySelector('.search');


//Code for adding new task
addObject.addEventListener('submit', (e) => {
    e.preventDefault();  //Prevents page refreshing after submitting form

    const addObjectFormInput = document.querySelector('.add input');
    const pattern = /^[a-zA-Z0-9]{1,}$/; //RegEx pattern

    if(pattern.test(addObjectFormInput.value) == true){ //RegEx validation

        const todo = addObject.add.value.trim();

        todoList.innerHTML += 
        `<li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>`;
    
        addObject.reset();  //Reset input field
    } else{
        alert("Próbując stworzyć nowe zadanie użyto niedozwolonych znaków. Dozwolone są tylko liczby i słowa.")
    }

});

//Code for deleting finished tasks
todoList.addEventListener('click', (e) => {
    if(e.target.classList.contains("delete")){
        e.target.parentElement.remove();
    };
});


//Code for search engine
const filterFunction = (term) => {
    Array.from(todoList.children)
        .filter((task) => {
            return !task.textContent.includes(term); //Checks which tasks don't contain searched keywords
        })
        .forEach((task) => {
            task.classList.add('filtered'); //Adds custom class to tasks that makes them disappear
        });

    Array.from(todoList.children)
        .filter((task) => {
            return task.textContent.includes(term); //Checks which tasks contain searched keywords
        })
        .forEach((task) => {
            task.classList.remove('filtered'); //Removes custom class to tasks that makes them disappear
        });
};


//Keyup event
searchObject.addEventListener('keyup', () => {
    const term = searchObject.value.trim().toLowerCase();
    filterFunction(term);
});

//Prevents refreshing page after submitting search form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
});