import { View, StyleSheet, Dimensions, Image, Text, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn"
import COLORS from "../src/colors";

const logo = require("../assets/logo-wo-bg.png")
const windowWidth = Dimensions.get('window').width


export default function LoginPage() {
  const tailwind = useTailwind()

  return (
    <>
      <ScrollView>
        <View style={tailwind("mx-auto")}>
          <Image source={logo} style={{ width: 200, height: 200 }} />
        </View>
        {/* <View style={tailwind(`bg-[#b4e197] w-full h-full`)}>

        </View> */}
      </ScrollView>
    </>
  )
}

// const styles = 