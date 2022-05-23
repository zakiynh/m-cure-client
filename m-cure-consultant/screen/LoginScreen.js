import { React, useState } from "react";
import { View, StyleSheet, Dimensions, Image, Text, ScrollView, TextInput, Button, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn"
import { useDispatch } from "react-redux";
import { postLoginUser } from "../src/store/actions/userActions";
import axios from 'axios'
import COLORS from "../src/colors";

const logo = require("../assets/logo-wo-bg.png")
const windowWidth = Dimensions.get('window').width

export default function LoginScreen() {
    // const baseUrl = "https://m-cure-postgres.herokuapp.com"
    const navigation = useNavigation()
    const tailwind = useTailwind()
    const [email, onChangeEmail] = useState("")
    const [password, onChangePassword] = useState("")
    const dispatch = useDispatch()

    const data = {
        email,
        password
    }

    async function loginHandler() {

        try {
            let response = await dispatch(postLoginUser(data))

            console.log(response)
            if (response === 'success') {
                navigation.navigate('Home Screen')
            } else {
                throw response
            }
        } catch (err) {
            navigation.navigate('Login Screen')
            console.log(err)
        }
    }
    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                    <View style={tailwind("mx-auto my-5")}>
                        <Image source={logo} style={{ width: 200, height: 200 }} />
                    </View>
                    <View style={tailwind(`bg-[#b4e197] w-80 h-2/5 rounded-3xl mx-auto pb-8`)}>
                        <TextInput
                            style={tailwind(`w-3/4 h-12 mx-auto mt-7 px-4 rounded-2xl bg-[#f3f3f3] text-xl`)}
                            onChangeText={onChangeEmail}
                            value={email}
                            placeholder="Email"
                            keyboardType="email-address"
                        />
                        <TextInput
                            style={tailwind(`w-3/4 h-12 mx-auto my-4 px-4 rounded-2xl bg-[#f3f3f3] text-xl`)}
                            onChangeText={onChangePassword}
                            value={password}
                            placeholder="Password"
                            secureTextEntry={true}
                            textContentType="password"
                        />
                        <Pressable style={tailwind(`bg-[#e9efc0] h-12 w-3/4 mx-auto my-4 px-4 rounded-2xl`)}
                            onPress={loginHandler}>
                            <Text style={tailwind("text-xl text-center my-auto font-bold")}>Login</Text>
                        </Pressable>
                    </View>
                    <View style={tailwind("my-5 mx-auto")}>
                        <Text style={tailwind("text-xl text-center font-bold")}>Consultant Login</Text>
                        <Text style={tailwind(`text-xl text-center text-[#4e944f] underline`)}></Text>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})