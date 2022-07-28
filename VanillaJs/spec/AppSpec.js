describe("App", function () {

  var app;
  var tasksgroup1;
  var tasksgroup2;
  var tasksgroup3;

  beforeAll(function () {
    app = App.getInstance();

    tasksgroup1 = app.createTasksGroup();
    tasksgroup2 = app.createTasksGroup();
    tasksgroup3 = app.createTasksGroup();

  });

  /**
   * Check if the App Object is a singleton
   */
  it("should create only one instance of App", function () {
    var app2 = app.getInstance();
    expect(app).toEqual(app2)
  });

  /**
   * Check if all tasks groups are added to the application
   */
  describe("When user create a new tasks group", function () {
    it("should create a new tasks group", function () {
      expect(app.getTasksGroups().length).toBe(3);
    })
  });

  /**
   * Check when user delete one tasks group
   * Or delete all tasks groups
   */
  describe("When a user delete tasks group", function () {

    it("should delete the tasks group", function () {
      app.deleteTasksGroup(tasksgroup1);
      expect(app.getTasksGroups().length).toBe(2);
    });

    it("should delete all tasks group", function () {
      app.clear();
      expect(app.getTasksGroups().length).toBe(0);
    })

  });

})