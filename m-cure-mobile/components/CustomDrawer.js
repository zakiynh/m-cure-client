import React from "react";
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import axios from "axios";
import { useSelector } from "react-redux";

export default function CustomDrawer(props) {

  const { detailUser } = useSelector((state) => {
    return state.user
  })

  return (
    <>
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}
          contentContainerStyle={{ backgroundColor: "#B4E197" }}>
          <View>
            <Pressable >
              <View style={styles.headerProfile}>

                <Image source={{ uri: detailUser.imageProfile ? detailUser.imageProfile : "https://www.hecmsenior.com/wp-content/uploads/2021/06/Profile-Pic-Icon.png" }} style={styles.imageProfile} />
                <View>
                  <Text style={styles.username}>{detailUser.username}</Text>
                  <View style={styles.ticketContainer}>
                    <Image source={require("../assets/icons8-ticket-confirmed-48.png")} style={{ width: 25, height: 25, marginHorizontal: 10 }} />
                    <Text>Chat Ticket: 3</Text>
                  </View>
                  <View style={styles.ticketContainer}>
                    <Image source={require("../assets/icons8-ticket-confirmed-48.png")} style={{ width: 25, height: 25, marginHorizontal: 10 }} />
                    <Text>Video Ticket: 103</Text>
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
          <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
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
    color: "#6a6a6a",
    marginVertical: 3,
    marginHorizontal: 10
  },
  headerProfile: {
    flexDirection: "row",
    padding: 20,
  },
  ticketContainer: {
    flexDirection: "row",
    // alignContent: "center",
    // justifyContent: "center"
  }
})