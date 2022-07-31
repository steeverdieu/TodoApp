describe("App", function () {

  var app;
  var tasksgroup1;

  beforeAll(function () {
    app = App.getInstance();

    tasksgroup1 = app.createTasksGroup();
    app.createTasksGroup();
    app.createTasksGroup();

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
      expect(app.totalTasksGroups).toBe(3);
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
      expect(app.totalTasksGroups).toBe(3);
      expect(app.getTasksGroups().length).toBe(2);
    });

    it("should delete all tasks group", function () {
      app.clear();
      expect(app.totalTasksGroups).toBe(3);
      expect(app.getTasksGroups().length).toBe(0);
    })

  });

  /**
   * Check if we  get the right position of a tasks group
   */
   describe("When we get the position of a taskgroup", function () {

    it("should get the right position", function () {
      var tasksGroups1 = app.createTasksGroup();
      var tasksGroups2 = app.createTasksGroup();

      expect(app.getPositionOfTasksGroup(tasksGroups1)).toBe(0);
      expect(app.getPositionOfTasksGroup(tasksGroups2)).toBe(1);

      app.deleteTasksGroup(tasksGroups1);
      expect(app.getPositionOfTasksGroup(tasksGroups1)).toBe(-1);
      expect(app.getPositionOfTasksGroup(tasksGroups2)).toBe(0);
    });

  });

  /**
   * Check if we  get the right tasks group
   * By providing its ID
   */
   describe("When we get a taskgroup", function () {

    it("should get the right tasks group", function () {
      var tasksGroups1 = app.createTasksGroup();
      var tasksGroups2 = app.createTasksGroup();

      expect(app.getTasksGroup(tasksGroups1.id)).toBe(tasksGroups1);
      expect(app.getTasksGroup(tasksGroups2.id)).toBe(tasksGroups2);
      expect(app.getTasksGroup('undefinedId')).toBe(undefined);

      app.clear();
    });
   });

  /**
   * Check if we  get the right position of a tasks group
   */
   describe("When we get all the tasks groups", function () {

    it("should get the exact list of tasks groups", function () {
      var tasksGroups1 = app.createTasksGroup();
      var tasksGroups2 = app.createTasksGroup();

      expect(app.getTasksGroups().length).toBe(2);

      app.clear();
      expect(app.getTasksGroups().length).toBe(0);
    });

  });

})