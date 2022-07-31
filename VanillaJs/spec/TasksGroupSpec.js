describe("Tasks Group", function () {
  var tasksGroup;
  var task1;
  var task2;
  var task3;

  beforeAll(function () {
    tasksGroup = new TasksGroup();

    task1 = new Task();
    task2 = new Task();
    task3 = new Task();

    tasksGroup.addTask(task1);
    tasksGroup.addTask(task2);
    tasksGroup.addTask(task3);
  });

  /**
   * Check if the tasks has been added correctly
   */
  it("should get the right number of tasks", function () {
    expect(tasksGroup.getTasks().length).toBe(3);
  });

  /**
   * Check if task is sucessfully deleted from a task group
   */
  it("should delete a task from the the tasks group", function () {
    tasksGroup.deleteTask(task3);
    expect(tasksGroup.getTasks().length).toBe(2);
  });

  /**
   * Check the position of each task
   */
  it("should get the right position of each task", function () {
    expect(tasksGroup.getPositionOfTask(task1)).toBe(0);
    expect(tasksGroup.getPositionOfTask(task2)).toBe(1);
  });

  /**
   * Get a task
   */
  it("Get a task from the list of tasks", function () {
    expect(tasksGroup.getTask(0)).toEqual(task1);
    expect(tasksGroup.getTask(1)).toEqual(task2);
  });

  /**
   * Get all the tasks
   */
  it("Get all the tasks", function () {
    expect(tasksGroup.getTasks()).toEqual([task1, task2]);
  });
})
