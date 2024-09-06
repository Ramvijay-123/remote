import axios from 'axios';

const API_BASE_URL = 'https://remote-3.onrender.com';

export const registerUser = async (userDetails) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/addNewUser`, userDetails);
        return response.data;
    } catch (error) {
        console.error('Username already exit', error);
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/generateToken`, credentials);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const createProject = async (project, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/projects/create`, project, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log(token);
        console.error('Error creating project:', error);
        throw error;
    }
};

export const getProjectsByManager = async (userId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/projects/manager/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

export const assignTask = async (task, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/tasks/assign`, task, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error assigning task:', error);
        throw error;
    }
};

export const getTasksByUser = async (userId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tasks/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

export const getTasksByProject = async (projectId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tasks/project/${projectId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};
export const searchUsers = async (name, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/searchUsers`, {
            params: { name },
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching users:', error);
        throw error;
    }
};

export const searchProjects = async (name, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/projects/search`, {
            params: { name },
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching projects:', error);
        throw error;
    }
};
export const getTaskCounts = async (token, userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tasks/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const tasks = response.data;
        const completeCount = tasks.filter(task => task.status === 'Complete').length;
        const incompleteCount = tasks.filter(task => task.status === 'Incomplete').length;
        const pending = tasks.filter(task => task.status === 'Pending').length;
        return {
            complete: completeCount,
            incomplete: incompleteCount,
            pending:pending
        };
    } catch (error) {
        console.error('Error fetching task counts:', error);
        throw error;
    }
};

export const getTaskOfOneYear = async (token, userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tasks/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const tasks = response.data;
        const currentDate = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        const taskCountsByMonth = Array.from({ length: 12 }, () => ({ total: 0, complete: 0 }));
        const dateArray = Array.from({ length: 31 }, () => "");
        tasks.forEach(task => {
            const dueDate = new Date(task.dueDate);
            if (dueDate >= oneYearAgo && dueDate <= currentDate) {
                const monthsAgo = (currentDate.getFullYear() - dueDate.getFullYear()) * 12 + (currentDate.getMonth() - dueDate.getMonth());
                const monthIndex = 11 - monthsAgo;
                if (monthIndex >= 0 && monthIndex < 12) {
                    taskCountsByMonth[monthIndex].total++;
                    if (task.status === 'Complete') {
                        taskCountsByMonth[monthIndex].complete++;
                    }
                }
            }
            if(dueDate.getMonth()===currentDate.getMonth())
            {
              dateArray[dueDate.getDate()-1]=task.status;
            }
        });
     return {
        taskCountsByMonth,dateArray
     }
    } catch (error) {
        console.error('Error fetching task counts:', error);
        throw error;
    }
};


export const getProjectCount = async (token, userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/projects/manager/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.length; 
    } catch (error) {
        console.error('Error fetching project count:', error);
        throw error;
    }
};

export const getUserDetails = async (token, userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};
export const getTasksByUserPageable = async (userId, token, page = 0, size = 6, sort = 'dueDate', direction = 'asc') => {
    const response = await fetch(`${API_BASE_URL}/tasks/user/${userId}/paged?pageno=${page}&pagesize=${size}&sort=${sort}&direction=${direction}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
};
export const getTasksByProjectPageable= async (projectId, token, page = 0, size = 6, sort = 'name', direction = 'asc') => {
    const response = await fetch(`${API_BASE_URL}/projects/manager/${projectId}/paged?pageno=${page}&pagesize=${size}&sort=${sort}&direction=${direction}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
};

export const deleteProject = (projectId, token) => {
    return axios.delete(`${API_BASE_URL}/delete/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const updateProject = (project, token) => {
    return axios.post(`${API_BASE_URL}/update`, project, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deleteTask = (taskId, token) => {
    return axios.delete(`${API_BASE_URL}/tasks/delete/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const updateTask = (task, token) => {
    return axios.post(`${API_BASE_URL}/tasks/update`, task, {
        headers: { Authorization: `Bearer ${token}` }
    });
};