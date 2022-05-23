import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Avatar, Title } from "react-native-paper";
import COLORS from "../src/colors";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn"
import axios from 'axios';

const image = { uri: "https://th.bing.com/th/id/OIP.uJg0Ku4GimXqktPdSC3YAgHaJT?pid=ImgDet&w=860&h=1081&rs=1" };
// const data = [
//     {image, name: "Consultant A"},
//     {image, name: "Consultant B"},
//     {image, name: "Consultant C"},
//     {image, name: "Consultant D"},
//     {image, name: "Consultant E"},
//     {image, name: "Consultant F"},
//     {image, name: "Consultant G"},
//     {image, name: "Consultant H"},
//     {image, name: "Consultant I"},
//     {image, name: "Consultant J"},
// ]

const baseUrl = "https://m-cure-origin.herokuapp.com/"

export default function HomeScreen() {
    const tailwind = useTailwind()
    // const [data, setData] = useState([])
    // useEffect(() => {
    //     axios( baseUrl + "users/consultants", {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJyYXRpaHNhbmpheWFAbWFpbC5jb20iLCJpYXQiOjE2NTMxMTU3NDEsImV4cCI6MTY1MzEyMjk0MX0.KZnmqQkJm1BZA6kEv0cb1be7XzEejlMEKHgnh3O_PDI"
    //         }
    //     })
    //     .then(res => {
    //         const data = res.data
    //         console.log("data: ", data);
    //         setData(data)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }, [])
    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                {/* <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: 10,
                        paddingBottom: 70,
                    }}
                    data={data}
                    renderItem={({ item }) => { */}
                        {/* return ( */}
                            <View style={styles.consultant}>
                                <View style={{ flexDirection: "row", marginTop: 15 }}>
                                    <Avatar.Image source={image} size={80} />
                                    <View style={{ marginLeft: 20 }}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15, }}>
                                            <Text style={styles.button}>Start Consulting</Text>
                                            <Entypo style={[styles.logo, {marginLeft: 40}]} name="chat" size={30} color={COLORS.mainGreen} />
                                            <FontAwesome style={[styles.logo, {marginLeft: 40}]} name="video-camera" size={30} color={COLORS.mainGreen} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        {/* ); */}
                    {/* }} */}
                {/* /> */}
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
    },
});