import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Avatar, Title, Caption } from "react-native-paper";
import COLORS from "../src/colors";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn";
import axios from "axios";
import TopNav from '../components/TopNav';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";


const image = { uri: "https://th.bing.com/th/id/OIP.uJg0Ku4GimXqktPdSC3YAgHaJT?pid=ImgDet&w=860&h=1081&rs=1" };

const baseUrl = "https://m-cure-postgres.herokuapp.com/"

export default function ConsultationHistory() {
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const tailwind = useTailwind();
  const [data, setData] = useState([])
  const { access_token } = useSelector((state) => {
    return state.user
  })

  useEffect(() => {
    axios(baseUrl + "users/histories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        access_token
      }
    })
      .then(res => {
        const data = res.data
        setData(data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [isFocused])

  return (
    <View style={{ flex: 1 }}>

      <TopNav />
      <SafeAreaView style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 70,
          }}
          data={data.data}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.consultant}>

                <TouchableOpacity onPress={() => {
                  navigation.navigate("Chat History", {
                    id: item.MongoConsultationId,
                    date: item.createdAt.slice(0, 10)
                  })
                }}>
                  <View style={{ flex: 1, width: "100%", marginBottom: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                      <Avatar.Image source={{ uri: data.details[index].imageProfile }} size={80} />

                      <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", marginLeft: 10 }}>

                        <View style={{ paddingHorizontal: 10, width: "100%" }}>

                          <View style={{ alignItems: "center", flexDirection: "row", justifyContent: 'space-between', flex: 1 }}>
                            <Title
                              style={[
                                styles.consultantName,
                                {
                                  marginTop: 15,
                                  marginBottom: 15,
                                },
                              ]}
                            >
                              {data.details[index].name}
                            </Title>
                            <View style={{ paddingHorizontal: 5, paddingVertical: 20 }}><Caption style={[styles.chat]}>{item.createdAt.slice(0, 10)}</Caption></View>
                          </View>
                        </View>

                      </View>

                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </SafeAreaView >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  consultant: {
    paddingHorizontal: 15,
    marginBottom: 15,
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.mainGreen,
  },
  consultantName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    marginTop: 5,
    lineHeight: 30,
  },
  chat: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "500",
  },
});
