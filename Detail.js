import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function Detail({ navigation }) {
  const [nama, setNama] = useState("");
  const [plat, setPlat] = useState("");
  const [jenis, setJenis] = useState("");

  const handleCetak = () => {
    if (!nama || !plat || !jenis) {
      alert("Lengkapi semua data kendaraan!");
      return;
    }

    const data = {
      id: "TKT-" + Date.now(),
      nama,
      plat,
      jenis,
      waktuMasuk: new Date().toLocaleString(),
    };

    navigation.navigate("TicketIn", { ticket: data });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Kendaraan</Text>

      <TextInput
        style={styles.input}
        placeholder="Nama Pengguna"
        value={nama}
        onChangeText={setNama}
      />

      <TextInput
        style={styles.input}
        placeholder="Jenis Kendaraan (Mobil / Motor)"
        value={jenis}
        onChangeText={setJenis}
      />

      <TextInput
        style={styles.input}
        placeholder="Nomor Plat (mis. D 1234 XX)"
        value={plat}
        onChangeText={setPlat}
        autoCapitalize="characters"
      />

      <TouchableOpacity style={styles.primaryButton} onPress={handleCetak}>
        <Text style={styles.primaryButtonText}>Cetak Tiket</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: "#F6F8FC",
    paddingHorizontal: 24, paddingTop: 40,
  },
  title: {
    fontSize: 22, fontWeight: "700",
    color: "#1E2A78", marginBottom: 20, textAlign: "center",
  },
  input: {
    backgroundColor: "#fff", borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 10,
    borderWidth: 1, borderColor: "#D0D4E0",
    marginBottom: 14,
  },
  primaryButton: {
    backgroundColor: "#3155FF", paddingVertical: 14,
    borderRadius: 10, alignItems: "center", marginTop: 10,
  },
  primaryButtonText: { color: "#fff", fontSize: 15, fontWeight: "600" },
});
