<<<<<<< HEAD
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
=======
import { View, Text, Image } from "react-native";
>>>>>>> 2486dbdccc412994c493f05d6ff09f668cca0c39

import Button from "../components/Button";
import Profile from "../components/Profile";
import Amount from "../components/Amount";
import TransactionContainer from "../components/TransactionContainer";
import TransactionItem from "../components/TransactionItem";

import globals from "../styles/globals";
import dashboardStyle from "../styles/dashboardStyle";

const StudentDashboard = ({ navigation }) => {
  return (
    <View style={[globals.container, { paddingTop: 48 }]}>
      <View style={dashboardStyle.logoutContainer}>
        <Profile textField1={"Muhd Ali bin Abu"} textField2={"012345"} />
<<<<<<< HEAD
        <TouchableOpacity onPress={() => navigation.navigate("login")}>
          <Image
            style={dashboardStyle.logoutIcon}
            source={require("../assets/icons/logout-icon.svg")}
          />
        </TouchableOpacity>
=======
        <Image
          style={dashboardStyle.logoutIcon}
          source={require("../assets/icons/logout-icon.png")}
        />
>>>>>>> 2486dbdccc412994c493f05d6ff09f668cca0c39
      </View>
      <View style={{ marginTop: 24 }}>
        <Amount amount={150} student={true} />
      </View>
      <View style={{ marginTop: 20 }}>
<<<<<<< HEAD
        <Button label={"Pay"} onAction={() => navigation.navigate("QR Scan")} />
=======
        <Button label={"Pay"} onPress={() => navigation.navigate("Pay Now")} />
>>>>>>> 2486dbdccc412994c493f05d6ff09f668cca0c39
      </View>
      <View style={{ marginTop: 40 }}>
        <View style={[dashboardStyle.transactionHeaderWrap]}>
          <Text style={dashboardStyle.transactionHeader}>
            Recent transaction
          </Text>
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../assets/icons/more-icon.png")}
          />
        </View>
        <TransactionContainer>
          <TransactionItem
            field1={"Kafe Mamada"}
            time={"8.00am"}
            date={"9 July 2022"}
            amount={"2.00"}
            noBorder={true}
          />
          <TransactionItem
            field1={"Kafe Mamada"}
            time={"8.00am"}
            date={"9 July 2022"}
            amount={"2.00"}
          />
          <TransactionItem
            field1={"Kafe Mamada"}
            time={"8.00am"}
            date={"9 July 2022"}
            amount={"2.00"}
          />
        </TransactionContainer>
      </View>
    </View>
  );
};

export default StudentDashboard;
