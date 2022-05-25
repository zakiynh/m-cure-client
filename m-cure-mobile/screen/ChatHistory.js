import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import COLORS from "../src/colors";
import axios from 'axios'
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function ChatHistory({ route }) {
  const [chat, setChat] = useState([]);

  const MongoConsultationId = route.params.id
  const dateHistory = route.params.date

  const { access_token } = useSelector((state) => {
    return state.user
  })

  async function getMessage() {
    try {

      let response = await axios.get(`https://m-cure-mongo.herokuapp.com/consultation/${MongoConsultationId}`)

      setChat(response.data.messages)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMessage()
  }, []);


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
          <Text style={{ fontSize: 24, marginTop: 5, color: COLORS.textGreen, marginLeft: 20 }}> Date: {dateHistory} </Text>
        </View>
      </View>

      <ScrollView style={{ margin: 10, width: "100%", marginTop: 65, marginBottom: 50 }}>
        {chat.map(({ name, message }, index) => (
          <View key={index}>
            <Text style={styles.yourName}>
              {name}
            </Text>
            <Text
              style={styles.otherBubble}
            >
              {message}
            </Text>
            <Text></Text>
          </View>
        ))}
      </ScrollView>
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
