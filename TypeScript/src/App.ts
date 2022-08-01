import TasksGroup from "./TasksGroup.js";

export default class App {

  private static instance: App | null = null;

  /**
   * The tasks groups
   * 
   * @type {Array}
   */
  private tasksGroups: TasksGroup[]

  /**
  * The number of tasksGroups
  * That has been created
  * Since the app has been running
  * 
  * @type {Number}
  */
  private totalTasksGroups: number

  constructor(){
    this.tasksGroups = [];
    this.totalTasksGroups = 0;
  }

  /**
   * Create a single instance of the object
   * 
   * @return {this}
   */
  static getInstance() {
    if (App.instance === null) {
      App.instance = new App();
    }
    return App.instance;
  }

  getTotalTasksGroups() {
    return this.totalTasksGroups
  }

  /**
   * Create a new task group
   * 
   * @return {TasksGroup} The tasks group just created
   */
  createTasksGroup() {
    this.totalTasksGroups += 1;
    var tasksGroup = new TasksGroup();
    this.tasksGroups.push(tasksGroup);
    return tasksGroup;
  }

  /**
   * Delete a specific tasks group
   * 
   * @param  {TasksGroup} tasksGroup The tasks group to delete
   * @return {void}
   */
  deleteTasksGroup (tasksGroup: TasksGroup) {
    this.tasksGroups.splice(this.getPositionOfTasksGroup(tasksGroup), 1);
  }

  /**
   * Clear all tasks group
   * 
   * @return {void}
   */
  clear() {
    this.tasksGroups = [];
  }

  /**
   * Get the position of a tasksGroup
   * In the tasksGroups array
   * 
   * @param  {TaskGroup} tasksGroup The taskGroup to get the positionof
   * @return {integer} The position of the tasksGroup
   */
  getPositionOfTasksGroup (tasksGroup: TasksGroup) {
    return this.tasksGroups.indexOf(tasksGroup);
  }

  /**
   * Get a specific tasksGroup
   * 
   * @param  {integer} index The index of the tasksGroup
   * @return {TasksGroup}
   */
  getTasksGroup(tasksGroupId: string) {
    return this.tasksGroups.filter(function(tasksGroup){
      return tasksGroup.getId() == tasksGroupId
    })[0];
  }

  /**
   * Get all tasks group
   * 
   * @return {array} An array of the current app tasks group
   */
  getTasksGroups() {
    return this.tasksGroups;
  }

}