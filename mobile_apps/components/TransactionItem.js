import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TransactionItem = ({ noBorder, field1, time, date, amount, cafe }) => {
  return (
    <View
      style={[
        transactionItemStyle.transactionItem,
        noBorder ? "" : transactionItemStyle.transactionItemBorder,
      ]}
    >
      <View>
        <Text style={{ fontWeight: "500" }}>{field1}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={transactionItemStyle.transactionSmallTxt}>{time}</Text>
          <Text
            style={[
              transactionItemStyle.transactionSmallTxt,
              { marginLeft: 12 },
            ]}
          >
            {date}
          </Text>
        </View>
      </View>
      <Text style={transactionItemStyle.transactionAmount}>
        {cafe ? "+" : "-"}RM{amount}
      </Text>
    </View>
  );
};

const transactionItemStyle = StyleSheet.create({
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  transactionItemBorder: {
    borderTopColor: "rgba(0, 0, 0, 0.08)",
    borderTopWidth: 1,
  },
  transactionSmallTxt: {
    fontSize: 9,
    color: "rgba(0, 0, 0, 0.47)",
  },
  transactionAmount: {
    fontSize: 12,
    fontWeight: "600",
  },
});

export default TransactionItem;
