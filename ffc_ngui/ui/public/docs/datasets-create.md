### **Summary**

A dataset in machine learning is a structured collection of data used for training, validating, and testing algorithms.

Use this page to create a new dataset.  

### **View**

- Add Dataset Form: Specify the path, validity period, and other dataset properties.

### **Actions**

- Add a Dataset: 

  - Specify Dataset Name: Define the dataset name. This name will be used in all tables to identify this dataset.
  
  - Point Dataset Path: Enter the dataset path. To use this dataset in your training code, call the ```arcee.dataset()``` 
    method like: ```arcee.dataset("path")```.
  
  - Define Validity Period: Specify the validity period of the dataset, which is the timeframe during which the data 
    remains relevant and accurate for its intended use.
  
  - Specify Description: Enter a description of the dataset.
  
  - Select Labels: Add labels to the dataset to indicate its class or category. The dataset can have multiple labels. 
    Labels are used in the Leaderboards.
  
### **Tips**

- Time-saving: The dataset does not need to be created in advance. Use the command ```arcee.dataset("path")``` in your 
  training code, and the specified dataset will be logged automatically.