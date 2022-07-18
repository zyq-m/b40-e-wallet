import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BarCodeScanner } from "expo-barcode-scanner";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="dashboard"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="dashboard" component={Dashboard} />
        <Stack.Screen name="QRScan" component={QRScanner} />
        <Stack.Screen name="pay" component={Pay} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Pay = ({ route }) => {
  const [amount, setAmount] = useState(0);
  const { qrData } = route.params;

  return (
    <View style={[styles.container, { justifyContent: "center" }]}>
      <View>
        <Text style={{ fontWeight: "600", color: "gray" }}>Enter Amount</Text>
        <View
          style={{
            paddingVertical: 8,
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 1,
          }}
        >
          {amount > 0.01 && (
            <Text style={{ marginRight: 4, fontSize: 24, fontWeight: "800" }}>
              RM
            </Text>
          )}
          <TextInput
            style={{
              flex: 1,
              fontSize: 24,
              fontWeight: "800",
            }}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0.00"
          />
        </View>
      </View>
    </View>
  );
};

const QRScanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const handlePermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    if (status === "granted") {
      setHasPermission(true);
    }
  };

  const handleQRScan = ({ data }) => {
    setScanned(true);
    navigation.navigate("pay", { qrData: data });
  };

  useEffect(() => {
    handlePermission();
  }, []);

  return (
    <View style={{ flex: 1, paddingHorizontal: 14, paddingBottom: 20 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleQRScan}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            borderWidth: 1.5,
            borderColor: "white",
            width: 180,
            height: 200,
          }}
        ></View>
      </View>
      <View style={{ justifyContent: "flex-end" }}>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            backgroundColor: "black",
            borderRadius: rounded,
          }}
          onPress={() => setScanned(!scanned)}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "500" }}
          >
            Scan Again
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Dashboard = ({ navigation }) => {
  const transactionData = [
    {
      id: 1,
      cafe: "Kafe Mamada",
      time: "8.00am",
      date: "18 July 2022",
      amount: "- RM2.00",
    },
    {
      id: 2,
      cafe: "Kafe Tok Ma",
      time: "12.00pm",
      date: "18 July 2022",
      amount: "- RM2.00",
    },
    {
      id: 3,
      cafe: "Kafe Mamada",
      time: "5.00pm",
      date: "18 July 2022",
      amount: "- RM2.00",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View
          style={{ marginTop: 15, flexDirection: "row", alignItems: "center" }}
        >
          <View
            style={{
              marginRight: 8,
              width: 34,
              height: 34,
              borderRadius: 999,
              backgroundColor: "gray",
            }}
          ></View>
          <View>
            <Text style={{ fontSize: 13 }}>Ahmad bin Ali</Text>
            <Text style={{ fontSize: 12, color: "gray" }}>012345</Text>
          </View>
        </View>
        <View style={styles.couponCard}>
          <Text style={{ color: "white", fontSize: 18 }}>e-Wallet</Text>
          <View>
            <Text style={styles.balanceTxt}>My Balance</Text>
            <Text style={styles.amountTxt}>RM 150.00</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.transferBtn}
          onPress={() => navigation.navigate("QRScan")}
        >
          <Text style={{ textAlign: "center", fontWeight: "500" }}>
            Transfer💰
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 2 }}>
        <Text
          style={{
            marginTop: 32,
            marginBottom: 5,
            fontWeight: "500",
            color: "gray",
          }}
        >
          Recent transaction
        </Text>
        {transactionData.map(data => {
          return (
            <Transaction
              key={data.id}
              cafe={data.cafe}
              time={data.time}
              date={data.date}
              amount={data.amount}
            />
          );
        })}
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const Transaction = ({ cafe, time, date, amount }) => {
  return (
    <View style={styles.transactionCard}>
      <View>
        <Text style={{ marginBottom: 6, fontSize: 17, fontWeight: "500" }}>
          {cafe}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.timeTxt}>{time}</Text>
          <Text style={styles.timeTxt}>{date}</Text>
        </View>
      </View>
      <Text style={{ fontWeight: "800" }}>{amount}</Text>
    </View>
  );
};

const Login = ({ navigation }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [cafeOwner, setCafeOwner] = useState(false);

  return (
    <View style={styles.loginContainer}>
      <View style={{ marginBottom: 16 }}>
        {cafeOwner ? (
          <>
            <Text>Cafe Id</Text>
            <TextInput style={styles.input} onChangeText={setId} />
          </>
        ) : (
          <>
            <Text>Matric No.</Text>
            <TextInput
              style={styles.input}
              onChangeText={setId}
              placeholder="012345"
            />
          </>
        )}
      </View>
      <View style={{ marginBottom: 32 }}>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate("dashboard")}
      >
        <Text style={styles.loginTxt}>Login</Text>
      </TouchableOpacity>
      <Text
        onPress={() => setCafeOwner(!cafeOwner)}
        style={{ marginTop: 16, color: "gray", textAlign: "center" }}
      >
        Are you a cafe owner?
      </Text>
    </View>
  );
};

const rounded = 5;
const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    paddingHorizontal: 14,
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(245, 245, 245)",
  },
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 32,
    backgroundColor: "rgb(245, 245, 245)",
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: rounded,
  },
  loginBtn: {
    paddingVertical: 16,
    backgroundColor: "black",
    borderRadius: rounded,
  },
  loginTxt: {
    textAlign: "center",
    fontWeight: "500",
    color: "white",
  },
  couponCard: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: rounded * 4,
    backgroundColor: "black",
  },
  balanceTxt: {
    fontSize: 13,
    color: "gray",
  },
  amountTxt: {
    fontSize: 28,
    fontWeight: "500",
    color: "white",
  },
  transferBtn: {
    marginTop: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: rounded * 4,
    backgroundColor: "white",
  },
  transactionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    padding: 16,
    borderRadius: rounded * 2,
    backgroundColor: "white",
  },
  timeTxt: {
    marginRight: 8,
    color: "gray",
    fontSize: 11,
  },
});
