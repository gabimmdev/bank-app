import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [documento, setDocumento] = useState('');
  const [apelido, setApelido] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nome || !documento || !apelido || !senha) {
      return Alert.alert('Preencha todos os campos');
    }

    setLoading(true);
    try {
      const response = await fetch('https://mock-bank-mock-back.yexuz7.easypanel.host/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, documento, apelido, senha }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao registrar');
      }

      Alert.alert('Cadastro realizado com sucesso');
      router.replace('/login');
    } catch (err: any) {
      Alert.alert('Erro', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nome" style={styles.input} onChangeText={setNome} value={nome} />
      <TextInput placeholder="Documento" style={styles.input} onChangeText={setDocumento} value={documento} />
      <TextInput placeholder="Apelido" style={styles.input} onChangeText={setApelido} value={apelido} />
      <TextInput placeholder="Senha" secureTextEntry style={styles.input} onChangeText={setSenha} value={senha} />
      <Button title={loading ? 'Cadastrando...' : 'Cadastrar'} onPress={handleRegister} disabled={loading} />

      <TouchableOpacity onPress={() => router.replace('/login')}>
        <Text style={styles.link}>Já tem conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 8,
    borderRadius: 6,
  },
  link: {
    marginTop: 12,
    color: 'blue',
    textAlign: 'center',
  },
});
