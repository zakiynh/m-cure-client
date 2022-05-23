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

if (Platform.OS === "android") {
  require("intl");
  require("intl/locale-data/jsonp/id-ID");
}

export default function ReportIncome() {
  const [income, setIncome] = useState(0);
  const [detailIncome, setDetailIncome] = useState();
  const [dataIncome, setDataIncome] = useState([]);
  const [dataIncomeCategories, setDataIncomeCategories] = useState([]);

  // const { access_token } = useSelector((state) => {
  //   return state.user; marginVertical: 10,  (percentage[j]).toFixed(2)
  // }); , marginRight: 10 .

  const header = () => {
    return (
      <>
        <View style={{ alignSelf: "center"}}>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 18,
            fontWeight: "500",
            color: "gray",
          }}
        >
          Income
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
          }).format(income)}
        </Text>
      </View>

      <View style={{ marginLeft: 0, marginTop: -50, marginBottom: -50}}>
        <VictoryPie
          colorScale={["tomato", "orangered", "crimson", "darkorange", "chocolate"]}
          padding={100}
          data={dataIncome}
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
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJkZWJieUBtYWlsLmNvbSIsImlhdCI6MTY1MzI5Mzc5NiwiZXhwIjoxNjUzMzE1Mzk2fQ.CW0zxMdWWrhnTDnrQfz32lrE6upZXgUQRNms5lmpVww",
          },
        }
      );

      console.log("masukzx");
      setIncome(response.data.totalIncome);
      setDetailIncome(JSON.stringify(response.data.income));
     
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (detailIncome) {
      async function fetchDetailReport () {

        const dataInc = JSON.parse(detailIncome);

        let incomeTemp = [];
        for (const key in dataInc) {
          incomeTemp.push({ x: key, y: dataInc[key]["total"] });
        }
        setDataIncome(incomeTemp);
  
        console.log(dataIncome, "assdsad");
  
        const { data } = await axios.get(
          "https://m-cure-postgres.herokuapp.com/categories"
        );
  
        const dataCategories = data.data.incomeCategories;
  
        let tempCategories = [];
  
        let percentage = []
  
        for (const key in dataInc) {
          percentage.push(dataInc[key]["percentage"]);
        }
  
        for (let i = 0; i < dataCategories.length; i++) {
          const el1 = dataCategories[i];
  
          for (let j = 0; j < incomeTemp.length; j++) {
            const el2 = incomeTemp[j];
            if (el1.type === el2.x) {
              tempCategories.push({
                id: el1.id,
                category: el2.x,
                total: el2.y,
                icon: el1.icon,
                percentage: (percentage[j]).toFixed(2)
              });
              break;
            }
          }
        }
  
        setDataIncomeCategories(tempCategories);
  
        console.log(tempCategories);

      }

      fetchDetailReport()
      
    }
  }, [detailIncome]);

  //{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(expense)}

  return (
    <View style={{ color: "blue", flex: 1}}>
    
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
          data={dataIncomeCategories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

    </View>
  );
}

// import React from "react";
// import { StyleSheet, View, Text, ScrollView, FlatList, Image } from "react-native";
// import { VictoryPie } from "victory-native";
// import axios from "axios";
// import { useState, useEffect } from "react";

// if (Platform.OS === "android") {
//   require("intl");
//   require("intl/locale-data/jsonp/id-ID");
// }


// export default function ReportIncome() {
//   const [income, setIncome] = useState(0);
//   const [detailIncome, setDetailIncome] = useState();
//   const [dataIncome, setDataIncome] = useState([]);
//   const [dataIncomeCategories, setDataIncomeCategories] = useState([]);

//   // const { access_token } = useSelector((state) => {
//   //   return state.user; marginVertical: 10,  (percentage[j]).toFixed(2)
//   // }); , marginRight: 10 .

//   const renderItem = ({ item }) => (
//     <>
//     <View style={{marginVertical: 3, marginLeft: 10, flex: 1,  justifyContent: "center", alignSelf: "center", flexDirection: "row", height: 40}}>
//       <View style={{flex: 2}}>
//         <Image
//             style={{borderRadius: 60, flex: 1, resizeMode: "contain", width: 60 }}
//             source={{uri: item.icon}}
//         />
//       </View>
      
//       <View style={{flex: 6, paddingVertical: 10}}>
//         <Text>{item.category} ({item.percentage} %)</Text>
//       </View>

//       <View style={{flex: 3.8, paddingVertical: 10}}>
//         <Text style={{color: "blue"}}>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.total)}</Text>
//       </View>

      

//     </View>
//     <View style={{marginLeft: 80, marginRight: 10, flex: 1,  justifyContent: "center", flexDirection: "row", borderTopWidth: 0.5, borderTopColor: "grey" }}>
//       <Text> </Text>
//     </View>
    
//     </>
//   );

//   useEffect(() => {
//     async function fetchData() {
//       let response = await axios.get(
//         "https://m-cure-postgres.herokuapp.com/users/transactions/report",
//         {
//           headers: {
//             access_token:
//               "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJkZWJieUBtYWlsLmNvbSIsImlhdCI6MTY1MzI5Mzc5NiwiZXhwIjoxNjUzMzE1Mzk2fQ.CW0zxMdWWrhnTDnrQfz32lrE6upZXgUQRNms5lmpVww",
//           },
//         }
//       );

//       console.log("masukzx");
//       setIncome(response.data.totalIncome);
//       setDetailIncome(JSON.stringify(response.data.income));
     
//     }

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (detailIncome) {
//       async function fetchDetailReport () {

//         const dataInc = JSON.parse(detailIncome);

//         let incomeTemp = [];
//         for (const key in dataInc) {
//           incomeTemp.push({ x: key, y: dataInc[key]["total"] });
//         }
//         setDataIncome(incomeTemp);
  
//         console.log(dataIncome, "assdsad");
  
//         const { data } = await axios.get(
//           "https://m-cure-postgres.herokuapp.com/categories"
//         );
  
//         const dataCategories = data.data.incomeCategories;
  
//         let tempCategories = [];
  
//         let percentage = []
  
//         for (const key in dataInc) {
//           percentage.push(dataInc[key]["percentage"]);
//         }
  
//         for (let i = 0; i < dataCategories.length; i++) {
//           const el1 = dataCategories[i];
  
//           for (let j = 0; j < incomeTemp.length; j++) {
//             const el2 = incomeTemp[j];
//             if (el1.type === el2.x) {
//               tempCategories.push({
//                 id: el1.id,
//                 category: el2.x,
//                 total: el2.y,
//                 icon: el1.icon,
//                 percentage: (percentage[j]).toFixed(2)
//               });
//               break;
//             }
//           }
//         }
  
//         setDataIncomeCategories(tempCategories);
  
//         console.log(tempCategories);

//       }

//       fetchDetailReport()
      
//     }
//   }, [detailIncome]);


//   //{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(income)}

//   return (
//     <ScrollView style={{ color: "blue", flex: 1 }}>


//       <View style={{ alignSelf: "center", marginTop: 20 }}>
//         <Text
//           style={{
//             alignSelf: "center",
//             fontSize: 18,
//             fontWeight: "500",
//             color: "gray",
//           }}
//         >
//           Income
//         </Text>
//         <Text style={{ 
//             alignSelf: "center", 
//             color: "blue", 
//             fontSize: 18,
//             fontWeight: "500"
//         }}>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(income)}</Text>
//       </View>

//       <View style={{  marginLeft: 0, marginTop: -30 }}>
//         <VictoryPie
//           colorScale={["cyan", "navy", "tomato", "gold"]}
//           data={dataIncome}
//           width={400}
//           padding={100}
//         />
//       </View>

//       <View style={{ color: "blue", borderTopWidth: 30, borderTopColor: "lightgrey"}}>
//         <FlatList
//           contentContainerStyle={{
//             marginTop: 10,
//             paddingBottom: 10,
//           }}
//           numColumns={1}
//           data={dataIncomeCategories}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id}
//         />
//       </View>


//     </ScrollView>
//   );
// }


