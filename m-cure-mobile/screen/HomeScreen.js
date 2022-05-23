import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import COLORS from "../src/colors";
import { Title } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn";
import axios from "axios";
import Daily from "../components/Daily";
import { useNavigation } from "@react-navigation/native";
const plus = require("../assets/icons8-plus.png");
import { useSelector } from "react-redux";
import AppStack from "../navigation/AppStack";

const baseUrl = "https://m-cure-postgres.herokuapp.com/";

export default function HomeScreen() {
    const navigation = useNavigation();
    const tailwind = useTailwind();
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const { access_token } = useSelector((state) => {
        return state.user
    })

    useEffect(() => {
        if (Platform.OS === "android") {
            require("intl");
            require("intl/locale-data/jsonp/id-ID");
        }
        axios(baseUrl + "users/transactions", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                access_token
            },
        })
            .then((res) => {
                const data = res.data;
                setData(data);
                return axios(baseUrl + "users/transactions/report", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        access_token
                    },
                });
            })
            .then((resp) => {
                const dataReport = resp.data;
                setData2(dataReport);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [data2]);

    if (data2.length === 0) {
        return (
            <View style={tailwind("flex-1 flex justify-center items-center")}>
                <Text>
                    <ActivityIndicator size="large" color="#00ff00" />
                </Text>
            </View>
        );
    }
    const header = () => {
        return (
            <>
                <AppStack />
                <View style={{ backgroundColor: COLORS.chatGray, flex: 1, minHeight: "100%" }}>
                    <View style={{ backgroundColor: COLORS.white }}>
                        <View style={styles.overview}>
                            <View style={styles.row}>
                                <Text style={styles.textTitle}>This Month Overviews</Text>
                                <MaterialIcons
                                    onPress={() => {
                                        navigation.navigate("Report");
                                    }}
                                    style={[tailwind("mr-6")]}
                                    name="navigate-next"
                                    size={30}
                                    color="black"
                                />
                            </View>
                            <Text style={styles.text}>Tap to see full report</Text>
                        </View>
                        <View style={styles.secText}>
                            <Text style={{ fontSize: 19 }}>Income</Text>
                            <Text style={[tailwind("text-[#235Bed] mr-6"), { fontSize: 19 }]}>
                                {data2.totalIncome
                                    ? new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(data2.totalIncome)
                                    : "Rp.0,00"}
                            </Text>
                        </View>
                        <View style={styles.secText}>
                            <Text style={{ fontSize: 19 }}>Expense</Text>
                            <Text style={[tailwind("text-[#f43f3f] mr-6"), { fontSize: 19, borderBottomWidth: 2, borderBottomColor: "#f2f2f2" }]}>
                                {data2.totalExpenses
                                    ? new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(data2.totalExpenses)
                                    : "Rp.0,00"}
                            </Text>
                        </View>
                        <View style={styles.secText}>
                            <Text style={{ fontSize: 19 }}> </Text>
                            <Text style={[tailwind("mr-6 mb-4"), { fontSize: 22 }]}>
                                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
                                    JSON.stringify(data2.totalIncome - data2.totalExpenses)
                                )}
                            </Text>
                        </View>
                    </View>

                </View>

            </>
        );
    };
    return (
        <>
            {/* DAILY */}
            <FlatList
                ListHeaderComponent={header}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 70,
                }}
                data={data.data}
                renderItem={({ item }) => {
                    return <Daily daily={item} />;
                }}
            />
            <View style={{ flex: 1, justifyContent: "center", width: "100%" }}>
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        navigation.navigate("Add Transaction");
                    }}
                >
                    <View>

                        <Image
                            style={styles.plus} source={plus} />
                    </View>

                </TouchableOpacity>
            </View>

        </>
    );
}

const styles = StyleSheet.create({
    overview: {
        flexDirection: "column",
        marginTop: 30,
        marginBottom: 5,
        borderBottomWidth: 2,
        borderBottomColor: "#f2f2f2",
        paddingBottom: 5,
        paddingLeft: 15,
    },
    textTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    text: {
        fontSize: 19,
        fontWeight: "normal",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    secText: {
        flexDirection: "row",
        marginTop: 10,
        paddingBottom: 5,
        paddingLeft: 17,
        justifyContent: "space-between",
    },
    button: {
        position: "absolute",
        height: 90,
        alignItems: "center",
        justifyContent: "center",
        bottom: 20,
        width: "100%",
    },
    plus: {
        resizeMode: "contain",
        width: 60,
        height: 60,
    },
});
