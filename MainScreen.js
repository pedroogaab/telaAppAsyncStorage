import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MainScreen() {
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [savedData, setSavedData] = useState('');

  useEffect(() => {
    async function getSavedData() {
      const savedName = await AsyncStorage.getItem('name');
      const savedProfession = await AsyncStorage.getItem('profession');
      if (savedName && savedProfession) {
        setSavedData(`Nome: ${savedName}\nProfissão: ${savedProfession}`);
      }
    }
    getSavedData();
  }, []);

  const saveData = async () => {
    await AsyncStorage.setItem('name', name);
    await AsyncStorage.setItem('profession', profession);
    setSavedData(`Nome: ${name}\nProfissão: ${profession}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Digite o nome"
      />
      <Text style={styles.label}>Profissão:</Text>
      <TextInput
        style={styles.input}
        value={profession}
        onChangeText={(text) => setProfession(text)}
        placeholder="Digite a profissão"
      />
      <Button title="Salvar" onPress={saveData} />
      <Text style={styles.savedData}>{savedData}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  savedData: {
    fontSize: 16,
    marginTop: 20,
  },
});

export default MainScreen;
