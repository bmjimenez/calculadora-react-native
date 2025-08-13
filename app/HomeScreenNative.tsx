import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.subtitle}>Bienvenido a la calculadora</Text>

      <Link href="/AppNative">
        <Image
          style={styles.image}
          source={{
            uri: "https://img.icons8.com/color/480/apple-calculator.png",
          }}
        />
      </Link>

      <Link href="/InfoScreen" style={styles.link}>
        <Text style={styles.linkText}>Acerca de la app</Text>
      </Link>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  link: {
    marginVertical: 10,
  },
  linkText: {
    color: "blue",
    fontSize: 18,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  footer: {
    marginTop: 30,
    fontSize: 14,
    textAlign: "center",
    color: "#666",
  },
});
