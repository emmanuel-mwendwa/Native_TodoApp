import React, {useState} from 'react';
import { Alert, FlatList, StyleSheet, TouchableWithoutFeedback, View, Keyboard } from 'react-native';

import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';

export default function App() {

  const [todos, setTodos] = useState([
    {text: 'buy coffee', key: '1'},
    {text: 'create an app', key: '2'},
    {text: 'play on the switch', key: '3'},
  ]);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
        return prevTodos.filter(todo => todo.key != key)
    })
  };

  const submitHandler = (text) => {

    if (text.length > 3) {
      
      setTodos((prevTodos) => {
        return [
          {text: text, key: Math.random().toString() },
          ...prevTodos
        ]
      })

    }

    else {
      Alert.alert("Oops!", "Todos must be over 3 chars long", [
        {text: "Understood", onPress: () => console.log("Alert closed.")}
      ])
    }

  };

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
      {/* Header */}
      <Header />
      <View style={styles.content}>
        {/* To do form */}
        <AddTodo submitHandler={submitHandler}/>
        <View style={styles.list}>

          <FlatList 
            data={todos}
            renderItem={({item}) => (
              <TodoItem item={item} pressHandler={pressHandler} />
            )}
          />

        </View>
      </View>
      </View>
    </TouchableWithoutFeedback>
  );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  content: {
    padding: 40,
    flex: 1,
  },
  list: {
    marginTop: 20,
    flex: 1,
  }
});
