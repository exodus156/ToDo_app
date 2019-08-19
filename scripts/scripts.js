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
    const pattern = /^[^<>]{1,}$/; //RegEx pattern

    if(pattern.test(addObjectFormInput.value) && storageAvailable('localStorage')){ //RegEx and local storage validation

        const todo = addObject.add.value.trim();

        todoList.innerHTML += 
        `<li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>`;
    
        localStorage.setItem(todo, ""); //Adds To Do to local storage

        addObject.reset();  //Reset input field

    } else if(pattern.test(addObjectFormInput.value)){  //RegEx validation

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
        localStorage.removeItem(e.target.parentElement.querySelector('span').innerText); //Removes item from local storage
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

//Checks if local Storage is availble
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        let x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

//Access data in local storage and adds saved todos to list
const addSavedTodos = () => {
    for(i=0; i<localStorage.length; i++){
        todoList.innerHTML += 
        `<li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${localStorage.key([i])}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>`;
    }
};

addSavedTodos(); //Adds saved todos on page on load