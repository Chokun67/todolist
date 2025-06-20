// src/components/TodoItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TodoItemType } from '../types/todo_type';

interface TodoItemProps {
  item: TodoItemType;
  onEdit: (item: TodoItemType) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, onEdit, onDelete }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => onEdit(item)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => onDelete(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: { flexDirection: 'row', backgroundColor: '#f9f9f9', marginTop: 12, marginHorizontal: 12, padding: 15, borderRadius: 8, justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#eeeeee' },
  title: { fontSize: 16, flex: 1 },
  buttonGroup: { flexDirection: 'row' },
  button: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 5, marginLeft: 10 },
  editButton: { backgroundColor: '#FFC107' },
  deleteButton: { backgroundColor: '#F44336' },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

export default TodoItem;