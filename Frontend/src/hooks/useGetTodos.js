import { useState } from "react";
import { CustomErrorAlert } from "../utils/general.js";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const useGetTodos = (setTodos, setNumOfPages, setPage) => {
  const [isLoading, setIsLoading] = useState(true);

  const fetchTodos = async (page, limit) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/todos?page=${page}&limit=${limit}`
      );
      const data = await response.json();
      setTodos(data.todos);
      setNumOfPages(data.numOfPages);
      if (page > data.numOfPages) setPage(data.numOfPages);
    } catch (error) {
      CustomErrorAlert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchTodos, isFetchingTodos: isLoading };
};

export default useGetTodos;
