//define UI vars

const form = document.querySelector('#task-form');
const inputField = document.querySelector('#task');
const list = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');



//loading all the event listeners
LoadAllEventListeners();


function LoadAllEventListeners(){

    //DOM load Event
    document.addEventListener('DOMContentLoaded', getTasks);

    //add new task
    form.addEventListener('submit', addTask);

    //delete the task 
    list.addEventListener('click', deleteTask);

    //clear task 
    clearBtn.addEventListener('click', deleteAllTask);

    //filter tasks
    filter.addEventListener('keyup', filterTasks);

}

// getTasks function for getting the list items prepopulated from 
//local storage 
function getTasks(){
    let tasks;

    if(localStorage.getItem('tasks') === null){

        tasks = [];

    }else{

        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

        tasks.forEach(function(task){

            const li = document.createElement('li');

            li.className = 'collection-item';
         
            li.appendChild(document.createTextNode(task)); 
         
            const link = document.createElement('a');
         
            link.className = 'delete-item secondary-content';
         
            link.innerHTML = '<i class="fa fa-remove"></i>';
         
            li.appendChild(link);
         
            list.appendChild(li);
         

        });

};



// addTask function for adding new task 
function addTask(e){

    e.preventDefault();

    if(inputField === ''){

        alert('Add a task');

    }


   const li = document.createElement('li');

   li.className = 'collection-item';

   li.appendChild(document.createTextNode(inputField.value)); 

   const link = document.createElement('a');

   link.className = 'delete-item secondary-content';

   link.innerHTML = '<i class="fa fa-remove"></i>';

   li.appendChild(link);

   list.appendChild(li);

   //store in Local storage

   saveToLocalStorage(inputField.value);

}

//function to store item to the local storage 
function saveToLocalStorage(task){

    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else {

        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}


//function to delete task

function deleteTask(e){

    if(e.target.parentElement.classList.contains('delete-item')){

        e.target.parentElement.parentElement.remove();

        removeTaskFromLS(e.target.parentElement.parentElement);
    }

}

// function to remove the task from local storage 
function removeTaskFromLS(taskItem){
    let tasks;

    if(localStorage.getItem('tasks')===null){

        tasks = [];

    }else{

       tasks = JSON.parse(localStorage.getItem('tasks')); 

    }
    tasks.forEach(function(task, index){

        if(taskItem.textContent === task){

           tasks.splice(index, 1); 


        }


    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    

}

//deleting all the tasks using clear task button 
function deleteAllTask(){
   
    while(list.firstChild){

        list.removeChild(list.firstChild);

    } 

    //clear from Local storage
    ClearTasksFromLocalStorage();


}

//clearing all the tasks from the local storage
function ClearTasksFromLocalStorage(){
    localStorage.clear();
}

//filtering function to filter the tasks 
function filterTasks(e){

    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(t){

            const item = t.firstChild.textContent;

            if(item.toLowerCase().indexOf(text) != -1){

               t.style.display= 'block';
            }else{

                t.style.display = 'none';    

            }

        });
    


}