import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'expo-router';

export default function SendMoney() {
  const { token } = useAuth();
  const [email, setEmail] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSend = async () => {
    if (!email || !valor) return Alert.alert('Preencha os campos obrigatórios');

    const valorNumerico = parseFloat(valor);
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      return Alert.alert('Valor inválido');
    }

    setLoading(true);
    try {
      const res = await fetch('https://mock-bank-mock-back.yexuz7.easypanel.host/api/transacao', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ destino: email, valor: valorNumerico, descricao }),
      });

      if (!res.ok) throw new Error('Erro ao enviar dinheiro');
      Alert.alert('Sucesso', 'Transferência realizada');
      router.replace('/dashboard');
    } catch (err: any) {
      Alert.alert('Erro', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email do destinatário" style={styles.input} onChangeText={setEmail} value={email} />
      <TextInput placeholder="Valor" style={styles.input} onChangeText={setValor} value={valor} keyboardType="decimal-pad" />
      <TextInput placeholder="Descrição (opcional)" style={styles.input} onChangeText={setDescricao} value={descricao} />

      <Button title={loading ? 'Enviando...' : 'Enviar'} onPress={handleSend} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 12, padding: 10, borderRadius: 6 },
});
