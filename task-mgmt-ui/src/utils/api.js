const API_URL = 'http://localhost:8080/api/'; 

export const signUpApi = async (userData) => {
  try {
    const response = await fetch(`${API_URL}users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  } catch (error) {
    console.error('Error signing up:', error);
  }
};


export const signInApi = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const result = await response.json(); 

        if (response.ok && result.status) { 
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("refreshToken", result.data.refreshToken);
            localStorage.setItem("user", JSON.stringify(result.data.userDto)); 

            return result;
        } else {
            throw new Error(result.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error signing in:', error);
        return null;
    }
};

export const getUserTasks = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await fetch(`${API_URL}tasks/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch tasks");
    }
    return result.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const getTaskById = async (taskId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.data; 
};

export const updateTask = async (updatedData) => {
  try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}tasks/update`, {
          method: "PUT",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
          throw new Error(`Failed to update task: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data;
  } catch (error) {
      console.error("Error updating task:", error);
      throw error;
  }
};

export const getAllUsers = async () => {
  try{
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}users/all` ,{
      method:'GET',
      headers:{
        Authorization: `Bearer ${token}`,
        "Content-Type":"applicaion/json"
      }
    });
    if(!response.ok){
      throw new Error(`Failed to get all users:  ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch(error){
    console.log("Error while getting users: ",error);
    throw error;
  }
};

export const assignUsersToTask = async (taskId,username) =>{
  try{
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}tasks/assign`,{
        method:'PUT',
        headers:{
          Authorization : `Bearer ${token}`,
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          taskId,
          username
        })
      });
      if(!response.ok){
        throw new Error(`Failed to assign users: ${response.statusText}`);
      }
      const data = response.json();
      return data.data;
  }catch(error){
    console.error("Error while assigning users.");
    throw error;
  }
};

export const createTask = async(task) => {
    try{
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}tasks/create`,{
        method:'POST',
        headers:{
          Authorization:`Bearer ${token}`,
          "Content-Type":'application/json'
        },
        body: JSON.stringify(task)
      });
      if(!response.ok){
        throw new Error(`Failed create task API call ${response.statusText}`);
      }
      const data = response.json();
      return data.data;
    }catch(error){
      throw error;
    }
}

export const createSubTask = async(parentTaskId,subTasks) =>{
  try{
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}tasks/${parentTaskId}/create-subtask`,{
      method:'POST',
      headers : {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(subTasks)
    });
    if(!response.ok){
      throw new Error(response.statusText);
    }
    const data = response.json()
    return data.data;
  }catch(error){
    throw error;
  }
}

export const getSubTasks = async(subTaskIds) =>{
  try{
    const token = localStorage.getItem('token');
    const requestBody = subTaskIds.map(id => id.toString()); 
    const response = await fetch(`${API_URL}tasks/subtasks`,{
      method : 'POST',
      headers:{
        Authorization : `Bearer ${token}`,
        "Content-Type" : 'application/json'
      },
      body : JSON.stringify(requestBody)
    });
    if(!response.ok){
      throw new Error(response.statusText);
    }
    if(!response.ok){
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data.data;
  }catch(error){
    throw error;
  }
}

export const getRoles = async() => {
  try{
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}roles/all`,{
      method : 'GET',
      headers : {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json"
      }
    });
    if(!response.ok){
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data.data;
  }catch(error){
    throw error;
  }
}

  
