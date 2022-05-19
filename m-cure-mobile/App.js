import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import AddTransaction from './screen/AddTransaction';
import Category from './screen/Category';
import Chat from './screen/Chat';
import ConsultantList from './screen/ConsultantList';
import ConsultationHistory from './screen/ConsultationHistory';
import EditTransaction from './screen/EditTransaction';
import HomeScreen from './screen/HomeScreen';
import LoginScreen from './screen/LoginScreen';
import Payment from './screen/Payment';
import Profile from './screen/Profile';
import Register from './screen/Register';
import Report from './screen/Report';
import ReportDetail from './screen/ReportDetail';
import VideoCall from './screen/VideoCall';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <GestureHandlerRootView> */}
        <SafeAreaView style={{ flex: 1 }}>
          {/* <GestureDetector> */}
            <Stack.Navigator>
            <Stack.Screen name="Add Transaction" component={AddTransaction} />
            <Stack.Screen name="Category" component={Category} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="Consultan tList" component={ConsultantList} />
            <Stack.Screen name="Consultation History" component={ConsultationHistory} />
            <Stack.Screen name="Edit Transaction" component={EditTransaction} />
            <Stack.Screen name="Home Screen" component={HomeScreen} />
            <Stack.Screen name="Login Screen" component={LoginScreen} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Report" component={Report} />
            <Stack.Screen name="ReportDetail" component={ReportDetail} />
            <Stack.Screen name="VideoCall" component={VideoCall} />
            </Stack.Navigator>
          {/* </GestureDetector> */}
        </SafeAreaView>
      {/* </GestureHandlerRootView> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
