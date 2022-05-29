import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screen/HomeScreen";
import LoginScreen from "../screen/LoginScreen";
import Chat from "../screen/Chat";
import ConsultationHistory from "../screen/ConsultationHistory";
import COLORS from "../src/colors";

const Stack = createNativeStackNavigator();

export default function MainStack() {
    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <Stack.Navigator>
                {/* <Stack.Screen name="Consultation History" component={ConsultationHistory} /> */}
                <Stack.Screen name="Login Screen" component={LoginScreen} />
                <Stack.Screen name="Home Screen" component={HomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Chat" component={Chat} />
            </Stack.Navigator>
        </SafeAreaView>
    );
}
