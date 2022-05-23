import { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Avatar, Title, Caption } from "react-native-paper";
import COLORS from "../src/colors";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn";
import axios from "axios";

const image = { uri: "https://th.bing.com/th/id/OIP.uJg0Ku4GimXqktPdSC3YAgHaJT?pid=ImgDet&w=860&h=1081&rs=1" };
const data2 = [
    { image, name: "User A", history: "terimakasih", date: "13/06/2022" },
    { image, name: "User B", history: "oke", date: "13/06/2021" },
    { image, name: "User C", history: "sama-sama", date: "13/02/2022" },
    { image, name: "User D", history: "uhuy", date: "13/01/2022" },
    { image, name: "User E", history: "ini", date: "13/01/2022" },
    { image, name: "User F", history: "history", date: "13/02/2022" },
    { image, name: "User G", history: "chat", date: "13/02/2022" },
    { image, name: "User H", history: "sekian", date: "13/01/2022" },
    { image, name: "User I", history: "dan", date: "13/02/2022" },
    { image, name: "User J", history: "terimakasih", date: "13/04/2022" },
];
const baseUrl = "https://m-cure-postgres.herokuapp.com/users/consultants";

export default function ConsultationHistory() {
    const tailwind = useTailwind();
    const [data, setData] = useState([])
    useEffect(() => {
        axios( baseUrl + "/histories/close", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJkZWJieXJpYUBtYWlsLmNvbSIsImlhdCI6MTY1MzI5NDYyOCwiZXhwIjoxNjUzMzE2MjI4fQ.8AzEeXVZ9kHmUE3k64rx4OIBxjmhclpdj6WJLsmwkHs",
            }
        })
        .then(res => {
            const data = res.data.data
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
                    data={data2}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.consultant}>
                                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                    <Avatar.Image source={image} size={80} />
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 20 }}>
                                        <View style={{ marginLeft: 10, marginRight: 10 }}>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                <Title
                                                    style={[
                                                        styles.consultantName,
                                                        {
                                                            marginTop: 15,
                                                            marginBottom: 15,
                                                        },
                                                    ]}
                                                >
                                                    {item.name}
                                                </Title>
                                                <View style={{ paddingHorizontal: 140, paddingVertical: 20 }}>
                                                    <Caption style={[styles.chat]}>{item.date}</Caption>
                                                </View>
                                            </View>
                                            <Caption style={styles.chat}>{item.history}</Caption>
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
        marginBottom: 15,
        flex: 1,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.mainGreen,
    },
    consultantName: {
        fontSize: 24,
        fontWeight: "bold",
    },
    logo: {
        marginTop: 5,
        lineHeight: 30,
    },
    chat: {
        fontSize: 16,
        lineHeight: 16,
        fontWeight: "500",
    },
});
