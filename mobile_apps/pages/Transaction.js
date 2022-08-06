import React from "react";
import { View, StyleSheet } from "react-native";

import TransactionItem from "../components/TransactionItem";

import globals from "../styles/globals";

const data = [
  {
    id: 1,
    noMatric: "012345",
    time: "8.00am",
    date: "9 July 2022",
    amount: "2.00",
  },
  {
    id: 2,
    noMatric: "012345",
    time: "8.00am",
    date: "9 July 2022",
    amount: "2.00",
  },
  {
    id: 3,
    noMatric: "012345",
    time: "8.00am",
    date: "9 July 2022",
    amount: "2.00",
  },
];

const Transaction = () => {
  return (
    <View style={[globals.container, { paddingTop: 24 }]}>
      {data.map(transaction => {
        return (
          <Wrapper key={transaction.id}>
            <TransactionItem
              field1={transaction.noMatric}
              time={transaction.time}
              date={transaction.date}
              amount={transaction.amount}
              cafe={true}
              noBorder={true}
            />
          </Wrapper>
        );
      })}
    </View>
  );
};

const Wrapper = ({ children }) => {
  return <View style={transactionStyle.transactionItemWrap}>{children}</View>;
};

const transactionStyle = StyleSheet.create({
  transactionItemWrap: {
    marginTop: 6,
    borderRadius: 9,
    borderColor: "rgba(0, 0, 0, 0.08)",
    borderWidth: 1,
    overflow: "hidden",
  },
});

export default Transaction;
