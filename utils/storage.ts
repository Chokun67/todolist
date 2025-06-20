// src/utils/storage.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodoItemType } from '../types/todo_type';

const TODOS_STORAGE_KEY = 'todos_list_async_v1';

export const loadTodosFromStorage = async (): Promise<TodoItemType[] | null> => {
  try {
    const storedTodos = await AsyncStorage.getItem(TODOS_STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : null;
  } catch (e) {
    console.error("Failed to load todos from AsyncStorage.", e);
    return null;
  }
};

export const saveTodosToStorage = async (todos: TodoItemType[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(todos);
    await AsyncStorage.setItem(TODOS_STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error("Failed to save todos to AsyncStorage.", e);
  }
};