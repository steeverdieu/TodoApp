import Task from "./Task"

export default class TasksGroup {
  private tasks: Task[]
  private id: string

  constructor() {
    this.tasks = []
    this.id = Math.random().toString(16).slice(2) + this.tasks.length
  }

  /**
   * Get the id of the current TasksGroup
   *
   * @param {Task} task The task to add
   */
  getId () {
    return this.id
  }

  /**
   * Add a task to a task group
   *
   * @param {Task} task The task to add
   */
  addTask (task: Task) {
    this.tasks.push(task)
  }

  /**
   * Get the position of a sepicific task
   * In the tasks array
   *
   * @param  {Task} task The task to get the position of
   * @return {integer} The position of the task
   */
  getPositionOfTask (task: Task) {
    return this.tasks.indexOf(task)
  }

  /**
   * Delete a task from a task group
   *
   * @param  {Task} task The task to delete
   * @return {void}
   */
  deleteTask (task: Task) {
    this.tasks.splice(this.getPositionOfTask(task), 1)
  }

  /**
   * Get a specific task
   *
   * @param  {integer} index The position of the task
   * @return {Task}
   */
  getTask (index: number) {
    return this.tasks[index]
  }

  /**
   * Get the list of tasks of the current tasks group
   *
   * @return {array} The list of tasks
   */
  getTasks () {
    return this.tasks
  }
}
