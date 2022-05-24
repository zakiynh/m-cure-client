import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
const logo = require("../assets/logo-wo-bg.png");
const photo = require("../assets/istockphoto-503589364-612x612.jpg");

const windowHeight = Dimensions.get('window').height

export default function OnBoardingPage() {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>

      <View style={{ flex: 1.5, marginTop: 120, marginBottom: 15 }}>
        <Image
          source={logo}
          style={{ width: 140, height: 140 }}
        />
      </View>

      <View style={{ marginTop: 15, margin: 15, flex: 1 }}>
        <Text style={{ fontSize: 22, color: "#556B2F", textAlign: "center" }}>
          Creating better financial lives through technology and experts
        </Text>
      </View>

      <View style={{ marginBottom: 10, width: "30%", alignSelf: "center", flex: 0.5 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login Screen")
          }}
        >
          <View
            style={{
              backgroundColor: "#B4E197",
              padding: 9,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "grey", textAlign: "center" }}>
              start now
            </Text>
          </View>

        </TouchableOpacity>
      </View>

      <View style={{ flex: 2, marginBottom: 150 }}>
        <Image source={photo} style={{ width: 420, height: 300 }} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 30,
    marginBottom: -20,
  },
});