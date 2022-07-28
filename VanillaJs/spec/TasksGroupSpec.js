describe("Tasks Group", function () {

  /**
   * Check if task is sucessfully deleted from a task group
   */
  it("should delete a task from the the tasks group", function () {
    var tasksGroup = new TasksGroup();
    var task1 = new Task();
    var task2 = new Task();
    var task3 = new Task();

    tasksGroup.addTask(task1);
    tasksGroup.addTask(task2);
    tasksGroup.addTask(task3);

    expect(tasksGroup.getTasks().length).toBe(3);

    tasksGroup.deleteTask(task3);

    expect(tasksGroup.getTasks().length).toBe(2);
  })
})