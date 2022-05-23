import React from "react";
import { StyleSheet, View, Text, ScrollView, Touchable } from "react-native";
import { VictoryPie } from "victory-native";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TopNav from "../components/TopNav";
import { useIsFocused } from "@react-navigation/native";


if (Platform.OS === "android") {
  require("intl");
  require("intl/locale-data/jsonp/id-ID");
}

export default function Report({ navigation }) {
  const isFocused = useIsFocused()

  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [detailExpense, setDetailExpense] = useState();
  const [detailIncome, setDetailIncome] = useState();
  const [dataExpense, setDataExpense] = useState([]);
  const [dataIncome, setDataIncome] = useState([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("");
  const [sign, setSign] = useState("");

  const { access_token } = useSelector((state) => {
    return state.user;
  });

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

      setExpense(response.data.totalExpenses);
      setIncome(response.data.totalIncome);
      setStatus(response.data.moneyStatus);

      setDetailExpense(JSON.stringify(response.data.expense));
      setDetailIncome(JSON.stringify(response.data.income));
    }

    fetchData();
  }, [total, isFocused]);

  useEffect(() => {
    if (detailIncome && detailExpense) {
      const dataExp = JSON.parse(detailExpense);
      const dataInc = JSON.parse(detailIncome);

      let expenseTemp = [];
      for (const key in dataExp) {
        expenseTemp.push({ x: key, y: dataExp[key].percentage });
      }
      setDataExpense(expenseTemp);

      let incomeTemp = [];
      for (const key in dataInc) {
        incomeTemp.push({ x: key, y: dataInc[key].percentage });
      }
      setDataIncome(incomeTemp);

      const tempTotal = +income - +expense;


      if (tempTotal < 0) {
        setSign("-");
      } else {
        setSign("+");
      }

      setTotal(Math.abs(tempTotal));
    }
  }, [detailExpense, detailIncome]);

  function getstyle(val) {
    if (val === "warning") {
      return { fontSize: 15, color: "#ff4500" };
    } else if (val === "danger") {
      return { fontSize: 15, color: "red" };
    } else {
      return { fontSize: 15, color: "#0000cd" };
    }
  }

  return (
    <ScrollView style={styles.container}>
      <TopNav />
      <View style={{ flex: 1, flexDirection: "row", backgroundColor: "white", height: 350 }}>
        <View style={{ flex: 1, marginLeft: 0 }}>
          <View style={{ alignSelf: "center", marginTop: 20 }}>

            <Text
              onPress={() => {
                navigation.navigate("Report Income")
              }}
              style={{
                alignSelf: "center",
                fontSize: 15,
                fontWeight: "400",
                color: "gray",
              }}
            >
              Income
            </Text>

            <Text style={{ alignSelf: "center", color: "blue" }}>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(income)}</Text>
          </View>
          <VictoryPie
            colorScale={["navy", "cyan", "cornflowerblue", "blue"]}
            data={dataIncome}
            padding={{ top: -132, left: 20, right: 10 }}
            width={200}
          />
        </View>


        <View style={{ borderColor: "lightgrey" }}></View>
        <View>
          <View style={{ alignSelf: "center", marginTop: 20 }}>
            <Text
              onPress={() => {
                navigation.navigate("Report Expense")
              }}
              style={{
                alignSelf: "center",
                fontSize: 15,
                fontWeight: "400",
                color: "gray",
              }}
            >
              Expense
            </Text>
            <Text style={{ alignSelf: "center", color: "red" }}>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(expense)}</Text>
          </View>

          <VictoryPie

            colorScale={["tomato", "orangered", "crimson", "darkorange", "chocolate"]}
            data={dataExpense}
            padding={{ top: -132, left: 10, right: 20 }}
            width={200}
          />
        </View>
      </View>

      <View style={{ flex: 1, marginTop: 20, backgroundColor: "white", paddingTop: 10, paddingBottom: 78 }}>
        <View>
          <Text
            style={{ alignSelf: "center", fontSize: 18, fontWeight: "400" }}
          >
            Report
          </Text>
        </View>

        <View style={{ marginLeft: 25, marginBottom: 15, marginTop: 10 }}>
          <View>
            <Text
              style={{ fontSize: 16, fontWeight: "400", color: "slategray" }}
            >
              Net Income
            </Text>
          </View>

          <View>
            <Text>
              {sign} {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(total)}
            </Text>
          </View>
        </View>

        <View style={{ marginLeft: 25 }}>
          <View>
            <Text
              style={{ fontSize: 16, fontWeight: "400", color: "slategray" }}
            >
              Financial Status
            </Text>
          </View>

          <View>
            <Text style={getstyle(status)}>{status}</Text>
          </View>
        </View>

      </View>

    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "lightgrey",
  },
});


// style={{ color: "grey", flex: 1 }}