import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../hooks/useAuth';

export default function ReceiveMoney() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recebimento</Text>
      <Text style={styles.label}>Apelido da conta:</Text>
      <Text style={styles.data}>{user?.apelido || '---'}</Text>

      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.data}>{user?.nome || '---'}</Text>

      <Text style={styles.label}>Documento:</Text>
      <Text style={styles.data}>{user?.documento || '---'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 10, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600' },
  data: { fontSize: 16 },
});
