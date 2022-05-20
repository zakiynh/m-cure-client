import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../src/colors';
import { AntDesign } from '@expo/vector-icons';
import { useTailwind } from "tailwind-rn"

export default function AddTransaction() {
    const tailwind = useTailwind()
    return (
        <View style={{ flex: 1 }}>
            <View style={tailwind(`w-10/12 bg-[#]`)}>


            </View>
        </View>
    )
}

// const styles = StyleSheet.create({

// })