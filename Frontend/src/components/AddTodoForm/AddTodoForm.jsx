import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { defaultTodo } from "../../utils/general.js";
import useAddTodo from "../../hooks/useAddTodo.js";
import axios from "axios";

// ===== API Configuration =====
const getApiBaseUrl = () => {
  // Check if running in Docker
  if (process.env.REACT_APP_DOCKER === 'true') {
    return 'http://todo-backend:5000';
  }
  
  // Check if in production
  if (process.env.NODE_ENV === 'production') {
    return 'https://fullstack-todolist-upnv.onrender.com';
  }
  
  // Development - use your backend port (NOT 3000, that's frontend)
  return 'http://localhost:5000';
};

const API_BASE_URL = getApiBaseUrl();

const AddTodoForm = ({ fetchTodos, page, limit }) => {
  // Fixed initial state structure
  let [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    activity: "",
    date: "",
    strStatus: "pending", // Default status
    completed: false // Add this for backend compatibility
  });

  const { addTodo, isAddingTodo } = useAddTodo(
    fetchTodos,
    page,
    limit,
    setNewTodo
  );

  let isValidateInputs =
    newTodo.title.length < 10 || newTodo.description.length < 15;

  // ===== FIXED handleSubmit function =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs first
    if (isValidateInputs) {
      console.log("Validation failed - inputs too short");
      return;
    }

    try {
      console.log("Submitting todo:", newTodo);
      
      // Option 1: Use your custom hook (RECOMMENDED)
      const resp1 = await addTodo({ ...newTodo });
      console.log("Todo added via hook:", resp1);
      
      // Option 2: Direct API call (choose ONE, not both)
      // Remove this if you want to use only the hook above
      // const resp2 = await axios.post(`${API_BASE_URL}/api/todos`, newTodo, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   timeout: 10000
      // });
      // console.log("Todo added via direct API:", resp2.data);
      
    } catch (ex) {
      console.error("Error adding todo:", ex);
      
      // Enhanced error logging
      if (ex.response) {
        console.error("Response error:", {
          status: ex.response.status,
          statusText: ex.response.statusText,
          data: ex.response.data,
          url: ex.config?.url
        });
      } else if (ex.request) {
        console.error("Network error:", ex.request);
      } else {
        console.error("Error:", ex.message);
      }
    }
  };

  // Enhanced input change handlers with validation
  const handleTitleChange = (e) => {
    const value = e.target.value;
    setNewTodo({ ...newTodo, title: value });
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setNewTodo({ ...newTodo, description: value });
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        alignItems: "flex-start",
        flexGrow: 1,
        height: "70px",
        gap: 4,
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="title"
        name="title"
        label="Todo Title"
        variant="outlined"
        value={newTodo.title}
        onChange={handleTitleChange}
        error={newTodo.title.length > 0 && newTodo.title.length < 10}
        helperText={
          newTodo.title.length > 0 && newTodo.title.length < 10
            ? "Title must be at least 10 characters"
            : ""
        }
        sx={{
          width: "30%",
        }}
        required
      />
      <TextField
        id="description"
        name="description"
        label="Todo Description"
        variant="outlined"
        value={newTodo.description}
        onChange={handleDescriptionChange}
        error={
          newTodo.description.length > 0 && newTodo.description.length < 15
        }
        helperText={
          newTodo.description.length > 0 && newTodo.description.length < 15
            ? "Description must be at least 15 characters"
            : ""
        }
        sx={{
          flexGrow: 1,
        }}
        required
      />
      <LoadingButton
        loading={isAddingTodo}
        variant="contained"
        size="large"
        type="submit"
        disabled={isValidateInputs || isAddingTodo}
        sx={{
          p: "14px",
          boxShadow:
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        }}
      >
        Add Todo
      </LoadingButton>
    </Box>
  );
};

export default AddTodoForm;