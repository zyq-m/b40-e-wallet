import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import Button from "../components/Button";

import globals from "../styles/globals";
import QRScanStyle from "../styles/QRScanStyle";

const QRScan = () => {
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
    <View style={globals.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleQRScan}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={QRScanStyle.scanner}>
          <View style={QRScanStyle.row}>
            <Image
              style={[QRScanStyle.square]}
              source={require("../assets/QRScanner.svg")}
            />
            <Image
              style={[QRScanStyle.square, { transform: "scaleX(-1)" }]}
              source={require("../assets/QRScanner.svg")}
            />
          </View>
          <View style={QRScanStyle.row}>
            <Image
              style={[QRScanStyle.square, { transform: "scaleY(-1)" }]}
              source={require("../assets/QRScanner.svg")}
            />
            <Image
              style={[QRScanStyle.square, { transform: "scale(-1)" }]}
              source={require("../assets/QRScanner.svg")}
            />
          </View>
        </View>
      </View>
      <View style={{ paddingBottom: 24 }}>
        <Button label={"Scan again"} />
      </View>
    </View>
  );
};

export default QRScan;
