import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import COLORS from '../src/colors';
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTailwind } from "tailwind-rn"
import { Picker } from '@react-native-picker/picker'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios'
import { getDetailTransactions, getCategories, updateTransaction, deleteTransaction } from '../src/store/actions/transactionActions';

export default function EditTransaction({ navigation, route }) {
    const dispatch = useDispatch()
    const tailwind = useTailwind()
    const baseUrl = "https://m-cure-origin.herokuapp.com"
    // const idTransaction = route.params.id

    const { access_token } = useSelector((state) => {
        return state.user
    })
    const { detailTransactions, allCategories } = useSelector((state) => {
        return state.transaction
    })

    const [amount, onChangeAmount] = useState(0)
    const [categoryName, onChangeCategory] = useState("")
    const [CategoryId, onChangeCategoryId] = useState(5)
    const [transactionDate, onChangeDate] = useState(new Date())
    const [categoryData, setData] = useState([])

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

    // Update Transaction
    async function updateTransactionHandler() {
        try {
            let response = await dispatch(updateTransaction(dataToSend, 11, access_token))

            if (response === "success") {
                console.log("berhasil edit transaction")
                // swal berhasil edit transaction
                navigation.navigate('Home Screen')
            } else {
                throw response
            }
        } catch (error) {
            // swal error edit transaction
            console.log(error)
        }
    }

    // Delete Transaction
    async function deleteTransactionHandler() {
        try {
            let response = await dispatch(deleteTransaction(11, access_token))

            if (response === "success") {
                console.log("berhasil delete transaction")
                // swal berhasil delete transaction
                navigation.navigate('Home Screen')
            } else {
                throw response
            }
        } catch (error) {

        }
    }

    // Get Detail Transaction
    useEffect(() => {
        dispatch(getDetailTransactions(11, access_token))

        if (detailTransactions) {
            onChangeAmount(detailTransactions.amount)
            onChangeCategory(detailTransactions.Category.name)
            onChangeCategoryId(detailTransactions.CategoryId)
            onChangeDate(new Date(detailTransactions.transactionDate))
        }

    }, [detailTransactions.amount, detailTransactions.Category.name, detailTransactions.CategoryId, detailTransactions.transactionDate])

    // Get All Categories
    useEffect(() => {
        dispatch(getCategories())
    }, [])

    // Filter Category Type
    useEffect(() => {
        if (categoryName === 'Income') {
            setData(allCategories.incomeCategories)
        } else if (categoryName === "Expense") {
            setData(allCategories.expenseCategories)
        } else {
            setData([])
        }
    }, [categoryName, allCategories])

    return (
        <View style={{ flex: 1 }}>
            <View style={tailwind(`bg-white w-full h-full mx-auto mt-3`)}>
                <TextInput
                    style={tailwind(`w-3/4 h-12 mx-auto mt-7 px-4 border-b-2 border-gray-500 bg-white text-xl text-[${COLORS.textGreen}]`)}
                    onChangeText={onChangeAmount}
                    value={amount.toString()}
                    placeholder="Amount"
                    keyboardType="numeric"
                />
                <View style={tailwind("w-3/4 h-12 mx-auto mt-7 px-2 border-b-2 border-gray-500")}>
                    <Picker
                        selectedValue={categoryName}
                        onValueChange={(itemValue, itemIndex) => onChangeCategory(itemValue)}>
                        <Picker.Item enabled={false} label={"Select Category"} style={tailwind(`text-xl text-xl text-neutral-400`)} />
                        <Picker.Item style={tailwind("text-xl")} value={"Income"} label={"Income"} />
                        <Picker.Item style={tailwind("text-xl")} value={"Expense"} label={"Expense"} />
                    </Picker>
                </View>
                <View style={tailwind("w-3/4 h-12 mx-auto mt-7 px-2 border-b-2 border-gray-500")}>
                    <Picker
                        selectedValue={CategoryId}
                        onValueChange={(itemValue, itemIndex) => onChangeCategoryId(itemValue)}>
                        <Picker.Item enabled={false} label='Select Transaction Type' style={tailwind(`text-xl text-xl text-neutral-400`)} />
                        {categoryData.map((el, index) => {
                            return (
                                <Picker.Item key={index} style={tailwind("text-xl")} value={el.id} label={el.type} />
                            )
                        })}
                    </Picker>
                </View>

                <View style={tailwind("w-3/4 h-12 mx-auto mt-7 px-2 border-b-2 border-gray-500")}>
                    <Pressable style={tailwind("flex-row")} onPress={showDatepicker}>
                        <Text>
                            <Icon name='calendar-alt' size={30} />
                        </Text>
                        <Text style={tailwind("text-xl text-neutral-400")}> {transactionDate.toLocaleString('id-ID')}</Text>
                    </Pressable>
                </View>

                <Pressable style={tailwind(`bg-[#e9efc0] h-12 w-3/4 mx-auto mt-7 px-4 rounded-2xl`)}
                    onPress={updateTransactionHandler}
                >
                    <Text style={tailwind("text-xl text-center my-auto font-bold tracking-wide")}>
                        <Icon name='edit' size={25} />
                        Edit
                    </Text>
                </Pressable>
                <Pressable style={tailwind(`bg-[#ea1616] h-12 w-3/4 mx-auto my-5 px-4 rounded-2xl`)}
                    onPress={deleteTransactionHandler}
                >
                    <Text style={tailwind("text-xl text-center my-auto font-bold tracking-wide")}>
                        <Icon name='trash' size={25} />
                        Delete
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

// const styles = StyleSheet.create({

// })