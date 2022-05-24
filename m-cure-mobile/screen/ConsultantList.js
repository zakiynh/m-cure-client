import { useEffect, useState } from 'react'
import { ActivityIndicator, View, Text, StyleSheet, SafeAreaView, FlatList, Pressable } from "react-native";
import { Avatar, Title } from "react-native-paper";
import COLORS from "../src/colors";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import TopNav from '../components/TopNav';
import * as Linking from "expo-linking"
import { useIsFocused } from "@react-navigation/native"
import { chatHistory } from '../src/store/actions/userActions';

const image = { uri: "https://th.bing.com/th/id/OIP.uJg0Ku4GimXqktPdSC3YAgHaJT?pid=ImgDet&w=860&h=1081&rs=1" };

const baseUrl = "https://m-cure-postgres.herokuapp.com/"

export default function ConsultantList({ navigation }) {
  const isFocused = useIsFocused()
  const dispatch = useDispatch()

  const { access_token, currentHistory, detailUser } = useSelector((state) => {
    return state.user
  })

  const [data, setData] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      axios(baseUrl + "users/consultant-list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token
        }
      })
        .then(res => {
          const data = res.data
          console.log(data, "=========")
          setData(data)
        })
        .catch(err => {
          console.log(err)
        })
    }, 3000);
    return () => clearInterval(interval);

  }, [isFocused])


  async function videoCallHandler(idConsultant, videoCode) {
    try {

      if (detailUser.Wallet.ticketVideo === 0) {
        // swal Please buy ticket
        navigation.navigate('App', { screen: 'Buy Consultation Ticket' })
      } else {
        let response = await dispatch(chatHistory(idConsultant, access_token, "video"))

        if (response === "success") {
          Linking.openURL(`https://vidcall-test.web.app/${videoCode}/${currentHistory.id}`)
        }
      }


    } catch (error) {
      console.log(error)
    }

  }

  async function chatHistoryHandler(id) {
    try {
      let response = await dispatch(chatHistory(id, access_token, "chat"))

      if (response === "success") {
        navigation.navigate("Chat")
      }
    } catch (error) {
      console.log(error, "EROORRR")
    }
  }

  if (!data.length) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={"large"} color={"#B4E197"} />
      </View>
    )
  }
  return (
    <>
      <View style={{ flex: 1 }}>
        <TopNav />
        <SafeAreaView style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: 10,
              paddingBottom: 70,
            }}
            data={data}
            renderItem={({ item }) => {
              return (
                <View style={styles.consultant}>
                  <View style={{ flexDirection: "row", marginTop: 15 }}>
                    <Avatar.Image source={{ uri: item.imageProfile }} size={80} />
                    <View style={{ marginLeft: 20 }}>
                      <Title
                        style={[
                          styles.consultantName,
                          {
                            marginTop: 12,
                          },
                        ]}
                      >
                        {item.name}
                      </Title>
                      <View style={{ flexDirection: "row" }}>
                        <Entypo onPress={() => {
                          chatHistoryHandler(item.id)
                        }}
                          style={styles.logo} name="chat" size={30} color={COLORS.mainGreen} />

                        {item.status ? (<FontAwesome
                          onPress={() => {
                            videoCallHandler(item.id, item.VideoCode)
                          }} style={[styles.logo, { marginLeft: 40 }]} name="video-camera" size={30} color={COLORS.mainGreen} />) : <FontAwesome
                          style={[styles.logo, { marginLeft: 40 }]} name="video-camera" size={30} color={"#cfd7cc"} />}

                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center"
  },
  container: {
    flex: 1,
  },
  consultant: {
    paddingHorizontal: 30,
    marginBottom: 25,
    flex: 1,
  },
  consultantName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logo: {
    marginTop: 5,
    lineHeight: 30,
  },
});
