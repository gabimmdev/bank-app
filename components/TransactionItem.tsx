import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  transaction: {
    descricao: string;
    valor: number;
    data: string;
  };
};

export default function TransactionItem({ transaction }: Props) {
  const isCredit = transaction.valor > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.description}>{transaction.descricao}</Text>
      <Text style={[styles.amount, { color: isCredit ? 'green' : 'red' }]}>
        {isCredit ? '+' : '-'} R$ {Math.abs(transaction.valor).toFixed(2)}
      </Text>
      <Text style={styles.date}>{new Date(transaction.data).toLocaleDateString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, borderBottomWidth: 1, borderColor: '#ccc' },
  description: { fontSize: 16 },
  amount: { fontSize: 16, fontWeight: 'bold' },
  date: { fontSize: 12, color: '#666' },
});
