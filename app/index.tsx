// src/screens/index.tsx

import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Alert, ListRenderItem } from 'react-native';

import TodoItem from '../components/TodoItem';
import AddTodoForm from '../components/AddTodoForm';
import EditTodoModal from '../components/EditTodoModal';
import { loadTodosFromStorage, saveTodosToStorage } from '../utils/storage';
import { DEFAULT_TODOS } from '../utils/defaults_data';
import { TodoItemType } from '../types/todo_type';

const TodoListScreen: React.FC = () => {
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<TodoItemType | null>(null);

  useEffect(() => {
    const initializeTodos = async () => {
      const storedTodos = await loadTodosFromStorage();
      if (storedTodos) {
        setTodos(storedTodos);
      } else {
        setTodos(DEFAULT_TODOS);
      }
    };
    
    initializeTodos();
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      saveTodosToStorage(todos);
    }
  }, [todos]);

  const handleAddTodo = (title: string): void => {
    const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    const newTodo: TodoItemType = { id: newId, title: title };
    setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = (id: number): void => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: () => {
            const newTodos = todos.filter(todo => todo.id !== id);
            setTodos(newTodos);
            if (newTodos.length === 0) {
              saveTodosToStorage([]);
            }
          },
        },
      ]
    );
  };

  const handleEditPress = (todo: TodoItemType): void => {
    setCurrentTodo(todo);
    setIsModalVisible(true);
  };

  const handleSaveChanges = (newTitle: string): void => {
    if (!currentTodo) return;
    const updatedTodos = todos.map(todo =>
      todo.id === currentTodo.id ? { ...todo, title: newTitle } : todo
    );
    setTodos(updatedTodos);
    setIsModalVisible(false);
    setCurrentTodo(null);
  };

  const renderTodoItem: ListRenderItem<TodoItemType> = ({ item }) => (
    <TodoItem
      item={item}
      onEdit={handleEditPress}
      onDelete={handleDeleteTodo}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <AddTodoForm onAdd={handleAddTodo} />

      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={item => item.id.toString()}
      />

      {currentTodo && (
        <EditTodoModal
          visible={isModalVisible}
          todo={currentTodo}
          onClose={() => setIsModalVisible(false)}
          onSave={handleSaveChanges}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default TodoListScreen;