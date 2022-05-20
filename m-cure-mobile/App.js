import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';

import LoginPage from './screen/LoginPage';

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack.Navigator>
            <Stack.Screen name='LoginPage' component={LoginPage} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </TailwindProvider>
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
