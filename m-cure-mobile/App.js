import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <GestureHandlerRootView>
        <SafeAreaView style={{ flex: 1 }}>
          <GestureDetector>
            <Stack.Navigator>
            //pages
            </Stack.Navigator>
          </GestureDetector>
        </SafeAreaView>
      </GestureHandlerRootView>
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
