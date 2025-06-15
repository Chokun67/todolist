import { Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'


const index = () => {
  const [data, setData] = useState(['Job1']);
  const [text, onChangeText] = useState('Useless Text');
  const handleAdd = (input: any) => {
    const a = [...data , text]
    setData(a)
  };
  const handleDelete = () => { };

  type ItemProps = { title: string };


  const Item = ({ title }: ItemProps) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.insideitem}>
        <Button
          title="Edit"
        />
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.title}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <Button
        color="#f194ff"
        title="Add item"
        onPress={() => handleAdd('d')}
      />
      <FlatList
        data={data}
        renderItem={({ item, index }) => <Item title={item} />}
      />
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 16
  },
  item: {
    flexDirection: 'row',
    backgroundColor: 'orange',
    marginTop: 12,
    padding: 6,
    justifyContent: 'space-between'
  }, title: {

  },
  insideitem: {
    flexDirection: 'row',
  }
  , input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
})
