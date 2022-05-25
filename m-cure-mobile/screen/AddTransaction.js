import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Button, ScrollView, Image, Alert } from 'react-native';
import COLORS from '../src/colors';
import { AntDesign } from '@expo/vector-icons';
import { useTailwind } from "tailwind-rn"
import { Picker } from '@react-native-picker/picker'
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { postTransaction, getCategories } from '../src/store/actions/transactionActions';
import TopNav from '../components/TopNav';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddTransaction({ navigation }) {
  const tailwind = useTailwind()
  const dispatch = useDispatch()

  const { access_token } = useSelector((state) => {
    return state.user
  })
  const { allCategories } = useSelector((state) => {
    return state.transaction
  })

  const [amount, onChangeAmount] = useState("")
  const [categoryName, onChangeCategory] = useState("")
  const [CategoryId, onChangeCategoryId] = useState("")
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

  // Post Transaction
  async function addTransactionHandler() {
    try {
      let response = await dispatch(postTransaction(dataToSend, access_token))

      if (response === "success") {
        console.log("berhasil add transaction")
        Alert.alert("Success", "Succeed add transaction")
        navigation.navigate('App', { screen: 'Home Screen' })
        onChangeAmount("")
        onChangeCategory("")
        onChangeCategoryId("")
        onChangeDate(new Date())
      } else {
        throw response
      }
    } catch (err) {
      Alert.alert("Error", err)
    }
  }

  // Get All Categories
  useEffect(() => {

    dispatch(getCategories())
  }, [])

  useEffect(() => {
    if (categoryName === 'Income') {
      setData(allCategories.incomeCategories)
    } else if (categoryName === "Expense") {
      setData(allCategories.expenseCategories)
    } else {
      setData([])
    }
  }, [categoryName])


  return (
    <ScrollView style={{ flex: 1 }}>
      <TopNav />
      <SafeAreaView>
        <View style={tailwind(`bg-white w-full h-full mx-auto mt-3`)}>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Image source={require("../assets/icons8-money-100.png")} style={styles.icon} />
            <TextInput
              style={tailwind(`w-3/4 h-12 mx-auto mt-7 px-4 border-b-2 border-gray-500 bg-white text-xl text-[${COLORS.textGreen}]`)}
              onChangeText={onChangeAmount}
              value={amount}
              placeholder="Amount"
              keyboardType="numeric"
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Image source={require("../assets/icons8-opened-folder-100.png")} style={styles.icon} />
            <View style={tailwind("w-3/4 h-12 mx-auto mt-7 px-2 border-b-2 border-gray-500")}>
              <Picker
                selectedValue={categoryName}
                onValueChange={(itemValue, itemIndex) => onChangeCategory(itemValue)}>
                <Picker.Item enabled={false} label={"Select Category"} style={tailwind(`text-xl text-xl text-neutral-400`)} />
                <Picker.Item style={tailwind("text-xl")} value={"Income"} label={"Income"} />
                <Picker.Item style={tailwind("text-xl")} value={"Expense"} label={"Expense"} />
              </Picker>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Image source={require("../assets/icons8-transaction-list-100.png")} style={styles.icon} />
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
          </View>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Image source={require("../assets/icons8-pay-date-100.png")} style={styles.icon} />
            <View style={tailwind("w-3/4 h-12 mx-auto mt-7 px-2 border-b-2 border-gray-500")}>
              <Pressable style={tailwind("flex-row")} onPress={showDatepicker}>
                <Text style={tailwind("text-xl text-neutral-400")}> {transactionDate.toLocaleString('id-ID')}</Text>
              </Pressable>
            </View>
          </View>

          <Pressable style={tailwind(`bg-[#e9efc0] h-12 w-3/4 mx-auto my-7 px-4 rounded-2xl`)}
            onPress={addTransactionHandler}
          >
            <Text style={tailwind("text-xl text-center my-auto font-bold")}>Save</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView >
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
    marginLeft: 10
  }
})