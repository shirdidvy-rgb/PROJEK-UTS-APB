import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

const ProgressCard = ({ total = 0, completed = 0 }) => {
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Today's Progress</Text>
      <Text style={styles.percentage}>{progress}%</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.caption}>{completed} of {total} tasks completed</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.paleGreen,
    padding: 20,
    borderRadius: 20,
    marginBottom: 26,
  },
  heading: { color: colors.text, fontSize: 16, fontWeight: '700' },
  percentage: { color: colors.text, fontSize: 34, fontWeight: '800', marginTop: 10 },
  track: {
    height: 9,
    borderRadius: 10,
    backgroundColor: colors.white,
    overflow: 'hidden',
    marginTop: 10,
  },
  fill: { height: '100%', backgroundColor: colors.green, borderRadius: 10 },
  caption: { color: colors.muted, fontSize: 12, marginTop: 9 },
});

export default ProgressCard;