import { React, useState } from "react";
import { View, StyleSheet, Dimensions, Image, Text, ScrollView, TextInput, Button, Pressable } from "react-native";
import { useTailwind } from "tailwind-rn"
import { useDispatch } from "react-redux";
import axios from 'axios'
import COLORS from "../src/colors";
import { postLoginUser } from "../src/store/actions/userActions";
import { useNavigation } from "@react-navigation/native";

const logo = require("../assets/logo-wo-bg.png")
const windowWidth = Dimensions.get('window').width

export default function LoginScreen() {
    const tailwind = useTailwind()
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [email, onChangeEmail] = useState("")
    const [password, onChangePassword] = useState("")

    const data = {
        email,
        password
    }

    async function loginHandler() {
        try {
            let response = await dispatch(postLoginUser(data))

            if (response === 'success') {
                console.log("berhasil login")
                // swal berhasil login
                navigation.navigate('Report')
                // navigation.navigate('Consultant List')
            } else {
                throw response
            }
        } catch (err) {
            // swal Invalid email or password
            console.log("Invalid email and password")
            navigation.navigate('Login Screen')
        }
    }
    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                    <View style={[tailwind("mx-auto my-5"), styles.logo]}>
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
                        <Text style={tailwind("text-xl text-center")}>Don't have an account?</Text>
                        <Text style={tailwind(`text-xl text-center text-[#4e944f] underline`)}
                            onPress={() => {
                                navigation.navigate('Register')
                            }}>Register Now</Text>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logo: {
        marginTop: "10%"
    }
})