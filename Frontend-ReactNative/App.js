import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Animated,
  TouchableHighlight,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import Task from "./components/Task";
import HiddenItemWithActions from "./components/HiddenItemWithActions";
import useTodoStore from "./store/todo";
import api from "./service";

export default function App() {
  const todos = useTodoStore(state => state.todo);
  const setTodo = useTodoStore(state => state.setTodo);
  const [task, setTask] = useState();

  React.useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    api
      .getTodoService()
      .then(response => {
        let tempData = [];
        response.data.map((item, index) => {
          tempData.push({
            key: index,
            id: item.id,
            body: item.body,
            createdAt: item.createdAt,
          });
        });
        setTodo(tempData);
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  const handleAddTodo = () => {
    api
      .addTodoService(task)
      .then(response => {
        getTodos();
        setTask("");
        Keyboard.dismiss();
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  const handleDeleteTodo = (id, rowMap, rowKey) => {
    api
      .deleteTodoService(id)
      .then(response => {
        getTodos();
        closeRow(rowMap, rowKey);
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  const visibleItem = (items, rowMap) => {
    const { item } = items;
    return (
      <TouchableHighlight>
        <Task text={item.body} />
      </TouchableHighlight>
    );
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(70);
    const rowHeightAnimatedValue = new Animated.Value(60);
    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => handleDeleteTodo(data.item.id, rowMap, data.item.key)}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>

        {/* Added this scroll view to enable scrolling when list gets longer than the page */}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="always"
        >
          <View style={styles.items}>
            <SwipeListView
              data={todos}
              renderItem={visibleItem}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={75}
              rightOpenValue={-175}
              disableRightSwipe
            />
          </View>
        </ScrollView>
      </View>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={task}
          onChangeText={text => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTodo()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
    paddingBottom: 120,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 100,
    zIndex: 2,
    backgroundColor: "white",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 50,
    backgroundColor: "#C0C0C0",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
});
