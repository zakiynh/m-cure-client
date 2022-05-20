import React from "react";
import { View, Text, StyleSheet, TextInput, ImageBackground } from "react-native";
import COLORS from "../src/colors";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AntDesign } from "@expo/vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useTailwind } from "tailwind-rn";

const image = { uri: "https://www.awrestaurants.co.id/images/anwbearanimation-1.gif" };

export default function Profile() {
    const tailwind = useTailwind();
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={[ { alignItems: "center" }]}>
                <View
                    style={{
                        height: 100,
                        width: 100,
                        borderRadius: 15,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ImageBackground source={image} style={{ height: 100, width: 100 }} imageStyle={{ borderRadius: 15 }}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        ></View>
                    </ImageBackground>
                </View>
                <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>Username Disini</Text>
            </View>

            <View style={styles.action}>
                <FontAwesome name="user-o" color={COLORS.mainGreen} size={22}>
                    {" "}
                    Name
                </FontAwesome>
                <Text style={[tailwind("mt-2"), { fontWeight: "bold", fontSize: 20 }]}> Name disini </Text>
            </View>
            <View style={styles.action}>
                <FontAwesome name="envelope-o" color={COLORS.mainGreen} size={22}>
                    {" "}
                    Email
                </FontAwesome>
                <Text style={[tailwind("mt-2"), { fontWeight: "bold", fontSize: 20 }]}> Email disini </Text>
            </View>
            <View style={styles.action}>
                <FontAwesome name="lock" color={COLORS.mainGreen} size={22}>
                    {" "}
                    Password
                </FontAwesome>
                <Text style={[tailwind("mt-2"), { fontWeight: "bold", fontSize: 20 }]}> Password disini </Text>
            </View>
            <View style={styles.action}>
                <FontAwesome name="user-o" color={COLORS.mainGreen} size={22}>
                    {" "}
                    User ID
                </FontAwesome>
                <Text style={[tailwind("mt-2"), { fontWeight: "bold", fontSize: 20 }]}> User ID disini </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    action: {
        flexDirection: "column",
        marginTop: 30,
        marginBottom: 5,
        borderBottomWidth: 2,
        borderBottomColor: "#f2f2f2",
        paddingBottom: 5,
        paddingLeft: 15,
    },
});
