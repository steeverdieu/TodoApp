(function () {

  /**
   * Instance of the application
   * 
   * @type {App}
   */
  var app = App.getInstance();

  /**
   * Global element where to inject the app
   * 
   * @type {HTMLElement}
   */
  var appContainer = document.getElementById('JS-app');

  /**
   * Button used to create a new list of tasks
   * 
   * @type {HTMLElement}
   */
  var addTasksGroupBtn = document.querySelector('.JS-add-tasks-group');

  /**
   * When click
   * Create a new tasksGroup element
   */
  addTasksGroupBtn.addEventListener('click', function () {
    createTasksGroupElement();
  });

  /**
   * Create a new HtmlElement that contains a list of task
   * 
   * @return {void}
   */
  function createTasksGroupElement() {

    //Create a new tasksGroup
    //And get his position in the tasksGroups array
    var tasksGroupId = app.getPositionOfTasksGroup(app.createTasksGroup());

    //Create the tasksGroup HTMLElement
    var tasksGroupElement = document.createElement('div');
    tasksGroupElement.setAttribute('class', 'card px-3 mt-3 tasks-group');
    tasksGroupElement.setAttribute('id', 'tasks-group-' + tasksGroupId);

    //Create card body
    var tasksGroupElementBody = document.createElement('div');
    tasksGroupElementBody.setAttribute('class', 'card-body');

    // Create the title of the tasks group
    var tasksGroupTitle = document.createElement('h4');
    tasksGroupTitle.setAttribute('class', 'card-title');
    tasksGroupTitle.setAttribute('id', 'card-title-' + tasksGroupId);

    // Create the node texzt of the title
    var tasksGroupTitleText = document.createTextNode("Todo List #" + parseInt(tasksGroupId + 1));

    // Create the html form element
    var htmlForm = document.createElement('input');
    htmlForm.setAttribute('class', 'form-control form-control-lg');
    htmlForm.setAttribute('id', 'form-' + tasksGroupId);
    htmlForm.setAttribute('type', 'text');
    htmlForm.setAttribute('placeholder', 'Add an item to this list');
    htmlForm.setAttribute('aria-label', 'form-control-lg example');

    //Create the button to delete a task group
    var tasksGroupDeleteBtn = document.createElement('div');
    tasksGroupDeleteBtn.setAttribute('class', 'tasks-group__delete-btn');
    tasksGroupDeleteBtn.setAttribute('data-tasks-group-id', tasksGroupId);

    //Create the container
    //That will contains the list of tasks
    var tasksContainer = document.createElement('ul');
    tasksContainer.setAttribute('class', 'pt-2 list-group tasks');

    htmlForm.addEventListener('keyup', function (e) {
      if (e.keyCode === 13) {
        createTaskElement(tasksGroupId, e.target.value, 'description');
        e.target.value = "";
      }
    });

    tasksGroupDeleteBtn.addEventListener('click', function () {
      removeTasksGroup(this.dataset.tasksGroupId);
    })


    tasksGroupElement.appendChild(tasksGroupElementBody);

    tasksGroupTitle.appendChild(tasksGroupTitleText);
    tasksGroupElementBody.appendChild(tasksGroupTitle);

    tasksGroupElementBody.appendChild(htmlForm);
    tasksGroupElementBody.appendChild(tasksGroupDeleteBtn);
    tasksGroupElementBody.appendChild(tasksContainer);

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
  function createTaskElement(tasksGroupId, label, description) {
    var task = new Task(label, description);
    var tasksGroup = app.getTasksGroup(tasksGroupId);
    tasksGroup.addTask(task);

    var taskId = tasksGroup.getPositionOfTask(task);

    //Create the container of a task
    var taskItemElement = document.createElement('li');
    taskItemElement.setAttribute('class', 'tasks-item list-group-item d-flex justify-content-between');
    taskItemElement.setAttribute('data-tasks-group-id', tasksGroupId);
    taskItemElement.setAttribute('data-task-id', taskId);
    taskItemElement.setAttribute('id', 'task-item-' + tasksGroupId + taskId);

    //Create form check
    //To mark as completed
    var formCheck = document.createElement('form');
    formCheck.setAttribute('class', 'form-check');
    
    //Create the button
    //To mark as completed
    var markBtn = document.createElement('input');
    markBtn.setAttribute('class', 'tasks-item__mark-btn form-check-input me-1');
    markBtn.setAttribute('type', 'checkbox');
    markBtn.setAttribute('id', 'check-' + tasksGroupId + taskId);

    //Create the label of the task
    var taskLabel = document.createElement('label');
    taskLabel.setAttribute('class', 'form-check-label tasks-item__label');
    taskLabel.setAttribute('for', 'check-' + tasksGroupId + taskId);

    taskLabel.innerText = task.getLabel();

    //Create the option button
    var taskDeleteBtn = document.createElement('div');
    taskDeleteBtn.setAttribute('class', 'tasks-item__options');

    var taskDeleteBtnIcon = document.createElement('i');
    taskDeleteBtnIcon.setAttribute('class', 'bi bi-trash');

    taskItemElement.appendChild(formCheck);
    formCheck.appendChild(markBtn);
    formCheck.appendChild(taskLabel);
    taskDeleteBtn.appendChild(taskDeleteBtnIcon);
    taskItemElement.appendChild(taskDeleteBtn);


    document.querySelector('#tasks-group-' + tasksGroupId + ' .tasks').appendChild(taskItemElement);

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
  function handleTaskAction(triggeredBtn, action) {

    var parentNode = triggeredBtn.parentNode;
    var tasksGroupId = parentNode.dataset.tasksGroupId;
    var taskId = parentNode.dataset.taskId;

    var tasksGroup = app.getTasksGroup(tasksGroupId);
    if (tasksGroup) {
      var task = tasksGroup.getTask(taskId);
      if (task) {
        if (action === 'toggle-complete') {
          task.toggleComplete();
          toggleTaskElementAsComplete(tasksGroupId, taskId, task.isComplete());
        }

        if (action === 'delete') {
          tasksGroup.deleteTask(task);
          removeTaskElement(tasksGroupId, taskId);
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
  function removeTasksGroup(tasksGroupId) {
    var tasksGroup = app.getTasksGroup(tasksGroupId);
    app.deleteTasksGroup(tasksGroup);

    var tasksGroupElement = document.getElementById('tasks-group-' + tasksGroupId);
    tasksGroupElement.parentNode.removeChild(tasksGroupElement);
  }

  /**
   * Update the template of a task item when it's marked as complete or not
   * 
   * @param  {integer}  tasksGroupId
   * @param  {integer}  taskId
   * @param  {Boolean} isComplete
   * @return {[void]}
   */
  function toggleTaskElementAsComplete(tasksGroupId, taskId, isComplete) {
    var taskItemElement = document.getElementById('task-item-' + tasksGroupId + taskId);

    if (isComplete) {
      taskItemElement.classList.add('is-complete');
    } else {
      taskItemElement.classList.remove('is-complete');
    }
  }

  /**
   * Remove the HTMLElement of a task item
   * 
   * @param  {[type]} tasksGroupId The id pf the taskGroup of the task
   * @param  {[type]} taskId       The id of the task
   * @return {void}
   */
  function removeTaskElement(tasksGroupId, taskId) {
    var taskItemElement = document.getElementById('task-item-' + tasksGroupId + taskId);
    taskItemElement.parentNode.removeChild(taskItemElement);
  }

})();