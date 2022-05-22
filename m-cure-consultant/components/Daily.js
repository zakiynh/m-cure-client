import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import COLORS from "../src/colors";
import { Title } from "react-native-paper";
const plus = require("../assets/icons8-plus.png");

export default function Daily({ daily }) {
    const dateReport = new Date(daily.transactionDate);
    const dayDict = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthDict = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const image = { uri: daily.Category.icon };
    if (Platform.OS === "android") {
        require("intl");
        require("intl/locale-data/jsonp/id-ID");
    }
    return (
        <>
        <View style={{ marginTop: 10, paddingBottom: 4, backgroundColor: COLORS.white }}>
            <View style={{ backgroundColor: COLORS.white }}>
                <View style={{ flexDirection: "row", marginTop: 15, borderBottomWidth: 2, borderBottomColor: "#f2f2f2" }}>
                    <Text style={styles.date}>{dateReport.getDate()}</Text>
                    <View style={{ marginLeft: 20 }}>
                        <Title
                            style={[
                                styles.day,
                                {
                                    marginTop: 10,
                                },
                            ]}
                        >
                            {dayDict[dateReport.getDay()]}
                        </Title>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={[styles.chat, { fontSize: 16 }]}>
                                {monthDict[dateReport.getMonth()]} {dateReport.getFullYear()}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Category */}
                <View style={{ backgroundColor: COLORS.white, marginBottom: 15 }}>
                    <View style={{ flex: 1, flexDirection: "row", marginTop: 15 }}>
                        <View>
                            <Image style={styles.catImg} source={image} />
                        </View>
                            <View style={{ flex: 1,marginLeft: 20, flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={{ justifyContent: "space-between" }}>
                                    <Title style={[styles.category, { marginTop: 2 }]}>{daily.Category.type}</Title>
                                    <Text style={[styles.chat, { fontSize: 16 }]}>{daily.Category.name}</Text>  
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between",  alignItems: "center",  }}>
                                    <Title style={[styles.category, {marginTop: 2, paddingRight: 25, color:daily.Category.name === 'Expense' ? COLORS.textRed : COLORS.textBlue }]}>
                                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(daily.amount)}
                                    </Title>
                                </View>
                            </View>
                    </View>
                </View>
            </View>

            {/* FloatingButton */}
        </View>
        
        </>
        
    );
}

const styles = StyleSheet.create({
    date: {
        fontSize: 35,
        fontWeight: "bold",
        padding: 12,
        marginLeft: 10,
    },
    day: {
        fontSize: 17,
        fontWeight: "bold",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    catImg: {
        marginLeft: 15,
        width: 50,
        height: 50,
    },
    category: {
        fontSize: 17,
        fontWeight: "bold",
    },
    button: {
        // position: "absolute",
        height: 60,
        width: 60,
    },
    plus: {
        resizeMode: "contain",
        width: 50,
        height: 50,
    }
});
