import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { createContext, useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BarCodeScanner } from "expo-barcode-scanner";

import Login from "./pages/Login";

const Stack = createNativeStackNavigator();
export const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [value, setValue] = useState(null);
  return (
    <UserContext.Provider value={{ value, setValue }}>
      {children}
    </UserContext.Provider>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <ContextProvider>
        <Stack.Navigator
          initialRouteName="login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="dashboard" component={Dashboard} />
          <Stack.Screen name="QRScan" component={QRScanner} />
          <Stack.Screen name="pay" component={Pay} />
        </Stack.Navigator>
      </ContextProvider>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const Loginn = ({ navigation }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [cafeOwner, setCafeOwner] = useState(false);
  const { value, setValue } = useContext(UserContext);

  const handleUserPromise = props => {
    getUser(props)
      .then(res => {
        if (res.exist) {
          setValue(res);
          navigation.navigate("dashboard");
        }
      })
      .catch(() => alert("Invalid account"));
  };

  const handleLogin = () => {
    if (cafeOwner) {
      handleUserPromise({ cafeId: id });
    } else {
      handleUserPromise({ matricNo: id });
    }
  };

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
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginTxt}>Login</Text>
      </TouchableOpacity>
      <Text
        onPress={() => setCafeOwner(!cafeOwner)}
        style={{
          marginTop: 16,
          color: "gray",
          textAlign: "center",
          fontWeight: "500",
        }}
      >
        {cafeOwner ? "Are you a student?" : "Are you a cafe owner?"}
      </Text>
    </View>
  );
};

const Pay = ({ navigation }) => {
  // const [amount, setAmount] = useState(0);
  // const { qrData } = route.params;
  const { value, setValue } = useContext(UserContext);

  const handleTransfer = amount => {
    // get balance from data
    // balance - amount
    // update in firestore
    let balance = value.data.balance - amount;
    updateBalance({ uid: value.id, value: balance })
      .then(() => {
        Alert.alert(
          "Transfer successfully✅",
          "Your e-wallet point will be deducted",
          [{ text: "OK", onPress: () => navigation.navigate("dashboard") }]
        );
      })
      .then(() => {
        setValue({
          data: {
            balance: balance,
            matricNo: value.data.matricNo,
            name: value.data.name,
          },
          exist: value.exist,
          id: value.id,
        });
      })
      .then(() => {
        getCafeBalance({ uid: "oSeP0fjoaYjTLh7vgr7L" })
          .then(res => {
            return res.data().balance;
          })
          .then(balance => {
            let totalBal = parseInt(balance);
            totalBal += parseInt(amount);

            updatCafeBalance({
              uid: "oSeP0fjoaYjTLh7vgr7L",
              value: totalBal,
            }).catch(err => console.error(err));
          });
      })
      .catch(err => console.err(err));
  };

  return (
    <View style={[styles.container, { justifyContent: "center" }]}>
      <Text style={{ fontWeight: "600", color: "gray", textAlign: "center" }}>
        Choose Amount
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 16,
        }}
      >
        <AmountButton amount={1} mr={9} func={() => handleTransfer(1)} />
        <AmountButton amount={2} func={() => handleTransfer(2)} />
      </View>
    </View>
  );
};

const AmountButton = ({ amount, mr, func }) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 12,
        paddingHorizontal: 20,
        // backgroundColor: "black",
        borderWidth: 1,
        borderRadius: rounded,
        marginRight: mr,
      }}
      onPress={func}
    >
      <Text style={{ textAlign: "center", fontWeight: "500" }}>
        RM {amount}
      </Text>
    </TouchableOpacity>
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
  const cafeTransaction = [
    {
      id: 1,
      name: "Ali bin Abu",
      time: "8.00am",
      date: "18 July 2022",
      amount: "+ RM2.00",
    },
    {
      id: 2,
      name: "Ahmad bin Ali",
      time: "12.00pm",
      date: "18 July 2022",
      amount: "+ RM2.00",
    },
    {
      id: 3,
      name: "Aiman",
      time: "5.00pm",
      date: "18 July 2022",
      amount: "+ RM2.00",
    },
  ];
  const { value } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            marginTop: 32,
            flexDirection: "row",
            alignItems: "center",
          }}
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
            <Text style={{ fontSize: 13 }}>{value.data.name}</Text>
            <Text style={{ fontSize: 12, color: "gray" }}>
              {value.data.matricNo || value.data.cafeId}
            </Text>
          </View>
        </View>

        <View style={styles.couponCard}>
          <Text style={{ color: "white", fontSize: 18 }}>e-Wallet</Text>
          <View>
            <Text style={styles.balanceTxt}>
              {value.data.cafeId ? "Total" : "My Balance"}
            </Text>
            <Text style={styles.amountTxt}>RM {value.data.balance}</Text>
          </View>
        </View>
        {value.data.matricNo && (
          <TouchableOpacity
            style={styles.transferBtn}
            onPress={() => navigation.navigate("QRScan")}
          >
            <Text style={{ textAlign: "center", fontWeight: "500" }}>
              Transfer💰
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ flex: 2 }}>
        <Text
          style={{
            marginLeft: 4,
            marginTop: 32,
            marginBottom: 5,
            fontWeight: "500",
            color: "gray",
          }}
        >
          Recent transaction
        </Text>
        {value.data.matricNo
          ? transactionData.map(data => {
              return (
                <Transaction
                  key={data.id}
                  cafe={data.cafe}
                  time={data.time}
                  date={data.date}
                  amount={data.amount}
                />
              );
            })
          : cafeTransaction.map(data => {
              return (
                <Transaction
                  key={data.id}
                  cafe={data.name}
                  time={data.time}
                  date={data.date}
                  amount={data.amount}
                />
              );
            })}
      </View>
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

const rounded = 5;
const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    paddingHorizontal: 14,
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
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
