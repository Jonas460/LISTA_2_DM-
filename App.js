import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import React, { useState } from "react";

export default function App() {
  const [book, setBook] = useState(null);

  const getBookData = (title) => {
    const endpoint = `https://hn.algolia.com/api/v1/search?query=${title}/`;

    fetch(endpoint)
      .then((resposta) => resposta.json())
      .then((data) => {
        const products = data.hits;
        setBook(products);
      });
  };

  const [search, setSearch] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.topTitle}>Livraria</Text>
      </View>
      <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar por titulo"
          onChangeText={(newText) => setSearch(newText)}
          defaultValue={search}
        />
        <Button title="Pesquisar" onPress={() => getBookData(search)} />
        {book?.map((b) => (
          <View style={styles.cardContainer}>
            <Text style={styles.text}>Titulo: {b.title}</Text>
            <Text style={styles.text}>Autor: {b.author}</Text>
            <Text style={styles.text}>url: {b.url}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  input: {
    borderWidth: 2,
    borderColor: "#000",
    height: 40,
    textAlign: "center",
  },

  top: {
    padding: 20,
    paddingTop: 40,
    marginBottom: 20,
    backgroundColor: "#0000FF",
  },
  topTitle: {
    fontSize: 22,
    marginBottom: 10,
    color: "#fff",
    textAlign: "center",
  },

  cardContainer: {
    backgroundColor: "#5671A8",
    borderRadius: 4,
    marginTop: 10,
    marginHorizontal: 20,
    padding: 10,
  },
  text: { fontSize: 16 },
});
