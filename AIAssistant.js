import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "ai", text: "Halo! Ada yang bisa saya bantu?" }
  ]);

  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);

    try {
      const response = await fetch("https://late-sun-f9fc.nabilexcel10.workers.dev/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "Kamu adalah AI parkir." },
            ...messages.map(m => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text
            })),
            { role: "user", content: input }
          ]
        })
      });

      const data = await response.json();

      const aiText =
        data.response || "(AI tidak memberikan respons)"

      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, sender: "ai", text: aiText }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, sender: "ai", text: "Kesalahan: " + err.message }
      ]);
    }

    setInput("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🤖 AI Assistant</Text>

      <ScrollView style={styles.chatBox}>
        {messages.map(msg => (
          <View
            key={msg.id}
            style={[
              styles.message,
              msg.sender === "user" ? styles.userMsg : styles.aiMsg
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Tanya sesuatu..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={{ color: "white" }}>Kirim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  chatBox: { flex: 1 },
  message: { padding: 10, borderRadius: 8, marginBottom: 10, maxWidth: "80%" },
  userMsg: { backgroundColor: "#d0e8ff", alignSelf: "flex-end" },
  aiMsg: { backgroundColor: "#eee", alignSelf: "flex-start" },
  messageText: { fontSize: 16 },
  inputRow: { flexDirection: "row", marginTop: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginLeft: 8
  }
});
