import axios from "axios";
import React, { useState, useEffect } from "react"
import { View, Dimensions, StyleSheet, Text, Image, Modal, Pressable } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';
import { useTailwind } from "tailwind-rn"
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";


const wallet = require("../assets/icons8-wallet-48.png")
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

if (Platform.OS === "android") {
  require("intl");
  require("intl/locale-data/jsonp/id-ID");
}

export default function TopNav() {
  const isFocused = useIsFocused()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { access_token } = useSelector((state) => {
    return state.user
  })

  const tailwind = useTailwind()
  const [totalMoney, setTotalMoney] = useState(0)

  useEffect(() => {
    // let isMounted = true
    // if (isMounted) {
    getTotalMoney()
    // }
  }, [isFocused])

  async function getTotalMoney() {
    const baseUrl = "https://m-cure-postgres.herokuapp.com"
    try {
      let response = await axios.get(`${baseUrl}/users/wallet`, {
        headers: {
          access_token
        }
      })

      let money = response.data.data.totalMoney
      setTotalMoney(money)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    // <SafeAreaView>
    <View style={styles.mainContainer} >
      <View style={styles.topNav}>
        <Pressable onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer())
        }} >
          <Icon name="menu" size={30} />
        </Pressable>
        <View style={{ flexDirection: "row" }}>
          <Image source={wallet} />
          <View style={{ flexDirection: "column" }} >
            <Text>Cash</Text>
            <Text
              style={tailwind("text-lg font-bold")}
            > {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(totalMoney)} </Text>
          </View>
        </View>
        <Icon name="notifications" size={25} />
      </View>
    </View >
    // </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    position: "relative",
    zIndex: 2
  },
  topNav: {
    backgroundColor: "#b4e197",
    width: windowWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center"
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