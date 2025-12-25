import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./components/Home";
import MasukParkir from "./components/MasukParkir";
import Detail from "./components/Detail";
import TicketIn from "./components/TicketIn";
import TicketOut from "./components/TicketOut";
import Payment from "./components/Payment";
import AIAssistant from "./components/AIAssistant";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#1E2A78" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="Home" component={Home} options={{ title: "Smart Parkir" }} />
        <Stack.Screen name="MasukParkir" component={MasukParkir} options={{ title: "Masuk Parkir" }}/>
        <Stack.Screen name="Detail" component={Detail} options={{ title: "Data Kendaraan" }} />
        <Stack.Screen name="TicketIn" component={TicketIn} options={{ title: "Tiket Masuk" }} />
        <Stack.Screen name="TicketOut" component={TicketOut} options={{ title: "Tiket Keluar" }} />
        <Stack.Screen name="Payment" component={Payment} options={{ title: "Pembayaran" }} />
        <Stack.Screen name="AIAssistant" component={AIAssistant} options={{ title: "Parkir AI Assistant" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
