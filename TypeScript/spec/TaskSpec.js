describe("Task", function () {
  var task;

  beforeAll(function () {
    task = new Task('New task', 'nope');
  });

  /**
   * Mark task as complete
   */
  it("should mark the task as complete", function () {
    task.markAsComplete()
    expect(task.completed).toBe(true);
  });

  /**
   * Mark a task as uncomplete
   */
  it("should mark the task as uncomplete", function () {
    task.markAsUncomplete();
    expect(task.completed).toBe(false);
  });

  /**
   * Mark a task as uncomplete when complete
   * Mark a task as complete when uncomplete
   */
  it("should mark the task as uncomplete", function () {
    task.markAsComplete()
    task.toggle();
    expect(task.completed).toBe(false);
    task.toggle();
    expect(task.completed).toBe(true);
  });

  /**
   * Get the right label
   */
   it("should get the right label", function () {
    expect(task.getLabel()).toBe('New task');
  });
})
