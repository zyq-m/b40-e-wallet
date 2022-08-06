import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import CafeDashboard from "./pages/CafeDashboard";
import PayNow from "./pages/PayNow";
import QRScan from "./pages/QRScan";
import Transaction from "./pages/Transaction";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Transactions"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="studentDashboard" component={StudentDashboard} />
        <Stack.Screen name="cafeDashboard" component={CafeDashboard} />
        <Stack.Screen name="payNow" component={PayNow} />
        <Stack.Screen
          name="QR Scan"
          component={QRScan}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Transactions"
          component={Transaction}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
