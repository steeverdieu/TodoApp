/**
 * Class that represents a task
 * 
 */

export default class Task {
  private label: string;
  private description: string;
  private completed: boolean;

  constructor(label: string, description: string){
    this.label = label;
    this.description = description;
    this.completed = false;
  }

  /**
   * Mark the current task as completed
   * 
   * @return {Task} The current task
   */
  markAsComplete () {
    this.completed = true;
    return this;
  }

  /**
   * Mark a task as uncompleted
   * 
   * @return {Task} The current task
   */
  markAsUncomplete () {
    this.completed = false;
    return this;
  }

  /**
   * Mark as completed or uncompleted
   * 
   * @return {Task} The current task
   */
  toggleComplete () {
    this.completed = !this.completed;
    return this;
  }

  /**
   * Get the label of the task
   * 
   * @return {string}
   */
  getLabel () {
    return this.label;
  }

  /**
   * Get if the current task is complete or not
   * 
   * @return {Boolean}
   */
  isComplete () {
    return this.completed;
  }
}