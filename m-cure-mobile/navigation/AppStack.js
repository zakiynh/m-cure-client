import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Image } from "react-native";

import AddTransaction from "../screen/AddTransaction";
import CustomDrawer from "../components/CustomDrawer";
import ConsultantList from "../screen/ConsultantList";
import ConsultationHistory from "../screen/ConsultationHistory";
import Payment from "../screen/Payment";
import HomeScreen from "../screen/HomeScreen";
import Report from "../screen/Report";
import EditTransaction from "../screen/EditTransaction";
import Chat from "../screen/Chat";
import ReportIncome from "../screen/ReportIncome"
import ReportExpense from "../screen/ReportExpense"

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator()

export default function AppStack() {
  return (
    <>
      <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: "#C2EBA7",
          drawerLabelStyle:
          {
            marginLeft: -20,
            fontSize: 16
          }
        }}>
        <Drawer.Screen name="Home Screen" component={HomeScreen} options={{
          drawerIcon: () => (
            <Image source={require("../assets/icons8-home-page-100.png")} style={{ width: 30, height: 30 }} />
          )
        }} />
        <Drawer.Screen name="Add Transaction" component={AddTransaction} options={{
          drawerIcon: () => (
            <Image source={require("../assets/icons8-general-ledger-100.png")} style={{ width: 30, height: 30 }} />
          )
        }} />
        <Drawer.Screen name="Monthly Report" component={Report} options={{
          drawerIcon: () => (
            <Image source={require("../assets/icons8-pie-chart-100.png")} style={{ width: 30, height: 30 }} />
          )
        }} />
        <Drawer.Screen name="Buy Consultation Ticket" component={Payment} options={{
          drawerIcon: () => (
            <Image source={require("../assets/icons8-ticket-100.png")} style={{ width: 30, height: 30 }} />
          )
        }} />
        <Drawer.Screen name="Consultant List" component={ConsultantList} options={{
          drawerIcon: () => (
            <Image source={require("../assets/icons8-consultant-64.png")} style={{ width: 30, height: 30 }} />
          )
        }} />
        <Drawer.Screen name="Consultation History" component={ConsultationHistory} options={{
          drawerIcon: () => (
            <Image source={require("../assets/icons8-search-chat-100.png")} style={{ width: 30, height: 30 }} />
          )
        }} />

        {/* HIDDEN */}
        <Drawer.Screen name="Edit Transaction" component={EditTransaction}
          options={{
            drawerIcon: () => null,
            drawerLabel: () => null,
            title: undefined,
            drawerActiveBackgroundColor: "#fff",
          }}
        />
        <Drawer.Screen name="Payment" component={Payment}
          options={{
            drawerIcon: () => null,
            drawerLabel: () => null,
            title: undefined,
            drawerActiveBackgroundColor: "#fff",
          }}
        />
        <Drawer.Screen name="Report Income" component={ReportIncome}
          options={{
            drawerIcon: () => null,
            drawerLabel: () => null,
            title: undefined,
            drawerActiveBackgroundColor: "#fff",
          }}
        />
        <Drawer.Screen name="Report Expense" component={ReportExpense}
          options={{
            drawerIcon: () => null,
            drawerLabel: () => null,
            title: undefined,
            drawerActiveBackgroundColor: "#fff",
          }}
        />
      </Drawer.Navigator>
    </>
  )
}