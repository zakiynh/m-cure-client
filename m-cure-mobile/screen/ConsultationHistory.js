import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Avatar, Title, Caption } from "react-native-paper";
import COLORS from "../src/colors";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const image = { uri: "https://th.bing.com/th/id/OIP.uJg0Ku4GimXqktPdSC3YAgHaJT?pid=ImgDet&w=860&h=1081&rs=1" };
const data = [
    { image, name: "Consultant A", history: "terimakasih" },
    { image, name: "Consultant B", history: "oke" },
    { image, name: "Consultant C", history: "sama-sama" },
    { image, name: "Consultant D", history: "uhuy" },
    { image, name: "Consultant E", history: "ini" },
    { image, name: "Consultant F", history: "history" },
    { image, name: "Consultant G", history: "chat" },
    { image, name: "Consultant H", history: "sekian" },
    { image, name: "Consultant I", history: "dan" },
    { image, name: "Consultant J", history: "terimakasih" },
];

export default function ConsultantList() {
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
                                    <View style={{ flexDirection: "row", marginLeft: 20 }}>
                                        <View style={{ marginLeft: 20 }}>
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
