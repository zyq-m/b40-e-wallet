import React from "react";
import { View, Text, Image } from "react-native";

import globals from "../styles/globals";
import Profile from "../components/Profile";
import Amount from "../components/Amount";
import TransactionContainer from "../components/TransactionContainer";
import TransactionItem from "../components/TransactionItem";

import dashboardStyle from "../styles/dashboardStyle";

const CafeDashboard = () => {
  return (
    <View style={[globals.container, { paddingTop: 48 }]}>
      <View style={dashboardStyle.logoutContainer}>
        <Profile textField1={"Kafe Mamada"} textField2={"mamada69"} />
        <Image
          style={dashboardStyle.logoutIcon}
          source={require("../assets/icons/logout-icon.png")}
        />
      </View>
      <View style={{ marginTop: 24 }}>
        <Amount amount={4} student={false} />
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
            field1={"012345"}
            time={"8.00am"}
            date={"9 July 2022"}
            amount={"2.00"}
            noBorder={true}
            cafe={true}
          />
          <TransactionItem
            field1={"012345"}
            time={"8.00am"}
            date={"9 July 2022"}
            amount={"2.00"}
            cafe={true}
          />
          <TransactionItem
            field1={"012345"}
            time={"8.00am"}
            date={"9 July 2022"}
            amount={"2.00"}
            cafe={true}
          />
          <TransactionItem
            field1={"012345"}
            time={"8.00am"}
            date={"9 July 2022"}
            amount={"2.00"}
            cafe={true}
          />
        </TransactionContainer>
      </View>
    </View>
  );
};

export default CafeDashboard;
