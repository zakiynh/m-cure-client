import { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Button } from 'react-native';
import COLORS from '../src/colors';
import { AntDesign } from '@expo/vector-icons';
import { useTailwind } from "tailwind-rn"
import { Picker } from '@react-native-picker/picker'
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { postTransaction } from '../src/store/actions/transactionActions';

export default function AddTransaction() {
    const tailwind = useTailwind()
    const baseUrl = "https://m-cure-origin.herokuapp.com"
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { access_token } = useSelector((state) => {
        return state.user
    })

    const [amount, onChangeAmount] = useState("")
    const [categoryName, onChangeCategory] = useState("")
    const [CategoryId, onChangeCategoryId] = useState("")
    const [transactionDate, onChangeDate] = useState(new Date())
    const [categoryData, setData] = useState([])
    const [allCategories, setAllCategories] = useState([])

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        onChangeDate(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: transactionDate,
            onChange,
            mode: currentMode,
            is24Hour: true
        })
    };
    const showDatepicker = () => {
        showMode('date');
    };

    const dataToSend = {
        amount,
        transactionDate,
        CategoryId
    }

    // Get All Type Transaction
    async function getCategories() {
        try {
            let response = await axios.get(`${baseUrl}/categories`)
            setAllCategories(response.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    // Hit to Server Post Transaction
    async function addTransactionHandler() {
        try {
            let response = await dispatch(postTransaction(dataToSend, access_token))

            if (response === "success") {
                console.log("berhasil add transaction")
                // swal berhasil add transaction
                // navigation.navigate('Home Screen')
            } else {
                throw response
            }
        } catch (err) {
            // swal error add transaction
            console.log(err)
        }
    }
    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        if (categoryName === 'income') {
            setData(allCategories.incomeCategories)
        } else if (categoryName === "expense") {
            setData(allCategories.expenseCategories)
        } else {
            setData(allCategories)
        }
    }, [categoryName])


    return (
        <View style={{ flex: 1 }}>
            <View style={tailwind(`bg-white w-full h-3/4 mx-auto mt-3`)}>
                <TextInput
                    style={tailwind(`w-3/4 h-12 mx-auto mt-7 px-4 border-b-2 border-gray-500 bg-white text-xl text-[${COLORS.textGreen}]`)}
                    onChangeText={onChangeAmount}
                    value={amount}
                    placeholder="Amount"
                    keyboardType="numeric"
                />
                <View style={tailwind("w-3/4 h-12 mx-auto mt-7 px-2 border-b-2 border-gray-500")}>
                    <Picker
                        selectedValue={categoryName}
                        onValueChange={(itemValue, itemIndex) => onChangeCategory(itemValue)}>
                        <Picker.Item enabled={false} label={"Select Category"} style={tailwind(`text-xl text-xl text-neutral-400`)} />
                        <Picker.Item style={tailwind("text-xl")} value={"income"} label={"Income"} />
                        <Picker.Item style={tailwind("text-xl")} value={"expense"} label={"Expense"} />
                    </Picker>
                </View>
                <View style={tailwind("w-3/4 h-12 mx-auto mt-7 px-2 border-b-2 border-gray-500")}>
                    <Picker
                        selectedValue={CategoryId}
                        onValueChange={(itemValue, itemIndex) => onChangeCategoryId(itemValue)}>
                        <Picker.Item enabled={false} label='Select Transaction Type' style={tailwind(`text-xl text-xl text-neutral-400`)} />
                        {categoryData.map((el) => {
                            return (
                                <Picker.Item style={tailwind("text-xl")} value={el.id} label={el.type} />
                            )
                        })}
                    </Picker>
                </View>

                <View style={tailwind("w-3/4 h-12 mx-auto mt-7 px-2 border-b-2 border-gray-500")}>
                    <Pressable style={tailwind("flex-row")} onPress={showDatepicker}>
                        <Text>
                            <Icon name='calendar' size={30} />
                        </Text>
                        <Text style={tailwind("text-xl text-neutral-400")}> {transactionDate.toLocaleString('id-ID')}</Text>
                    </Pressable>
                </View>

                <Pressable style={tailwind(`bg-[#e9efc0] h-12 w-3/4 mx-auto mt-7 px-4 rounded-2xl`)}
                    onPress={addTransactionHandler}
                >
                    <Text style={tailwind("text-xl text-center my-auto font-bold")}>Save</Text>
                </Pressable>
            </View>
        </View >
    )
}