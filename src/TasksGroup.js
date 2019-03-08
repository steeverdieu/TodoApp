var TasksGroup = function() {
  this.tasks = [];
}

/**
 * Add a task to a task group
 * 
 * @param {Task} task The task to add
 */
TasksGroup.prototype.addTask = function(task){
  this.tasks.push(task);
}

/**
 * Delete a task from a task group
 * 
 * @param  {Task} task The task to delete
 * @return {void} 
 */
TasksGroup.prototype.deleteTask = function(task){
  this.tasks.splice(this.tasks.indexOf(task), 1);
}

/**
 * Mark a task as complete
 * 
 * @param  {Task} task The task to mark
 * @return {void}
 */
TasksGroup.prototype.markAsComplete = function(task){
  this.task.completed();
}

/**
 * Get the list of tasks of the current tasks group
 * 
 * @return {array} The list of tasks
 */
TasksGroup.prototype.getTasks = function(){
	return this.tasks;
}


