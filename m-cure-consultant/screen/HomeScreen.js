import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Avatar, Title } from "react-native-paper";
import COLORS from "../src/colors";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn"
import axios from 'axios';
import * as Linking from 'expo-linking';


const image = { uri: "https://th.bing.com/th/id/OIP.uJg0Ku4GimXqktPdSC3YAgHaJT?pid=ImgDet&w=860&h=1081&rs=1" };
const data2 = [
    {image, name: "Consultant A", User: {}},
    {image, name: "Consultant B", User: {}},
    {image, name: "Consultant C", User: {videoCode: 'aiueio'}},
    {image, name: "Consultant D", User: {}},
    {image, name: "Consultant E", User: {videoCode: 'aiueio'}},
    {image, name: "Consultant F", User: {}},
    {image, name: "Consultant G", User: {}},
    {image, name: "Consultant H", User: {}},
    {image, name: "Consultant I", User: {videoCode: 'aiueio'}},
    {image, name: "Consultant J", User: {}},
]

const baseUrl = "https://m-cure-postgres.herokuapp.com/users/consultants"

export default function HomeScreen() {
    function videoCall()
    {
        Linking.openURL(`https://vidcall-test.web.app/consultant/debbyria`)
    }
    const tailwind = useTailwind()
    const [data, setData] = useState([])
    useEffect(() => {
        axios( baseUrl + "/histories/open", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJkZWJieXJpYUBtYWlsLmNvbSIsImlhdCI6MTY1MzMyNzQ1NywiZXhwIjoxNjUzMzQ5MDU3fQ.qj0aM1Pb1FLPmAIZwdb9W69mrlaF7DFkiHZniD-xfJw"
            }
        })
        .then(res => {
            const data = res.data.data
            console.log("data: ", data);
            setData(data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: 10,
                        paddingBottom: 70,
                    }}
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.consultant}>
                                <View style={{ flexDirection: "row", marginTop: 15, width: '100%'  }}>
                                    <Avatar.Image source={item.imageProfile} size={80} />
                                    <View style={{ marginLeft: 20 }}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15, }}>
                                            {/* <Text style={styles.button}>Start Consulting</Text> */}
                                            {/* {item.User.videoCode ? <Entypo style={[styles.logo, {marginLeft: 30}]} name="chat" size={30} color={COLORS.mainGreen} /> :
                                            <FontAwesome style={[styles.logo, {marginLeft: 30}]} name="video-camera" size={30} color={COLORS.mainGreen} />} */}
                                            {/* <Entypo style={[styles.logo, {marginLeft: 30}]} name="chat" size={30} color={COLORS.mainGreen} /> */}
                                            <FontAwesome
                                            onPress={() => {
                                                videoCall()
                                            }}
                                            style={[styles.logo, {marginLeft: 30}]} name="video-camera" size={30} color={COLORS.mainGreen} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        );
                    }}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    consultant: {
        paddingHorizontal: 30,
        marginBottom: 25,
        flex: 1,
    },
    consultantName: {
        fontSize: 24,
        fontWeight: "bold",
    },
    logo: {
        marginTop: 9,
        lineHeight: 30,
    },
    button: {
        marginTop: 5,
        padding: 11,
        height: 40,
        borderRadius: 40,
        backgroundColor: COLORS.buttonBlue,
        fontWeight: "bold",
        alignItems: "center",
        width: "60%",
        textAlign: "center",
    },
});
