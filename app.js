let taskInput = document.querySelector('.task-input');
const allTasksDiv = document.querySelector('.tasks');

let allTasksArray = ['take shower', 'read 30 minutes', 'call Joe'];

loadTaskList();

document.querySelector('.add-task').addEventListener('click', addTask);
document.querySelector('.task-input').addEventListener('keypress', checkEnterPress);

function checkEnterPress(event) {
    if (event.code == 'Enter')
        addTask();
}

function addTask() {
    let task = taskInput.value;
    taskInput.value = '';  // we make the input box empty
    if (task === '') {
        // console.log("no task written to the input");
    } else if (allTasksArray.includes(task)) {
        let duplicateIndex = allTasksArray.indexOf(task);
        let duplicaateElement = allTasksDiv.children[duplicateIndex];
        duplicaateElement.style.setProperty('border', '3px red solid');
        setTimeout(function () {
            window.alert('Duplicate Task with taks number ' + (duplicateIndex + 1).toString());
            duplicaateElement.style.setProperty('border', '1px #4b4bff solid');
        }, 100);

    } else {  // adding new task to the list
        allTasksArray.splice(allTasksArray.length, 0, task);
        loadTaskList();
    }

}

function allTaskDivRemoveAllChild() {
    while (allTasksDiv.firstChild) {
        allTasksDiv.removeChild(allTasksDiv.firstChild);
    }
}

function removeTask() {
    let taskIndex = this.parentNode.id;
    allTasksArray.splice(taskIndex, 1);
    loadTaskList();
}

function ckeckDoneTask() {
    this.parentNode.classList.toggle('done-task');
}

function loadTaskList() {
    allTaskDivRemoveAllChild();
    for (let i = 0; i < allTasksArray.length; i++) {
        let pElement = document.createElement('p');
        pElement.classList.add('task');
        pElement.innerHTML = (i + 1).toString() + '. ' + allTasksArray[i];
        pElement.id = i.toString();

        let doneBtn = document.createElement('button');
        doneBtn.classList.add('done-button');
        doneBtn.classList.add('task-button');
        doneBtn.addEventListener('click', ckeckDoneTask);

        pElement.appendChild(doneBtn);


        let removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-button');
        removeBtn.classList.add('task-button');
        removeBtn.addEventListener('click', removeTask);

        pElement.appendChild(removeBtn);

        allTasksDiv.appendChild(pElement);
    }
}
