import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getDetailUser } from "../src/store/actions/userActions";
import COLORS from "../src/colors";

const baseUrl = "https://m-cure-postgres.herokuapp.com"


export default function CustomDrawer(props) {
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const { access_token, detailUser } = useSelector((state) => {
    return state.user
  })

  useEffect(() => {
    dispatch(getDetailUser(access_token))
  }, [isFocused])

  return (
    <>
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}
          contentContainerStyle={{ backgroundColor: "#B4E197" }}>
          <View>
            <Pressable onPress={() => {
              navigation.navigate("Profile");
            }} >
              <View style={styles.headerProfile}>
                <Image source={{ uri: detailUser.imageProfile ? detailUser.imageProfile : "https://www.hecmsenior.com/wp-content/uploads/2021/06/Profile-Pic-Icon.png" }} style={styles.imageProfile} />
                <View>
                  <Text style={styles.username}>{detailUser.username}</Text>
                  <View style={styles.emailContainer}>
                    <Image source={require("../assets/icons8-envelope-100.png")} style={{ width: 30, height: 30, marginHorizontal: 5 }} />
                    <Text style={{ paddingTop: 5, color: "gray" }}>{detailUser.email}</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          </View>
          <View>
            <View style={{ flex: 1, paddingTop: 10, backgroundColor: "#fff" }}>
              <DrawerItemList {...props} />
            </View>
          </View>
        </DrawerContentScrollView>
        <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
          <TouchableOpacity onPress={() => { navigation.navigate("Login Screen") }} style={{ paddingVertical: 15 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={require("../assets/icons8-logout-100.png")} style={{ width: 40, height: 40 }} />
              <Text style={{ fontSize: 16, letterSpacing: 0.25, marginHorizontal: 4, color: "#f43f3f" }}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  imageProfile: {
    height: 75,
    width: 75,
    borderRadius: 40,
    marginBottom: 10,
    padding: 20,
    resizeMode: "cover"
  },
  username: {
    fontSize: 18,
    marginVertical: 3,
    marginHorizontal: 10
  },
  headerProfile: {
    flexDirection: "row",
    padding: 20
  },
  emailContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center"
  }
})