(function(){
  
  /**
   * Instance of the application
   * 
   * @type {App}
   */
  var app = App.getInstance();

  /**
   * The modal that contains the form to add task
   * 
   * @type {HTMLElement}
   */
  var modalForm = document.querySelector('.JS-tasks-modal');

  /**
   * The form to add new tasks
   * 
   * @type {HTMLELement}
   */
  var formToAddTasks = document.querySelector('.JS-add-task-form');

  /**
   * Button to close the tasks form
   * 
   * @type {HTMLElement}
   */
  var closeTaskFormBtn = document.querySelector('.JS-close-task-form');

  /**
   * Global element where to inject the app
   * 
   * @type {HTMLElement}
   */
  var appContainer = document.querySelector('.JS-app');

  /**
   * Button used to create a new list of tasks
   * 
   * @type {HTMLElement}
   */
  var addTasksGroupBtn = document.querySelector('.JS-add-tasks-group');

  /**
   * Keep a reference to the listener
   * That handle the function that adds a new task to a tasksGroup
   * 
   * @type {function|null}
   */
  var handleAddTaskFunction = null;

  /**
   * When click
   * Create a new tasksGroup element
   */
  addTasksGroupBtn.addEventListener('click', function(){
    createTasksGroupElement();
  });

  closeTaskFormBtn.addEventListener('click', function(){
  	hideTaskForm();
  });

  /**
   * Create a new HtmlElement that contains a list of task
   * 
   * @return {void}
   */
  function createTasksGroupElement(){
  	
    //Create a new tasksGroup
    //And get his position in the tasksGroups array
    var tasksGroupId = app.getPositionOfTasksGroup(app.createTasksGroup());

    //Create the tasksGroup HTMLElement
    var tasksGroupElement = document.createElement('div');
    tasksGroupElement.setAttribute('class', 'tasks-group');
    tasksGroupElement.setAttribute('id', 'tasks-group-' + tasksGroupId);
    
    //Create the button to delete a task group
    var tasksGroupDeleteBtn = document.createElement('div');
    tasksGroupDeleteBtn.setAttribute('class', 'tasks-group__delete-btn');
    tasksGroupDeleteBtn.setAttribute('data-tasks-group-id', tasksGroupId);

    //Create the container
    //That will contains the list of tasks
    var tasksContainer = document.createElement('div');
    tasksContainer.setAttribute('class', 'tasks');

    //Create the button used to add a new task
    //In a tasksGroup HTMLElement
    var addTaskBtn = document.createElement('button');
    addTaskBtn.setAttribute('data-tasks-group-id', tasksGroupId);
    addTaskBtn.setAttribute('class', 'btn');
    addTaskBtn.innerText = 'Add task';

    addTaskBtn.addEventListener('click', function(){
      showTaskForm(this.dataset.tasksGroupId);
    });

    tasksGroupDeleteBtn.addEventListener('click', function(){
      removeTasksGroup(this.dataset.tasksGroupId);
    })

    tasksGroupElement.appendChild(tasksGroupDeleteBtn);
    tasksGroupElement.appendChild(tasksContainer);
    tasksGroupElement.appendChild(addTaskBtn);
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
  function createTaskElement(tasksGroupId, label, description){
    var task = new Task(label, description);
    var tasksGroup = app.getTasksGroup(tasksGroupId);
    tasksGroup.addTask(task);

    var taskId = tasksGroup.getPositionOfTask(task);

    //Create the container of a task
    var taskItemElement = document.createElement('div');
    taskItemElement.setAttribute('class', 'tasks-item');
    taskItemElement.setAttribute('data-tasks-group-id', tasksGroupId);
    taskItemElement.setAttribute('data-task-id', taskId);
    taskItemElement.setAttribute('id', 'task-item-' + tasksGroupId + taskId);


    //Create the button
    //To mark as completed
    var markBtn = document.createElement('div');
    markBtn.setAttribute('class', 'tasks-item__mark-btn');

    //Create the label of the task
    var taskLabel = document.createElement('div');
    taskLabel.setAttribute('class', 'tasks-item__label');
    taskLabel.innerText = task.getLabel();

    //Create the option button
    var taskDeleteBtn = document.createElement('div');
    taskDeleteBtn.setAttribute('class', 'tasks-item__options');

    taskItemElement.appendChild(markBtn);
    taskItemElement.appendChild(taskLabel);
    taskItemElement.appendChild(taskDeleteBtn);

    document.querySelector('#tasks-group-' + tasksGroupId + ' .tasks').appendChild(taskItemElement);

    //Add event to toggle the task as complete
    markBtn.addEventListener('click', function(){
      handleTaskAction(this, 'toggle-complete');
    });

    //Add event to delete a task
    taskDeleteBtn.addEventListener('click', function(){
      handleTaskAction(this, 'delete');
    })
  }

  /**
   * show the form that provides way to add a tasks
   * 
   * @param  {integer} tasksGroupId The id of the tasksgroup in which to add the task
   * @return {void}
   */
  function showTaskForm(tasksGroupId){
    modalForm.classList.add('is-active');
    handleAddTaskFunction = addTask(tasksGroupId);
    formToAddTasks.addEventListener('submit', handleAddTaskFunction);
  }

  /**
   * Event listener when a user try to add a new task to a tasksGroup
   * @param {integer} tasksGroupId The tasksGroup in which to add the task
   */
  var addTask = function(tasksGroupId){
    return function(e){
      e.preventDefault();

      var datas = new FormData(formToAddTasks);
      var label = datas.get('label');
      var description = datas.get('description');

	  if(label){
	    createTaskElement(tasksGroupId, label, description);
	    formToAddTasks.reset();
	  }
	}
  }

  /**
   * Hide the form that provides way to add tasks
   * 
   * @return {void}
   */
  function hideTaskForm(){
    modalForm.classList.remove('is-active');
    formToAddTasks.removeEventListener('submit', handleAddTaskFunction);
    handleAddTaskFunction = null;
  }
  
  /**
   * Mark a specific task as complete
   * 
   * @param  {HTMLElement} triggeredBtn The button that trigger the action
   * @param  {String} action Determine the action ("delete", "toggle-complete")
   * @return {void}
   */
  function handleTaskAction(triggeredBtn, action){

    var parentNode = triggeredBtn.parentNode;
    var tasksGroupId = parentNode.dataset.tasksGroupId;
    var taskId = parentNode.dataset.taskId;

  	var tasksGroup = app.getTasksGroup(tasksGroupId);
  	if(tasksGroup){
  	  var task = tasksGroup.getTask(taskId);
  	  if(task){
        if(action === 'toggle-complete'){
          task.toggleComplete();
          toggleTaskElementAsComplete(tasksGroupId, taskId, task.isComplete());
        }

        if(action === 'delete'){
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
  function removeTasksGroup(tasksGroupId){
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
  function toggleTaskElementAsComplete(tasksGroupId, taskId, isComplete){
    var taskItemElement = document.getElementById('task-item-' + tasksGroupId + taskId);

    if(isComplete){
      taskItemElement.classList.add('is-complete');
    }else{
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
  function removeTaskElement(tasksGroupId, taskId){
    var taskItemElement = document.getElementById('task-item-' + tasksGroupId + taskId);
    taskItemElement.parentNode.removeChild(taskItemElement);
  }

})();