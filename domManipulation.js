(function(){
  
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
  var appContainer = document.querySelector('.JS-app');

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
  addTasksGroupBtn.addEventListener('click', function(){
    createTasksGroupElement();
  });


  /**
   * Create a new HtmlElement that contains a list of task
   * 
   * @return {void}
   */
  function createTasksGroupElement(){
  	
    //Create a new tasksGroup
    //And get his position in the tasksGroups array
    var tasksGroupId = app.getPositionOfTasksGroup(app.createTasksGroup());    //Create the tasksGroup HTMLElement
    var tasksGroupElement = document.createElement('div');
    tasksGroupElement.setAttribute('class', 'tasks-group');
    tasksGroupElement.setAttribute('id', 'tasks-group-' + tasksGroupId);

    //Create the button used to add a new task
    //In a tasksGroup HTMLElement
    var addTaskBtn = document.createElement('button');
    addTaskBtn.setAttribute('data-tasks-group-id', tasksGroupId);
    addTaskBtn.innerText = 'Add task';

    addTaskBtn.addEventListener('click', function(){
      addTask(this.dataset.tasksGroupId);
    })

    tasksGroupElement.appendChild(addTaskBtn);
    appContainer.appendChild(tasksGroupElement);

  }

  function addTask(tasksGroupId){
    var task = new Task('Love', 'Mon amour pour toi');
    app.getTasksGroup(tasksGroupId).addTask(task);
    console.log(app.getTasksGroups());
  }

})();