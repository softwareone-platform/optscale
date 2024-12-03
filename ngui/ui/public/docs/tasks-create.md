### **Summary**

A task in machine learning is a specific problem that needs to be solved using machine learning algorithms.

Use this page to create a new task.  

### **View**

- Add Task Form: Specify the name, key, metrics, and other task properties.

### **Actions**

- Add a Task: 

  - Specify Parameters: Enter the task name, key, owner and task description. The task key must be unique it will 
    be used to identity this task in your training code.

  - Select Task Metrics: Choose the metrics that need to be tracked for this task.
  
### **Tips**

- Link Run and Task by Key: The task key is used to link the run to the created task. To create a run for this task, 
  call the ```arcee.init()``` method like: ```arcee.init(profiling_token, task_key)``` into your code.

- Enabling Metrics: If you did not select any metrics when creating the task, go to the task editing page 
  and enable them there. You can enable and add new metrics to an existing task at any time.