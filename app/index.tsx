import { Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Modal } from 'react-native'
import React, { useState } from 'react'

type TodoItem = {
  id: number;
  title: string;
};

const Index = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, title: 'Job1' }
  ]);
  const [text, setText] = useState('');
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<TodoItem | null>(null);
  const [editingText, setEditingText] = useState('');


  const handleAddTodo = () => {
    if (text.trim() === '') {
      Alert.alert('Error', 'Please enter a todo item.');
      return;
    }
    const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    const newTodo: TodoItem = { id: newId, title: text };
    setTodos([...todos, newTodo]);
    setText('');
  };

  const handleDeleteTodo = (id: number) => {
    Alert.alert(
      "Confirm Delete", "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "OK", 
          onPress: () => setTodos(todos.filter(todo => todo.id !== id))
        }
      ]
    );
  };

  const handleEditPress = (todo: TodoItem) => {
    setCurrentTodo(todo);
    setEditingText(todo.title);
    setIsModalVisible(true);
  };

  const handleSaveChanges = () => {
    if (!currentTodo) return;

    const updatedTodos = todos.map(todo =>
      todo.id === currentTodo.id ? { ...todo, title: editingText } : todo
    );
    setTodos(updatedTodos);
    setIsModalVisible(false);
    setCurrentTodo(null);
  };
  
  const Item = ({ item }: { item: TodoItem }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => handleEditPress(item)}>
            <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDeleteTodo(item.id)}>
            <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            onChangeText={setText}
            value={text}
            placeholder="Add a new todo"
        />
        <Button
            title="Add"
            onPress={handleAddTodo}
        />
      </View>
      
      <FlatList
        data={todos}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.id.toString()}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
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
              <Button title="Cancel" onPress={() => setIsModalVisible(false)} color="#F44336" />
              <Button title="Save" onPress={handleSaveChanges} />
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingEnd:16,
    paddingStart:16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    marginTop: 12,
    marginHorizontal: 12,
    padding: 15,
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eeeeee',
  },
  title: {
    fontSize: 16,
    flex: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: '#FFC107',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
})