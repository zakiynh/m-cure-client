import { View, Text, StyleSheet } from 'react-native';
// import COLORS from '../src/colors';
import { AntDesign } from '@expo/vector-icons';
import TopNav from '../components/TopNav';

export default function Payment() {
    return (
        <View style={{ flex: 1 }}>
            <TopNav />
            <Text>Payment</Text>
        </View>
    )
}

// const styles = StyleSheet.create({

// })