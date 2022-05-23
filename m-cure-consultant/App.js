import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import MainStack from './navigation/MainStack';
import { Provider } from 'react-redux';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import store from './src/store';

export default function App() {
  return (
    <Provider store={store}>
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </TailwindProvider>
    </Provider>
  );
}
