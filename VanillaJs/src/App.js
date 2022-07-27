var App = (function(){

  var instance = null;

  return {

  	/**
  	 * The tasks groups
  	 * 
  	 * @type {Array}
  	 */
  	tasksGroups: [],

  	/**
  	 * Create a single instance of the object
  	 * 
  	 * @return {this}
  	 */
  	getInstance: function() {
  	  if(instance === null){
  	  	instance = new Object(this);
  	  }
  	  return instance;
  	},

	/**
	 * Create a new task group
	 * 
	 * @return {TasksGroup} The tasks group just created
	 */
	createTasksGroup: function(){
	  var tasksGroup = new TasksGroup();
	  this.tasksGroups.push(tasksGroup);
	  return tasksGroup;
	},

	/**
	 * Delete a specific tasks group
	 * 
	 * @param  {TasksGroup} tasksGroup The tasks group to delete
	 * @return {void}
	 */
	deleteTasksGroup: function(tasksGroup){
	  this.tasksGroups.splice(this.getPositionOfTasksGroup(tasksGroup), 1);
	},

	/**
	 * Clear all tasks group
	 * 
	 * @return {void}
	 */
	clear: function(){
	  this.tasksGroups = [];
	},

	/**
	 * Get the position of a tasksGroup
	 * In the tasksGroups array
	 * 
	 * @param  {TaskGroup} tasksGroup The taskGroup to get the positionof
	 * @return {integer} The position of the tasksGroup
	 */
	getPositionOfTasksGroup: function(tasksGroup){
	  return this.tasksGroups.indexOf(tasksGroup);
	},

	/**
	 * Get a specific tasksGroup
	 * @param  {integer} index The index of the tasksGroup
	 * @return {TasksGroup}
	 */
	getTasksGroup: function(index){
	  return this.tasksGroups[index];
	},

	/**
	 * Get all tasks group
	 * 
	 * @return {array} An array of the current app tasks group
	 */
	getTasksGroups: function(){
	  return this.tasksGroups;
	}
  }
})();