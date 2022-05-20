import { useState } from "react";
import { View, StyleSheet, Dimensions, Image, Text, ScrollView, TextInput, Button, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn"
import axios from 'axios'
import COLORS from "../src/colors";

const logo = require("../assets/logo-wo-bg.png")
const windowWidth = Dimensions.get('window').width

export default function LoginScreen() {
    const baseUrl = "https://m-cure-server.herokuapp.com"
    const navigation = useNavigation()
    const tailwind = useTailwind()
    const [email, onChangeEmail] = useState("")
    const [password, onChangePassword] = useState("")

    const data = {
        email,
        password
    }

    async function loginHandler() {

        try {
            console.log(data)
            let response = await axios.post(`${baseUrl}/users/login`, data
            )
            // set access_token
            console.log(response.data)
            console.log("login pressed")
            // navigation.navigate('Home Screen')
        } catch (err) {

            navigation.navigate('Login Screen')
            console.log(err)
        }
    }
    return (
        <>
            {/* <ScrollView> */}
            <View style={styles.container}>
                <View style={tailwind("mx-auto my-5")}>
                    <Image source={logo} style={{ width: 200, height: 200 }} />
                </View>
                <View style={tailwind(`bg-[${COLORS.mainGreen}] w-80 h-2/5 rounded-3xl mx-auto`)}>
                    <TextInput
                        style={tailwind(`w-3/4 h-12 mx-auto mt-7 px-4 rounded-2xl bg-[${COLORS.fillColor}] text-xl`)}
                        onChangeText={onChangeEmail}
                        value={email}
                        placeholder="Email"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={tailwind(`w-3/4 h-12 mx-auto my-4 px-4 rounded-2xl bg-[${COLORS.fillColor}] text-xl`)}
                        onChangeText={onChangePassword}
                        value={password}
                        placeholder="Password"
                        secureTextEntry={true}
                        textContentType="password"
                    />
                    <Pressable style={tailwind(`bg-[${COLORS.buttonGreen}] h-12 w-3/4 mx-auto my-4 px-4 rounded-2xl`)}
                        onPress={loginHandler}>
                        <Text style={tailwind("text-xl text-center my-auto font-bold")}>Login</Text>
                    </Pressable>
                </View>
                <View style={tailwind("my-5 mx-auto")}>
                    <Text style={tailwind("text-xl text-center")}>Don't have an account?</Text>
                    <Text style={tailwind(`text-xl text-center text-[${COLORS.textGreen}] underline`)}
                        onPress={() => {
                            navigation.navigate('Register')
                        }}>Register Now</Text>
                </View>
            </View>
            {/* </ScrollView> */}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})