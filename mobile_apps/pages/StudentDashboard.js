import React from "react";
import { View, Text, Image } from "react-native";

import Button from "../components/Button";
import Profile from "../components/Profile";
import Amount from "../components/Amount";
import TransactionContainer from "../components/TransactionContainer";
import TransactionItem from "../components/TransactionItem";

import globals from "../styles/globals";
import dashboardStyle from "../styles/dashboardStyle";

const StudentDashboard = () => {
  return (
    <View style={[globals.container, { paddingTop: 22 }]}>
      <View style={dashboardStyle.logoutContainer}>
        <Profile textField1={"Muhd Ali bin Abu"} textField2={"012345"} />
        <Image
          style={dashboardStyle.logoutIcon}
          source={require("../assets/icons/logout-icon.svg")}
        />
      </View>
      <View style={{ marginTop: 24 }}>
        <Amount amount={150} student={true} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button label={"Pay"} />
      </View>
      <View style={{ marginTop: 40 }}>
        <View style={[dashboardStyle.transactionHeaderWrap]}>
          <Text style={dashboardStyle.transactionHeader}>
            Recent transaction
          </Text>
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../assets/icons/more-icon.svg")}
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
