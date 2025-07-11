### **Summary**

Use this page to configure the task parameters.

### **View**

- Edit Task Form: Change the basic parameters, tracked metrics, and template for building leaderboards.

### **Actions**

- Metric Management: Add or remove metrics to track in the task.

- Leaderboard Template Configuration: Create preset configuration for building leaderboards. This template may include 
  parameters for grouping runs, restrictions on tracked metrics, and dataset 
  coverage rules.
  
### **Tips**

- Create the Metric Later: If the metric was not created in advance but was sent using the method 
  ```arcee.send({ "metric_key": value })``` in the training code, then create a metric with the same ```metric_key``` in 
  OptScale and add it for tracking in the task to monitor it.