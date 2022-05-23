import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { VictoryPie } from "victory-native";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

if (Platform.OS === "android") {
  require("intl");
  require("intl/locale-data/jsonp/id-ID");
}

export default function ReportExpense() {
  const [expense, setExpense] = useState(0);
  const [detailExpense, setDetailExpense] = useState();
  const [dataExpense, setDataExpense] = useState([]);
  const [dataExpenseCategories, setDataExpenseCategories] = useState([]);

  const { access_token } = useSelector((state) => {
    return state.user
  })

  const header = () => {
    return (
      <>
        <View style={{ alignSelf: "center" }}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "500",
              color: "gray",
            }}
          >
            Expense
          </Text>
          <Text style={{
            alignSelf: "center",
            color: "red",
            fontSize: 18,
            fontWeight: "500"
          }}>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(expense)}
          </Text>
        </View>

        <View style={{ marginLeft: 0, marginTop: -50, marginBottom: -50 }}>
          <VictoryPie
            colorScale={["tomato", "orangered", "crimson", "darkorange", "chocolate"]}
            padding={100}
            data={dataExpense}
            width={400}
          />
        </View>

        <View style={{
          color: "blue",
          borderTopWidth: 30,
          borderTopColor: "lightgrey",
          marginBottom: 20
        }}
        >

        </View>

      </>
    )
  }


  const renderItem = ({ item }) => (
    <>
      <View
        style={{
          marginVertical: 3,
          marginLeft: 10,
          flex: 1,
          justifyContent: "center",
          alignSelf: "center",
          flexDirection: "row",
          height: 40,
        }}
      >
        <View style={{ flex: 2 }}>
          <Image
            style={{
              borderRadius: 60,
              flex: 1,
              resizeMode: "contain",
              width: 60,
            }}
            source={{ uri: item.icon }}
          />
        </View>

        <View style={{ flex: 6, paddingVertical: 10 }}>
          <Text>
            {item.category} ({item.percentage} %)
          </Text>
        </View>

        <View style={{ flex: 3.8, paddingVertical: 10 }}>
          <Text style={{ color: "red" }}>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(item.total)}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginLeft: 80,
          marginRight: 10,
          flex: 1,
          justifyContent: "center",
          flexDirection: "row",
          borderTopWidth: 0.5,
          borderTopColor: "grey",
        }}
      >
        <Text> </Text>
      </View>
    </>
  );

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(
        "https://m-cure-postgres.herokuapp.com/users/transactions/report",
        {
          headers: {
            access_token,
          },
        }
      );

      console.log("masukzxs");
      setExpense(response.data.totalExpenses);
      setDetailExpense(JSON.stringify(response.data.expense));

      console.log("LOG at useEffect 101");
    }

    fetchData();
  }, []);


  useEffect(() => {
    if (detailExpense) {
      async function fetchDetailReport() {

        const dataExp = JSON.parse(detailExpense);

        let expenseTemp = [];
        for (const key in dataExp) {
          expenseTemp.push({ x: key, y: dataExp[key]["total"] });
        }
        setDataExpense(expenseTemp);

        console.log(dataExpense, "ass5dsaasdd");

        const { data } = await axios.get(
          "https://m-cure-postgres.herokuapp.com/categories"
        );

        const dataCategories = data.data.expenseCategories;

        let tempCategories = [];

        let percentage = [];

        for (const key in dataExp) {
          percentage.push(dataExp[key]["percentage"]);
        }

        for (let i = 0; i < dataCategories.length; i++) {
          const el1 = dataCategories[i];

          for (let j = 0; j < expenseTemp.length; j++) {
            const el2 = expenseTemp[j];
            if (el1.type === el2.x) {
              tempCategories.push({
                id: el1.id,
                category: el2.x,
                total: el2.y,
                icon: el1.icon,
                percentage: percentage[j].toFixed(2),
              });
              break;
            }
          }
        }

        setDataExpenseCategories(tempCategories);

        console.log(tempCategories);

      }

      fetchDetailReport()

    }
  }, [detailExpense]);

  //{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(expense)}

  return (
    <View style={{ color: "blue", flex: 1 }}>

      <View
        style={{
          color: "blue",
          borderTopWidth: 0,
          borderTopColor: "lightgrey",
        }}
      >
        <FlatList
          ListHeaderComponent={header}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 10,
          }}
          numColumns={1}
          data={dataExpenseCategories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

    </View>
  );
}


