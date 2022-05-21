import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Avatar, Title, Caption } from "react-native-paper";
import COLORS from "../src/colors";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn";

const image = { uri: "https://th.bing.com/th/id/OIP.uJg0Ku4GimXqktPdSC3YAgHaJT?pid=ImgDet&w=860&h=1081&rs=1" };
const data = [
    { image, name: "Consultant A", history: "terimakasih", date: "13/06/2022" },
    { image, name: "Consultant B", history: "oke", date: "13/06/2021" },
    { image, name: "Consultant C", history: "sama-sama", date: "13/02/2022" },
    { image, name: "Consultant D", history: "uhuy", date: "13/01/2022" },
    { image, name: "Consultant E", history: "ini", date: "13/01/2022" },
    { image, name: "Consultant F", history: "history", date: "13/02/2022" },
    { image, name: "Consultant G", history: "chat", date: "13/02/2022" },
    { image, name: "Consultant H", history: "sekian", date: "13/01/2022" },
    { image, name: "Consultant I", history: "dan", date: "13/02/2022" },
    { image, name: "Consultant J", history: "terimakasih", date: "13/04/2022" },
];

export default function ConsultantList() {
    const tailwind = useTailwind();
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
                                <View style={{ flexDirection: "row", marginTop: 15 }}>
                                    <Avatar.Image source={item.image} size={80} />
                                    <View style={{ flexDirection: "row", justifyContent:"space-between", marginLeft: 20 }}>
                                        <View style={{ marginLeft: 10, marginRight: 10 }}>
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
                                            <View><Caption style={[styles.chat, {alignItems: 'flex-end'}]}>{item.date}</Caption></View>
                                            </Title>
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
        marginBottom: 25,
        flex: 1,
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
