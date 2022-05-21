import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import MainStack from './navigation/MainStack';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import 'react-native-gesture-handler';
// import AppStack from './navigation/AppStack';
import { Provider } from 'react-redux';
import store from './src/store/index'

export default function App() {
  return (
    <Provider store={store}>
      <TailwindProvider utilities={utilities}>
        <NavigationContainer>
          {/* <GestureHandlerRootView> */}
          <MainStack />
          {/* <AppStack /> */}
          {/* </GestureHandlerRootView> */}
        </NavigationContainer>
      </TailwindProvider>
    </Provider>

  );
}
