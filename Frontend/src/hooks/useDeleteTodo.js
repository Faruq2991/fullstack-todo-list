import { useState } from "react";
import { CustomErrorAlert } from "../utils/general.js";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const useDeleteTodo = (fetchTodos, page, limit) => {
  const [isLoading, setIsLoading] = useState(false);
  let status = false;

  const deleteTodo = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/api/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      status = response.ok;
      await fetchTodos(page, limit);
    } catch (error) {
      CustomErrorAlert(error);
    } finally {
      setIsLoading(false);
    }
    return status;
  };

  return { deleteTodo, isDeletingTodo: isLoading };
};

export default useDeleteTodo;
