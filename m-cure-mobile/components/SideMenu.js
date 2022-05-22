import axios from "axios";
import React, { useState, useEffect } from "react"
import { View, Dimensions, StyleSheet, Text, Image, Modal, Pressable } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';
import { useTailwind } from "tailwind-rn"
const wallet = require("../assets/icons8-wallet-48.png")



const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
export default function SideMenu() {
  const tailwind = useTailwind()
  const baseUrl = "https://m-cure-origin.herokuapp.com"

  const [totalMoney, setTotalMoney] = useState("")
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    getTotalMoney()
  }, [])

  async function getTotalMoney() {
    try {
      let response = await axios.get(`${baseUrl}/users/wallet`, {
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbmRyZXdqYW5lYW5hbnRvQG1haWwuY29tIiwiaWF0IjoxNjUzMTMxNDYwLCJleHAiOjE2NTMxMzg2NjB9.b-tPJyKJ12bRngLWIskLJEf5Bzly4DJlM1mpTHc6Fjk'
        }
      })

      let money = response.data.data.totalMoney
      setTotalMoney(money)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <View style={styles.mainContainer} >
      <View style={styles.topNav}>
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
          <Icon name="menu" size={30} />
        </Pressable>
        <View style={{ flexDirection: "row" }}>
          <Image source={wallet} />
          <View style={{ flexDirection: "column" }} >
            <Text>Cash</Text>
            <Text style={tailwind("text-lg font-bold")}>Rp {totalMoney} </Text>
          </View>
        </View>
        <Icon name="notifications" size={25} />
      </View>
      <View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  topNav: {
    backgroundColor: "#b4e197",
    width: windowWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  // modal Container
  modalMainContainer: {
    flex: 1,
    width: windowWidth,
    backgroundColor: "white",
    opacity: 0.5,
  },
  modalContainer: {
    backgroundColor: "gray",
    width: "75%",
    height: "100%"
  }
})