import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { io } from "socket.io-client";
import COLORS from "../src/colors";
import axios from 'axios'
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const socket = io.connect("https://m-cure-postgres.herokuapp.com");

export default function Chat() {
  const navigation = useNavigation()
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [count, setCount] = useState(true);
  const [chat, setChat] = useState([]);
  const [nameDone, setNameDone] = useState("");
  const [idChat, setIdChat] = useState("");

  const { currentHistory, access_token } = useSelector((state) => {
    return state.user
  })

  const sendMessage = () => {
    setCount(count ? false : true);
    // setChat([...chat, { name, message }]);
    socket.emit("send_message", { name, message });
    setMessage("");
  };

  useEffect(() => {
    console.log(chat.length);
    socket.on("receive_message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  }, [chat.length]);

  const onChangeText = (msg) => {
    setMessage(msg);
  };

  const onChangeName = (msg) => {
    setName(msg);
  };

  const onChangeNameFix = async (msg) => {
    try {
      setNameDone(msg);
      // let response = await axios.post("https://m-cure-mongo.herokuapp.com/consultation", {})

      // setIdChat(response.data.data.insertedId)

    } catch (error) {
      console.log(error);
    }
  };

  const endChat = async () => {
    try {
      let response = await axios.put(`https://m-cure-mongo.herokuapp.com/consultation/${currentHistory.MongoConsultationId}`, chat)

      let patchedStatus = await axios.patch(`https://m-cure-postgres.herokuapp.com/history-status/${currentHistory.id}`, {}, {
        headers: {
          access_token
        }
      })
      Alert.alert("Success", "You ended this chat. Your chat is successfully saved")
      navigation.navigate('App', { screen: 'Consultant List' })
    } catch (error) {
      Alert.alert("Error", "Try again")
    }
  };


  if (nameDone === "") {
    return (
      <>
        <View style={{ width: "100%", marginTop: 175 }}>
          <View>
            <Text style={{ alignSelf: "center" }}>
              Input your name :
            </Text>
          </View>

          <View style={{ alignSelf: "center" }}>
            <TextInput
              style={{
                backgroundColor: COLORS.mainGreen,
                width: 300,
                padding: 10,
                paddingLeft: 30,
                color: "dimgrey",
                margin: 20,
                borderRadius: 10
              }}
              onChangeText={(text) => onChangeName(text)}
              value={name}
            />
          </View>

          <View style={{ width: "30%", alignSelf: "center" }}>
            <TouchableOpacity onPress={() => onChangeNameFix(name)}>
              <View
                style={{ backgroundColor: "mintcream", padding: 10, borderRadius: 5 }}
              >
                <Text style={{ color: COLORS.textGreen, textAlign: "center" }}>
                  submit
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          position: "absolute",
          top: 0,
          borderBottomColor: "grey",
          backgroundColor: "white"
        }}>
        <View style={{ flex: 9, backgroundColor: "white", marginVertical: 8 }}>
          <Text style={{ fontSize: 24, marginTop: 5, color: COLORS.textGreen, marginLeft: 20 }}> Consultant </Text>
        </View>
        <View style={{ flex: 2, marginRight: 20, width: 10, marginVertical: 8 }}>
          <TouchableOpacity onPress={() => endChat()}>
            <View
              style={{
                backgroundColor: "#F62817",
                marginTop: 4,
                paddingVertical: 6,
                paddingHorizontal: 2,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>end chat</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ margin: 10, width: "100%", marginTop: 65, marginBottom: 50 }}>
        {chat.map(({ name, message }, index) => (
          <View key={index}>
            <Text style={name === nameDone ? styles.myName : styles.yourName}>
              {name}
            </Text>
            <Text
              style={name === nameDone ? styles.myBubble : styles.otherBubble}
            >
              {message}
            </Text>
            <Text></Text>
          </View>
        ))}
      </ScrollView>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          margin: 10,
        }}
      >
        <View style={{ flex: 13, marginRight: 10 }}>
          <TextInput
            style={{
              backgroundColor: "white",
              paddingLeft: 20,
              maxHeight: 90,
              color: "black",
              borderRadius: 10,
              padding: 7,
              width: 280,
              marginLeft: 10,
              marginBottom: 5,
            }}
            onChangeText={(text) => onChangeText(text)}
            value={message}
            placeholder="Type your message..."
          ></TextInput>
        </View>
        <View style={{ marginRight: 20, flex: 3 }}>
          <TouchableOpacity onPress={() => sendMessage()}>
            <View
              style={{
                backgroundColor: COLORS.textGreen,
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>send</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: 10,
    marginBottom: 5,
    width: "100%",
    // backgroundColor: "#fff",
    alignItems: "flex-start",
  },
  containerInput: {
    backgroundColor: COLORS.mainGreen,
    width: "full",
    marginRight: 0,
  },
  myName: {
    marginHorizontal: 36,
    color: "grey",
    alignSelf: "flex-end",
  },
  yourName: {
    color: "grey",
  },
  myBubble: {
    marginHorizontal: 30,
    alignSelf: "flex-end",
    backgroundColor: "lightgreen",
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 10,
  },
  otherBubble: {
    // marginHorizontal: 30,
    alignSelf: "flex-start",
    backgroundColor: "lightgrey",
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 10,
    maxWidth: 350
  },
});

// import { View, Text, StyleSheet } from 'react-native';
// import { AntDesign } from '@expo/vector-icons';

// export default function Chat() {
//     return (
//     <View style={{ flex: 1 }}>
//         <Text>Chat</Text>
//     </View>
//     )
// }

// const styles = StyleSheet.create({

// })
