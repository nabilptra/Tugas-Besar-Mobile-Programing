// components/Payment.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Pressable,
} from "react-native";

const banks = [
  { id: "bca", label: "BCA", asset: require("../assets/BCA.png") },
  { id: "bri", label: "BRI", asset: require("../assets/BRI.png") },
  { id: "mandiri", label: "Mandiri", asset: require("../assets/Mandiri.png") },
  { id: "bni", label: "BNI", asset: require("../assets/BNI.png") },
];

const ewallets = [
  { id: "dana", label: "DANA", asset: require("../assets/DANA.png") },
  { id: "ovo", label: "OVO", asset: require("../assets/OVO.png") },
  { id: "gopay", label: "GoPay", asset: require("../assets/Gopay.png") },
  { id: "shopeepay", label: "ShopeePay", asset: require("../assets/ShopeePay.png") },
];

export default function Payment({ route, navigation }) {
  const { paymentDetails } = route.params;
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSelect = (method) => {
    setSelected(method);
    setShowModal(true);
  };

  const handleConfirmPay = () => {
    // Simulasi sukses pembayaran
    setShowModal(false);
    setSuccess(true);

    setTimeout(() => {
      // Kembali ke Home setelah sukses, atau arahkan sesuai kebutuhan
      navigation.popToTop();
    }, 1400);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pembayaran</Text>

      <View style={styles.card}>
        <Text style={styles.label}>ID Tiket: <Text style={styles.value}>{paymentDetails.ticketId}</Text></Text>
        <Text style={styles.label}>Plat: <Text style={styles.value}>{paymentDetails.plat}</Text></Text>
        <Text style={styles.label}>Jenis: <Text style={styles.value}>{paymentDetails.jenis}</Text></Text>
        <Text style={styles.label}>Masuk: <Text style={styles.value}>{paymentDetails.waktuMasuk}</Text></Text>
        <Text style={styles.label}>Keluar: <Text style={styles.value}>{paymentDetails.waktuKeluar}</Text></Text>

        <Text style={[styles.label, { marginTop: 12 }]}>Total Bayar: <Text style={[styles.value, { fontSize: 18 }]}>Rp {paymentDetails.amount.toLocaleString()}</Text></Text>
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Pilih Bank</Text>
      <FlatList
        horizontal
        data={banks}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.methodItem} onPress={() => handleSelect(item)}>
            <Image source={item.asset} style={styles.methodLogo} />
            <Text style={styles.methodLabel}>{item.label}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={[styles.sectionTitle, { marginTop: 12 }]}>E-Wallet</Text>
      <FlatList
        horizontal
        data={ewallets}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.methodItem} onPress={() => handleSelect(item)}>
            <Image source={item.asset} style={styles.methodLogo} />
            <Text style={styles.methodLabel}>{item.label}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />

      {/* Modal Confirm */}
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Konfirmasi Pembayaran</Text>
            {selected && (
              <>
                <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 12 }}>
                  <Image source={selected.asset} style={{ width: 56, height: 56, resizeMode: "contain", marginRight: 12 }} />
                  <View>
                    <Text style={{ fontWeight: "700" }}>{selected.label}</Text>
                    <Text style={{ color: "#666" }}>Rp {paymentDetails.amount.toLocaleString()}</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.payButton} onPress={handleConfirmPay}>
                  <Text style={{ color: "#fff", fontWeight: "700" }}>Bayar Sekarang</Text>
                </TouchableOpacity>

                <Pressable style={{ marginTop: 10 }} onPress={() => setShowModal(false)}>
                  <Text style={{ textAlign: "center", color: "#3155FF" }}>Batal</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Success message */}
      {success && (
        <View style={styles.successBox}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>Pembayaran Berhasil ✅</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F8FC", padding: 20, paddingTop: 36 },
  title: { fontSize: 22, fontWeight: "700", color: "#1E2A78", marginBottom: 12, textAlign: "center" },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 16, elevation: 3 },
  label: { marginTop: 8, fontSize: 14, color: "#333" },
  value: { fontWeight: "700", color: "#111" },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 8, color: "#333" },
  methodItem: { width: 110, height: 90, backgroundColor: "#fff", borderRadius: 10, padding: 8, marginRight: 12, alignItems: "center", justifyContent: "center", elevation: 2 },
  methodLogo: { width: 56, height: 28, resizeMode: "contain", marginBottom: 6 },
  methodLabel: { fontSize: 12, fontWeight: "600" },
  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)", justifyContent: "flex-end" },
  modalCard: { backgroundColor: "#fff", padding: 20, borderTopLeftRadius: 18, borderTopRightRadius: 18 },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 6 },
  payButton: { backgroundColor: "#3155FF", paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  successBox: { position: "absolute", bottom: 30, left: 20, right: 20, backgroundColor: "#2ECC71", padding: 12, borderRadius: 12, alignItems: "center" },
});
