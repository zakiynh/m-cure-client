import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TextInput } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import COLORS from "../src/colors";
import axios from "axios";

const logo = require("../assets/logo-wo-bg.png");
const baseUrl = "https://m-cure-server.herokuapp.com/"

export default function Register() {
    const tailwind = useTailwind();
    const navigation = useNavigation()
    const [name, onChangeName] = useState("")
    const [username, onChangeUsername] = useState("")
    const [email, onChangeEmail] = useState("")
    const [password, onChangePassword] = useState("")

    const data = {
        name,
        username,
        email,
        password
    }

    async function doRegister() {
        try {
            const response = await axios.post(baseUrl + "users/register", data)
            navigation.navigate('Login Screen')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <ScrollView>
                <View style={[tailwind("h-full"), { backgroundColor: COLORS.white, flex: 1 }]}>
                    <View style={tailwind("mx-auto")}>
                        <Image source={logo} style={{ width: 200, height: 200 }} />
                    </View>

                    <View style={{ flex: 1 }}>
                        <View>
                            <View style={[tailwind("mx-auto items-center"), styles.card]}>
                                <TextInput
                                    style={[tailwind("mx-auto"), styles.input]}
                                    underlineColorAndroid="transparent"
                                    placeholder="Name"
                                    placeholderTextColor={COLORS.textGray}
                                    autoCapitalize="none"
                                    onChangeText={onChangeName}
                                    value={name}
                                />
                                <TextInput
                                    style={[tailwind("mx-auto"), styles.input]}
                                    underlineColorAndroid="transparent"
                                    placeholder="Username"
                                    placeholderTextColor={COLORS.textGray}
                                    autoCapitalize="none"
                                    onChangeText={onChangeUsername}
                                    value={username}
                                />
                                <TextInput
                                    style={[tailwind("mx-auto"), styles.input]}
                                    underlineColorAndroid="transparent"
                                    placeholder="Email"
                                    placeholderTextColor={COLORS.textGray}
                                    autoCapitalize="none"
                                    onChangeText={onChangeEmail}
                                    value={email}
                                />
                                <TextInput
                                    style={[tailwind("mx-auto"), styles.input]}
                                    underlineColorAndroid="transparent"
                                    placeholder="Password"
                                    placeholderTextColor={COLORS.textGray}
                                    autoCapitalize="none"
                                    onChangeText={onChangePassword}
                                    value={password}
                                    secureTextEntry={true}
                                />

                                <View style={[tailwind("mx-auto"), styles.submitButton]} >
                                    <Text 
                                    style={tailwind("mx-auto my-auto")}
                                    onPress={doRegister}
                                    > Submit </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[tailwind("mx-auto"), styles.submitButtonG]} onPress={() => this.login(this.state.email, this.state.password)}>
                    <AntDesign style={tailwind("mx-auto my-auto")} name="google" size={19} color="black" >Sign Up With Google</AntDesign>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
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
});
