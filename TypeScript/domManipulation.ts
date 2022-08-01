import App from './src/App.js'
import Task from './src/Task.js'


(function () {

  /**
   * Instance of the application
   * 
   */
  let app: App = App.getInstance();

  /**
   * Global element where to inject the app
   * 
   */
  let appContainer = document.getElementById('JS-app') as HTMLElement;

  /**
   * Button used to create a new list of tasks
   * 
   */
  let addTasksGroupBtn = document.querySelector('.JS-add-tasks-group') as HTMLElement;

  /**
   * When click on "add tasks group" button
   * Create a new tasksGroup element
   */
  addTasksGroupBtn.addEventListener('click', function () {
    createTasksGroupElement();
  });

  /**
   * Create a new HtmlElement that will contain a list of task
   * 
   * @return {void}
   */
  function createTasksGroupElement(): void {

    //Create a new tasksGroup
    let tasksGroup = app.createTasksGroup();
    //And get his position in the tasksGroups array
    let tasksGroupId = tasksGroup.getId();

    //Create the tasksGroup HTMLElement
    let tasksGroupElement = document.createElement('div');
    tasksGroupElement.setAttribute('class', 'card px-3 mt-3 tasks-group');
    tasksGroupElement.setAttribute('id', 'tasks-group-' + tasksGroupId);

    //Create the header of the card
    let tasksGroupElementHeader = document.createElement('div');
    tasksGroupElementHeader.setAttribute('class', 'card-header mt-3 d-flex justify-content-between');

    // Create the title of the tasks group
    let tasksGroupTitle = document.createElement('h4');
    tasksGroupTitle.setAttribute('class', 'card-title');
    tasksGroupTitle.setAttribute('id', 'card-title-' + tasksGroupId);
    let tasksGroupTitleText = document.createTextNode("Todo List #" + app.getTotalTasksGroups());

    //Create the button to delete a task group
    let tasksGroupDeleteBtn = document.createElement('div');
    tasksGroupDeleteBtn.setAttribute('class', 'tasks-group__delete-btn');
    tasksGroupDeleteBtn.setAttribute('data-tasks-group-id', tasksGroupId);

    let tasksGroupDeleteBtnIcon = document.createElement('i');
    tasksGroupDeleteBtnIcon.setAttribute('class', 'bi bi-x');

    //Create card body
    let tasksGroupElementBody = document.createElement('div');
    tasksGroupElementBody.setAttribute('class', 'card-body');

    // Create the html form element
    // That will let you add new tasks
    let addTaskForm = document.createElement('input');
    addTaskForm.setAttribute('class', 'form-control form-control-lg');
    addTaskForm.setAttribute('id', 'form-' + tasksGroupId);
    addTaskForm.setAttribute('type', 'text');
    addTaskForm.setAttribute('placeholder', 'Add an item to this list');
    addTaskForm.setAttribute('aria-label', 'form-control-lg');

    //Create the container
    //That will contains the list of tasks
    let tasksContainer = document.createElement('ul');
    tasksContainer.setAttribute('class', 'pt-2 list-group tasks');

    addTaskForm.addEventListener('keyup', (e: KeyboardEvent) => {
      let target = e.target as HTMLInputElement;
      if (e.keyCode === 13) {
        createTaskElement(tasksGroupId, target.value, 'description');
        target.value = "";
      }
    });

    tasksGroupDeleteBtn.addEventListener('click', function () {
      removeTasksGroup(this.dataset.tasksGroupId as string);
    });

    //Push every element into the DOM
    tasksGroupElementHeader.appendChild(tasksGroupTitle);
    tasksGroupElementHeader.appendChild(tasksGroupDeleteBtn);
    tasksGroupDeleteBtn.appendChild(tasksGroupDeleteBtnIcon)
    tasksGroupTitle.appendChild(tasksGroupTitleText);

    tasksGroupElementBody.appendChild(addTaskForm);
    tasksGroupElementBody.appendChild(tasksContainer);

    tasksGroupElement.appendChild(tasksGroupElementHeader);
    tasksGroupElement.appendChild(tasksGroupElementBody);

    appContainer.appendChild(tasksGroupElement);

  }

  /**
   * Create a new task HTMLElement
   * And add it to a tasksGroup HTMLElement
   * 
   * @param {integer} tasksGroupId The id of the tasksGroup to add the task in
   * @param {string} label The label of the tasksGroup
   * @param {string} description The description of the tasksGroup
   */
  function createTaskElement(tasksGroupId: string, label: string, description: string) {
    let task = new Task(label, description);
    let tasksGroup = app.getTasksGroup(tasksGroupId);
    tasksGroup.addTask(task);

    let taskId = tasksGroup.getPositionOfTask(task);

    //Create the container of a task
    let taskItemElement = document.createElement('li');
    taskItemElement.setAttribute('class', 'tasks-item list-group-item d-flex justify-content-between');
    taskItemElement.setAttribute('data-tasks-group-id', tasksGroupId);
    taskItemElement.setAttribute('data-task-id', taskId.toString());
    taskItemElement.setAttribute('id', 'task-item-' + tasksGroupId + taskId);

    //Create form check
    //To mark as completed
    let formCheck = document.createElement('form');
    formCheck.setAttribute('class', 'form-check');
    
    //Create the button
    //To mark as completed
    let markBtn = document.createElement('input');
    markBtn.setAttribute('class', 'tasks-item__mark-btn form-check-input me-1');
    markBtn.setAttribute('type', 'checkbox');
    markBtn.setAttribute('id', 'check-' + tasksGroupId + taskId);
    markBtn.setAttribute('data-tasks-group-id', tasksGroupId);
    markBtn.setAttribute('data-task-id', taskId.toString());
    

    //Create the label of the task
    let taskLabel = document.createElement('label');
    taskLabel.setAttribute('class', 'form-check-label tasks-item__label');
    taskLabel.setAttribute('for', 'check-' + tasksGroupId + taskId);

    taskLabel.innerText = label;

    //Create the option button
    let taskDeleteBtn = document.createElement('div');
    taskDeleteBtn.setAttribute('class', 'tasks-item__options');
    taskDeleteBtn.setAttribute('data-tasks-group-id', tasksGroupId);
    taskDeleteBtn.setAttribute('data-task-id', taskId.toString());

    let taskDeleteBtnIcon = document.createElement('i');
    taskDeleteBtnIcon.setAttribute('class', 'bi bi-trash');

    // Push every element to the DOM
    formCheck.appendChild(markBtn);
    formCheck.appendChild(taskLabel);
    
    taskDeleteBtn.appendChild(taskDeleteBtnIcon);
    
    taskItemElement.appendChild(formCheck);
    taskItemElement.appendChild(taskDeleteBtn);

    document.querySelector('#tasks-group-' + tasksGroupId + ' .tasks')?.appendChild(taskItemElement);

    //Add event to toggle the task as complete
    markBtn.addEventListener('click', function () {
      handleTaskAction(this, 'toggle-complete');
    });

    //Add event to delete a task
    taskDeleteBtn.addEventListener('click', function () {
      handleTaskAction(this, 'delete');
    })
  }

  /**
   * Mark a specific task as complete
   * 
   * @param  {HTMLElement} triggeredBtn The button that trigger the action
   * @param  {String} action Determine the action ("delete", "toggle-complete")
   * @return {void}
   */
  function handleTaskAction(triggeredBtn: HTMLElement, action: string) {

    let tasksGroupId = triggeredBtn.dataset.tasksGroupId;
    let taskId = triggeredBtn.dataset.taskId;

    if(tasksGroupId && taskId){
      let tasksGroup = app.getTasksGroup(tasksGroupId);
      if (tasksGroup) {
        let task = tasksGroup.getTask(parseInt(taskId));
        if (task) {
          if (action === 'toggle-complete') {
            task.toggleComplete();
            toggleTaskElementAsComplete(tasksGroupId, parseInt(taskId), task.isComplete());
          }
  
          if (action === 'delete') {
            tasksGroup.deleteTask(task);
            removeTaskElement(tasksGroupId, parseInt(taskId));
          }
        }
      }
    }
  }

  /**
   * Remove a tasksGroup and its HTMLElement
   * 
   * @param  {[type]} tasksGroupId The id of the tasks group
   * @return {void}
   */
  function removeTasksGroup(tasksGroupId: string) {
    let tasksGroup = app.getTasksGroup(tasksGroupId);
    app.deleteTasksGroup(tasksGroup);

    let tasksGroupElement = document.getElementById('tasks-group-' + tasksGroupId) as HTMLElement;
    let parentNode = tasksGroupElement.parentNode;

    if(parentNode){
      parentNode.removeChild(tasksGroupElement);
    }
  }

  /**
   * Update the template of a task item when it's marked as complete or not
   * 
   * @param  {integer}  tasksGroupId
   * @param  {integer}  taskId
   * @param  {Boolean} isComplete
   * @return {[void]}
   */
  function toggleTaskElementAsComplete(tasksGroupId: string, taskId: number, isComplete: boolean) {
    let taskItemElement = document.getElementById('task-item-' + tasksGroupId + taskId) as HTMLElement;

    if (isComplete) {
      taskItemElement.classList.add('is-complete', 'text-muted');
    } else {
      taskItemElement.classList.remove('is-complete', 'text-muted');
    }
  }

  /**
   * Remove the HTMLElement of a task item
   * 
   * @param  {[type]} tasksGroupId The id pf the taskGroup of the task
   * @param  {[type]} taskId       The id of the task
   * @return {void}
   */
  function removeTaskElement(tasksGroupId: string, taskId: number) {
    let taskItemElement = document.getElementById('task-item-' + tasksGroupId + taskId) as HTMLElement;
    let parentNode = taskItemElement.parentNode

    if(parentNode){
      parentNode.removeChild(taskItemElement);
    }
  }

})();