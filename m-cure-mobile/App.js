import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import MainStack from './navigation/MainStack';
import AppStack from './navigation/AppStack';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/store/index'
import LoginScreen from './screen/LoginScreen';
import Register from './screen/Register';
import HomeScreen from './screen/HomeScreen';
import Report from './screen/Report';
import ReportIncome from './screen/ReportIncome';
import ReportExpense from './screen/ReportExpense';
import Chat from './screen/Chat';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <TailwindProvider utilities={utilities}>
        {/* <SafeAreaView> */}
        <NavigationContainer>
          <SafeAreaView
            style={{
              flex: 1,
              paddingVertical: 8,
            }}
          >
            {/* <GestureHandlerRootView> */}
            <Stack.Navigator>

              {/* <Stack.Screen name="Login Screen" component={LoginScreen} options={{ headerShown: false }} /> */}
              {/* <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} /> */}
              {/* <Stack.Screen name="Home Screen" component={HomeScreen} /> */}
              {/* <Stack.Screen name="Report" component={Report} /> */}
              <Stack.Screen name="Chat" component={Chat} />
              {/* <Stack.Screen name="Report Income" component={ReportIncome} /> */}

              {/* <LoginScreen /> */}
              {/* <MainStack /> */}
              {/* <Stack.Screen name="Home Screen" component={AppStack} options={{ headerShown: false }} /> */}

              {/* <AppStack /> */}

              {/* </GestureHandlerRootView> */}
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </TailwindProvider>
    </Provider >

  );
}
