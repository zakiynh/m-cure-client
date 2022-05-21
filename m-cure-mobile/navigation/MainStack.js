import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddTransaction from "../screen/AddTransaction";
import Category from "../screen/Category";
import Chat from "../screen/Chat";
import ConsultantList from "../screen/ConsultantList";
import ConsultationHistory from "../screen/ConsultationHistory";
import EditTransaction from "../screen/EditTransaction";
import HomeScreen from "../screen/HomeScreen";
import LoginScreen from "../screen/LoginScreen";
import Payment from "../screen/Payment";
import Profile from "../screen/Profile";
import Register from "../screen/Register";
import Report from "../screen/Report";
import ReportDetail from "../screen/ReportDetail";
import VideoCall from "../screen/VideoCall";
import COLORS from "../src/colors";

const Stack = createNativeStackNavigator();

export default function MainStack() {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingVertical: 8,
            }}
        >
            <Stack.Navigator>
                {/* <Stack.Screen name="Add Transaction" component={AddTransaction} /> */}
                {/* <Stack.Screen name="Category" component={Category} /> */}
                {/* <Stack.Screen name="Chat" component={Chat} /> */}
                {/* <Stack.Screen name="Consultan List" component={ConsultantList} /> */}
                <Stack.Screen name="Consultation History" component={ConsultationHistory} />
                {/* <Stack.Screen name="Edit Transaction" component={EditTransaction} /> */}
                {/* <Stack.Screen name="Home Screen" component={HomeScreen} /> */}
                {/* <Stack.Screen name="Login Screen" component={LoginScreen} /> */}
                {/* <Stack.Screen name="Payment" component={Payment} /> */}
                {/* <Stack.Screen name="Profile" component={Profile} /> */}
                {/* <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} /> */}
                {/* <Stack.Screen name="Report" component={Report} />
                <Stack.Screen name="ReportDetail" component={ReportDetail} />
                <Stack.Screen name="VideoCall" component={VideoCall} /> */}
            </Stack.Navigator>
        </SafeAreaView>
    );
}
