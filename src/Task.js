/**
 * Class that represents a task
 * 
 * @param  {string} label       The label of the task
 * @param  {[type]} description The description of the ask
 * @return {void}
 */
var Task = function(label, description) {
  this.label = label;
  this.description = description;
  this.completed = false;
}

/**
 * Mark the current task as completed
 * 
 * @return {Task} The current task
 */
Task.prototype.markAsComplete = function(){
  this.completed = true;
  return this;
}

/**
 * Mark a task as uncompleted
 * 
 * @return {Task} The current task
 */
Task.prototype.markAsUncomplete = function(){
  this.completed = false;
  return this;
}

/**
 * Get the label of the task
 * 
 * @return {strin}
 */
Task.prototype.getLabel = function(){
  return this.label;
}