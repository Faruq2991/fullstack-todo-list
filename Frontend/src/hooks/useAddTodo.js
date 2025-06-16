// ===== hooks/useAddTodo.js =====
import { useState } from 'react';
import axios from 'axios';

// API Configuration
const getApiBaseUrl = () => {
  return import.meta.env.VITE_API_URL || 'http://localhost:5000';
};

const API_BASE_URL = getApiBaseUrl();

const useAddTodo = (fetchTodos, page, limit, setNewTodo) => {
  const [isAddingTodo, setIsAddingTodo] = useState(false);

  const addTodo = async (todoData) => {
    setIsAddingTodo(true);
    
    try {
      console.log('Adding todo to:', `${API_BASE_URL}/api/todos`);
      console.log('Todo data:', todoData);
      
      const response = await axios.post(`${API_BASE_URL}/api/todos`, todoData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });
      
      console.log('Todo added successfully:', response.data);
      
      // Reset form
      setNewTodo({
        title: "",
        description: "",
        activity: "",
        date: "",
        strStatus: "pending",
        completed: false
      });
      
      // Refresh todos list
      if (fetchTodos) {
        await fetchTodos(page, limit);
      }
      
      return response.data;
      
    } catch (error) {
      console.error('Error adding todo:', error);
      
      if (error.response) {
        console.error('Server responded with error:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          url: error.config?.url
        });
        
        if (error.response.status === 404) {
          throw new Error('API endpoint not found - check backend route');
        } else if (error.response.status === 500) {
          throw new Error('Server error - check backend logs');
        }
      } else if (error.request) {
        console.error('Network error - no response received:', error.request);
        throw new Error('Network error - cannot reach server');
      } else {
        console.error('Request setup error:', error.message);
        throw new Error(`Request error: ${error.message}`);
      }
      
      throw error;
    } finally {
      setIsAddingTodo(false);
    }
  };

  return {
    addTodo,
    isAddingTodo
  };
};

export default useAddTodo;