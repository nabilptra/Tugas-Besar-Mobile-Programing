import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import parkIcon from "../assets/tanda_parkir.png";
import carIcon from "../assets/mobbil_biru.png";
import motorIcon from "../assets/motor_biru.png";
import officerIcon from "../assets/orang_biru.png";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>

      <View className="row" style={styles.imageRow}>
        <Image source={parkIcon} style={styles.iconImage} />
        <Image source={carIcon} style={styles.iconImage} />
        <Image source={motorIcon} style={styles.iconImage} />
        <Image source={carIcon} style={styles.iconImage} />
        <Image source={officerIcon} style={styles.iconImage} />
      </View>

      <Text style={styles.title}>Park easier, leave faster</Text>
      <Text style={styles.subtitle}>
        Say goodbye to long lines and slow gates. Our solution makes parking
        quicker, letting you get on with your day.
      </Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate("MasukParkir")}
      >
        <Text style={styles.primaryButtonText}>Masuk Parkir</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate("AIAssistant")}
      >
        <Text style={styles.primaryButtonText}>Parkir AI Assistant</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 45,
  },
  iconImage: {
    width: 55,
    height: 55,
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    color: "#444",
    marginBottom: 55,
  },
  primaryButton: {
    backgroundColor: "#3155FF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },
});
