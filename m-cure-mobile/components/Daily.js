import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import COLORS from "../src/colors";
import { Title } from "react-native-paper";

export default function Daily({ daily }) {
    const dateReport = new Date(daily.transactionDate);
    const dayDict = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthDict = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const image = { uri: daily.Category.icon };
    return (
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
                    <View style={{ flexDirection: "row", marginTop: 15 }}>
                        <Image style={styles.catImg} source={image} />
                        <View style={{ marginLeft: 20 }}>
                            <Title
                                style={[
                                    styles.day,
                                    {
                                        marginTop: 2,
                                    },
                                ]}
                            >
                                {daily.Category.type}
                            </Title>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={[styles.chat, { fontSize: 16 }]}>{daily.Category.name}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    
    date: {
        fontSize: 35,
        fontWeight: "bold",
        padding: 12,
        marginLeft: 10
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
    },
});