import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { loginUser } from '../services/api';

export default function LoginScreen() {
  const { login } = useAuth();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!nickname || !password) return Alert.alert('Preencha todos os campos');
    setLoading(true);
    try {
      const data = await loginUser(nickname, password);
      login(data.token);
    } catch (err: any) {
      Alert.alert('Erro', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Apelido</Text>
      <TextInput style={styles.input} onChangeText={setNickname} value={nickname} />
      <Text style={styles.label}>Senha</Text>
      <TextInput style={styles.input} secureTextEntry onChangeText={setPassword} value={password} />
      <Button title={loading ? 'Entrando...' : 'Entrar'} onPress={handleLogin} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  label: { marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 8,
    borderRadius: 6,
  },
});
