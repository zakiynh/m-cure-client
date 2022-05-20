import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import MainStack from './navigation/MainStack';

export default function App() {
  return (
    <NavigationContainer>
      {/* <GestureHandlerRootView> */}
      {/* <NavigationContainer> */}
      <MainStack />
      {/* </NavigationContainer> */}
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
