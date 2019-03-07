var TasksGroup = function() {
  this.tasks = [];
}

/**
 * Add a task to a task group
 * 
 * @param {Task} task The task to add
 */
TasksGroup.prototype.addTask(task){
  this.tasks.push(task);
}

/**
 * Delete a task from a task group
 * 
 * @param  {Task} task The task to delete
 * @return {void} 
 */
TasksGroup.prototype.deleteTask(task){
  this.tasks.splice(this.tasks.indexOf(task), 1);
}

/**
 * Mark a task as complete
 * 
 * @param  {Task} task The task to mark
 * @return {void}
 */
tasks.prototype.markAsComplete(task){
  this.task.completed();
}


