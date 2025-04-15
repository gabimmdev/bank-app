import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';

export default function TransactionDetail() {
  const { id } = useLocalSearchParams();
  const { token } = useAuth();
  const [transaction, setTransaction] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        const res = await fetch(`https://mock-bank-mock-back.yexuz7.easypanel.host/api/transacao/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Erro ao buscar detalhes');
        const data = await res.json();
        setTransaction(data);
      } catch (err: any) {
        Alert.alert('Erro', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" />;

  if (!transaction) return <Text>Nenhuma transação encontrada.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição:</Text>
      <Text style={styles.text}>{transaction.descricao}</Text>

      <Text style={styles.label}>Valor:</Text>
      <Text style={[styles.text, { color: transaction.valor > 0 ? 'green' : 'red' }]}>
        R$ {Math.abs(transaction.valor).toFixed(2)}
      </Text>

      <Text style={styles.label}>Data:</Text>
      <Text style={styles.text}>{new Date(transaction.data).toLocaleString()}</Text>

      <Text style={styles.label}>Categoria:</Text>
      <Text style={styles.text}>{transaction.categoria || 'N/A'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 10 },
  label: { fontWeight: 'bold', fontSize: 16 },
  text: { fontSize: 16 },
});
