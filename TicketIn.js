// components/TicketIn.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import QRCode from "react-native-qrcode-svg";
export default function TicketIn({ route, navigation }) {
  const { ticket } = route.params;

  if (!ticket) {
    return (
      <View style={styles.container}>
        <Text>Tidak ada data tiket.</Text>
      </View>
    );
  }

  const handleParkirSelesai = () => {
    // Pass ticket to TicketOut; TicketOut will compute waktu keluar & biaya
    navigation.navigate("TicketOut", { ticket });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tiket Masuk</Text>

      <View style={styles.card}>
        <View style={styles.qrRow}>
          <QRCode value={JSON.stringify({ id: ticket.id, type: "in" })} size={140} />
        </View>

        <Text style={styles.label}>ID Tiket: <Text style={styles.value}>{ticket.id}</Text></Text>
        <Text style={styles.label}>Nama: <Text style={styles.value}>{ticket.nama}</Text></Text>
        <Text style={styles.label}>Plat: <Text style={styles.value}>{ticket.plat}</Text></Text>
        <Text style={styles.label}>Jenis: <Text style={styles.value}>{ticket.jenis}</Text></Text>
        <Text style={styles.label}>Waktu Masuk: <Text style={styles.value}>{ticket.waktuMasuk}</Text></Text>

        <Text style={styles.note}>Simpan tiket ini. QR akan digunakan saat keluar.</Text>

        <TouchableOpacity style={styles.primaryButton} onPress={handleParkirSelesai}>
          <Text style={styles.primaryButtonText}>Parkir Selesai</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F6F8FC",
    padding: 24,
    alignItems: "center",
    paddingTop: 40,
  },
  title: { fontSize: 22, fontWeight: "700", color: "#1E2A78", marginBottom: 12 },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    elevation: 3,
  },
  qrRow: { alignItems: "center", marginBottom: 12 },
  label: { marginTop: 8, fontSize: 14, color: "#333" },
  value: { fontWeight: "600", color: "#111" },
  note: { marginTop: 12, fontSize: 12, color: "#666" },
  primaryButton: {
    backgroundColor: "#3155FF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  primaryButtonText: { color: "#fff", fontWeight: "700" },
});
