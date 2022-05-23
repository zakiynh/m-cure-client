import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TextInput, Pressable } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import COLORS from "../src/colors";
import axios from "axios";
import { useDispatch } from "react-redux";
import { postRegisterUser } from "../src/store/actions/userActions";
import Icon from 'react-native-vector-icons/Ionicons';

const logo = require("../assets/logo-wo-bg.png");
const baseUrl = "https://m-cure-postgres.herokuapp.com/"

export default function Register() {
  const tailwind = useTailwind();
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [name, onChangeName] = useState("")
  const [username, onChangeUsername] = useState("")
  const [email, onChangeEmail] = useState("")
  const [password, onChangePassword] = useState("")
  const [imageProfile, onChangeImageProfile] = useState("")

  const data = {
    name,
    username,
    email,
    password,
    imageProfile
  }

  async function doRegister() {
    try {
      let response = await dispatch(postRegisterUser(data))

      if (response === "success") {
        console.log("berhasil register user")
        // swal berhasil register user
        navigation.navigate('Login Screen')
      } else {
        throw response
      }
    } catch (err) {
      // swal error dalam array
      console.log(err)
    }
  }
  return (
    <>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={[tailwind("mx-auto my-5"), styles.logo]}>
            <Image source={logo} style={{ width: 200, height: 200 }} />
          </View>
          {/* <View style={{ flex: 1 }}> */}
          <View style={tailwind(`bg-[#b4e197] w-80 rounded-3xl mx-auto pb-8`)}>
            {/* <View style={[tailwind("mx-auto items-center"), styles.card]}> */}
            <TextInput
              style={tailwind("w-3/4 h-12 mx-auto mt-7 px-4 rounded-2xl bg-[#f3f3f3] text-xl")}
              underlineColorAndroid="transparent"
              placeholder="Name"
              placeholderTextColor={COLORS.textGray}
              autoCapitalize="none"
              onChangeText={onChangeName}
              value={name}
            />
            <TextInput
              style={tailwind("w-3/4 h-12 mx-auto mt-7 px-4 rounded-2xl bg-[#f3f3f3] text-xl")}
              underlineColorAndroid="transparent"
              placeholder="Username"
              placeholderTextColor={COLORS.textGray}
              autoCapitalize="none"
              onChangeText={onChangeUsername}
              value={username}
            />
            <TextInput
              style={tailwind("w-3/4 h-12 mx-auto mt-7 px-4 rounded-2xl bg-[#f3f3f3] text-xl")}
              underlineColorAndroid="transparent"
              placeholder="Email"
              placeholderTextColor={COLORS.textGray}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={onChangeEmail}
              value={email}
            />
            <TextInput
              style={tailwind("w-3/4 h-12 mx-auto mt-7 px-4 rounded-2xl bg-[#f3f3f3] text-xl")}
              underlineColorAndroid="transparent"
              placeholder="Password"
              placeholderTextColor={COLORS.textGray}
              autoCapitalize="none"
              onChangeText={onChangePassword}
              textContentType="password"
              value={password}
              secureTextEntry={true}
            />
            <TextInput
              style={tailwind("w-3/4 h-12 mx-auto mt-7 px-4 rounded-2xl bg-[#f3f3f3] text-xl")}
              underlineColorAndroid="transparent"
              placeholder="Image Url"
              placeholderTextColor={COLORS.textGray}
              autoCapitalize="none"
              onChangeText={onChangeImageProfile}
              value={imageProfile}
              secureTextEntry={true}
            />
            <Pressable style={tailwind(`bg-[#e9efc0] h-12 w-3/4 mx-auto mt-7 px-4 rounded-2xl`)}
              onPress={doRegister}
            >
              <Text style={tailwind("text-xl text-center my-auto font-bold")}>Register</Text>
            </Pressable>
            <Pressable style={tailwind(`bg-[#fe4545] h-12 w-3/4 mx-auto mt-7 px-4 rounded-2xl`)}
              onPress={() => {
                navigation.navigate('Login Screen')
              }}
            >
              <Text style={tailwind("text-xl text-center my-auto font-bold")} color="black">
                <Icon name="arrow-back-circle" size={22} />
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginTop: "10%"
  },
  card: {
    width: "70%",
    height: "100%",
    borderRadius: 40,
    padding: 40,
    backgroundColor: COLORS.mainGreen,
  },
  input: {
    margin: 15,
    padding: 10,
    height: 40,
    width: "100%",
    borderRadius: 40,
    backgroundColor: COLORS.white,
  },
  submitButton: {
    backgroundColor: COLORS.buttonGreen,
    margin: 15,
    height: 40,
    width: "50%",
    borderRadius: 40,
  },
  submitButtonG: {
    backgroundColor: COLORS.buttonBlue,
    margin: 15,
    height: 40,
    width: "50%",
    borderRadius: 40,
  },
  cancel: {
    backgroundColor: COLORS.buttonRed,
    margin: 15,
    height: 40,
    width: "50%",
    borderRadius: 40,
    fontWeight: "bold",
  },
});
