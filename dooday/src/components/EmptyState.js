import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Lucide } from '@react-native-vector-icons/lucide';
import colors from '../styles/colors';

const EmptyState = ({ message = 'No tasks yet.' }) => {
  return (
    <View style={styles.container}>
      <Lucide name="list-todo" size={34} color={colors.green} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 34,
    gap: 10,
  },
  message: { color: colors.muted, fontSize: 14, textAlign: 'center' },
});

export default EmptyState;
