// components/TicketOut.js
import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import QRCode from "react-native-qrcode-svg";

function calcFee(waktuMasukISO, waktuKeluarISO, jenis) {
  const masuk = new Date(waktuMasukISO);
  const keluar = new Date(waktuKeluarISO);

  const diffMs = Math.max(0, keluar - masuk);
  const hours = Math.ceil(diffMs / (1000 * 60 * 60)) || 1;

  const ratePerHour = jenis.toLowerCase().includes("mobil") ? 3000 : 2000;
  return { hours, ratePerHour, fee: hours * ratePerHour };
}

export default function TicketOut({ route, navigation }) {
  const { ticket } = route.params;

  const waktuKeluar = new Date();
  const waktuKeluarStr = waktuKeluar.toLocaleString();
  const waktuKeluarISO = waktuKeluar.toISOString();

  // FIX: gunakan waktuMasukISO (JANGAN parse ulang waktuMasuk)
  const waktuMasukISO = ticket.waktuMasukISO;

  const jenisKendaraan = ticket.jenis || "";

  const { hours, ratePerHour, fee } = useMemo(
    () => calcFee(waktuMasukISO, waktuKeluarISO, jenisKendaraan),
    [waktuMasukISO, waktuKeluarISO, jenisKendaraan]
  );

  const handleBayar = () => {
    navigation.navigate("Payment", {
      paymentDetails: {
        ticketId: ticket.id,
        nama: ticket.nama,
        plat: ticket.plat,
        jenis: ticket.jenis,
        waktuMasuk: ticket.waktuMasuk,
        waktuKeluar: waktuKeluarStr,
        durationHours: hours,
        ratePerHour,
        amount: fee,
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tiket Keluar</Text>

      <View style={styles.card}>
        <View style={styles.qrRow}>
          <QRCode
            value={JSON.stringify({
              id: ticket.id,
              type: "out",
              waktuKeluar: waktuKeluarISO,
            })}
            size={140}
          />
        </View>

        <Text style={styles.label}>ID Tiket: <Text style={styles.value}>{ticket.id}</Text></Text>
        <Text style={styles.label}>Nama: <Text style={styles.value}>{ticket.nama}</Text></Text>
        <Text style={styles.label}>Plat: <Text style={styles.value}>{ticket.plat}</Text></Text>
        <Text style={styles.label}>Jenis: <Text style={styles.value}>{ticket.jenis}</Text></Text>
        <Text style={styles.label}>Waktu Masuk: <Text style={styles.value}>{ticket.waktuMasuk}</Text></Text>
        <Text style={styles.label}>Waktu Keluar: <Text style={styles.value}>{waktuKeluarStr}</Text></Text>
        <Text style={styles.label}>Durasi: <Text style={styles.value}>{hours} jam</Text></Text>
        <Text style={styles.label}>Tarif: <Text style={styles.value}>Rp {ratePerHour.toLocaleString()}/jam</Text></Text>

        <Text style={[styles.label, { marginTop: 8 }]}>
          Total: <Text style={[styles.value, { fontSize: 18 }]}>Rp {fee.toLocaleString()}</Text>
        </Text>

        <TouchableOpacity style={styles.primaryButton} onPress={handleBayar}>
          <Text style={styles.primaryButtonText}>Bayar</Text>
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
  primaryButton: {
    backgroundColor: "#3155FF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  primaryButtonText: { color: "#fff", fontWeight: "700" },
});
