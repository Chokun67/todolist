// src/components/EditTodoModal.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, Alert } from 'react-native';
import { TodoItemType } from '../types/todo_type';

interface EditTodoModalProps {
  visible: boolean;
  todo: TodoItemType | null;
  onClose: () => void;
  onSave: (newTitle: string) => void;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({ visible, todo, onClose, onSave }) => {
  const [editingText, setEditingText] = useState<string>('');

  useEffect(() => {
    if (todo) {
      setEditingText(todo.title);
    }
  }, [todo]);

  const handleSave = () => {
    if (editingText.trim() === '') {
      Alert.alert('Error', 'Item title cannot be empty.');
      return;
    }
    onSave(editingText);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Edit Item</Text>
          <TextInput
            style={styles.modalInput}
            onChangeText={setEditingText}
            value={editingText}
          />
          <View style={styles.modalButtonGroup}>
            <Button title="Cancel" onPress={onClose} color="#F44336" />
            <Button title="Save" onPress={handleSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalView: { width: '80%', backgroundColor: 'white', borderRadius: 20, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  modalInput: { width: '100%', height: 40, borderWidth: 1, borderColor: '#cccccc', borderRadius: 8, paddingHorizontal: 10, marginBottom: 20 },
  modalButtonGroup: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
});

export default EditTodoModal;