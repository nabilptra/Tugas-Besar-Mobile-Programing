// components/MasukParkir.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function MasukParkir({ navigation }) {
  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState("");
  const [plat, setPlat] = useState("");

  const handleCetak = () => {
    if (!nama || !jenis || !plat) {
      alert("Semua data wajib diisi!");
      return;
    }

    navigation.navigate("TicketIn", {
      ticket: {
        id: Date.now().toString(),
        nama,
        jenis,
        plat,
        waktuMasuk: new Date().toLocaleString(),     // untuk ditampilkan
        waktuMasukISO: new Date().toISOString(),     // untuk perhitungan
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Pengunjung</Text>

      <Text style={styles.label}>Nama</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan nama"
        value={nama}
        onChangeText={setNama}
      />

      <Text style={styles.label}>Jenis Kendaraan</Text>
      <TextInput
        style={styles.input}
        placeholder="Mobil / Motor"
        value={jenis}
        onChangeText={setJenis}
      />

      <Text style={styles.label}>Plat Kendaraan</Text>
      <TextInput
        style={styles.input}
        placeholder="D 1234 XX"
        value={plat}
        onChangeText={setPlat}
        autoCapitalize="characters"
      />

      <TouchableOpacity style={styles.button} onPress={handleCetak}>
        <Text style={styles.buttonText}>Cetak Tiket</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#3155FF",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#3155FF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
