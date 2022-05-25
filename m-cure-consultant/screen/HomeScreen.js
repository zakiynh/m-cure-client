import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Modal, Pressable, View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image, TextInput } from "react-native";
import { Avatar, Title } from "react-native-paper";
import COLORS from "../src/colors";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn";
import axios from "axios";
import * as Linking from "expo-linking";
import { useNavigation } from "@react-navigation/native";
import { postStatus, postVideoCode, postLoginUser } from "../src/store/actions/userActions";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
const addCode = require("../assets/add-code.png");

const image = { uri: "https://th.bing.com/th/id/OIP.uJg0Ku4GimXqktPdSC3YAgHaJT?pid=ImgDet&w=860&h=1081&rs=1" };
const data2 = [
    { image, name: "Consultant A", User: {} },
    { image, name: "Consultant B", User: {} },
    { image, name: "Consultant C", User: { videoCode: "aiueio" } },
    { image, name: "Consultant D", User: {} },
    { image, name: "Consultant E", User: { videoCode: "aiueio" } },
    { image, name: "Consultant F", User: {} },
    { image, name: "Consultant G", User: {} },
    { image, name: "Consultant H", User: {} },
    { image, name: "Consultant I", User: { videoCode: "aiueio" } },
    { image, name: "Consultant J", User: {} },
];

const logo = require("../assets/logo-wo-bg.png");
const baseUrl = "https://m-cure-postgres.herokuapp.com/users/consultants";

export default function HomeScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [videoCode, onChangeVideoCode] = useState("");
    const { id, access_token, status } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const tailwind = useTailwind();
    const [data, setData] = useState([]);

    const code = {
        videoCode,
    };

    function videoCall() {
        Linking.openURL(`https://m-cure-call.web.app/consultant/${id}`);
    }

    async function getCode() {
        try {
            const response = await dispatch(postVideoCode(code));
            if (response === "success") {
                Alert.alert("Success", "Your video code has been sent to user");
                    dispatch(postStatus());
                setModalVisible(false);
            } else {
                throw response;
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        axios(baseUrl + "/histories/open", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                access_token: access_token,
            },
        })
            .then((res) => {
                const data = res.data.data;
                setData(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
            <View style={tailwind("mx-auto my-5")}>
                <Image source={logo} style={{ width: 200, height: 200 }} />
            </View>
            <View style={[tailwind(`bg-[#b4e197] w-80 rounded-3xl mx-auto`), { justifyContent: "center", alignItems: "center", height: "25%" }]}>
                <TouchableOpacity style={{ flexDirection: "row", marginBottom: 10 }} onPress={videoCall}>
                    <Entypo name="video-camera" size={40} color="black" />
                    <Text style={{ marginLeft: 20, marginBottom: 20, fontSize: 35, alignItems: "center" }}>Video Call</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            // Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <TextInput
                                    style={styles.modalText}
                                    value={videoCode}
                                    onChangeText={onChangeVideoCode}
                                    placeholder="Input Code Here"
                                    placeholderTextColor={COLORS.textGray}
                                    autoCapitalize="none"
                                />
                                {/* <Pressable style={[styles.button]} onPress={() => setModalVisible(!modalVisible)}> */}
                                <TouchableOpacity style={[styles.button]} onPress={() => getCode()}>
                                    {<Text style={styles.textStyle}>Submit Code</Text>}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Pressable style={{ flexDirection: "row", marginBottom: 10 }} onPress={() => setModalVisible(true)}>
                        <FontAwesome5 name="qrcode" size={40} color="black" />
                        <Text style={{ marginLeft: 20, fontSize: 35 }}>Video Code</Text>
                    </Pressable>
                </View>
                    <TouchableOpacity style={{ flexDirection: "row", marginBottom: 10 }} onPress={() => navigation.navigate('Chat')}>
                    <Ionicons name="chatbubble-ellipses-outline" size={40} color="black"  />
                        <Text style={{ marginLeft: 20, fontSize: 35 }}>Chat</Text>
                    </TouchableOpacity>
            </View>

            <View style={tailwind("my-5 mx-auto")}>
                <Text style={tailwind("text-xl text-center font-bold")}>Consultant Page</Text>
                <Text style={tailwind(`text-xl text-center text-[#4e944f] underline`)}></Text>
            </View>
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
        padding: 10,
        borderRadius: 40,
        backgroundColor: COLORS.buttonGreen,
        fontWeight: "bold",
        alignItems: "center",
        textAlign: "center",
        fontSize: 20,
    },
    addCode: {
        resizeMode: "contain",
        width: 60,
        height: 60,
    },
    buttonAdd: {
        position: "absolute",
        height: 90,
        alignItems: "center",
        justifyContent: "center",
        bottom: 20,
        right: 20,
    },
    modalView: {
        marginBottom: 70,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 70,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    textStyle: {
        // color: 'white',
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
    },
});
