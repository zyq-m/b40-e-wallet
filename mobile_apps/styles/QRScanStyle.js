import { StyleSheet } from "react-native";

const QRScanStyle = StyleSheet.create({
  square: {
    width: 24,
    height: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scanner: {
    marginHorizontal: "auto",
    width: "70%",
    height: "60%",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
});

export default QRScanStyle;
