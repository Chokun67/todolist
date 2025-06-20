// src/components/AddTodoForm.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

interface AddTodoFormProps {
  onAdd: (title: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState<string>('');

  const handlePress = () => {
    if (text.trim() === '') {
      Alert.alert('Error', 'Please enter a todo item.');
      return;
    }
    onAdd(text);
    setText('');
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder="Add a new todo"
      />
      <Button
        title="Add"
        onPress={handlePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 20, paddingHorizontal: 16 },
  input: { flex: 1, height: 40, borderWidth: 1, borderColor: '#cccccc', borderRadius: 8, paddingHorizontal: 10, marginRight: 10 },
});

export default AddTodoForm;