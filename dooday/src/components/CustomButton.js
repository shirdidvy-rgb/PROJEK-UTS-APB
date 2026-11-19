import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import colors from '../styles/colors';

const CustomButton = ({ title, onPress, variant = 'primary', disabled = false, loading = false }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        variant === 'secondary' && styles.secondaryButton,
        variant === 'danger' && styles.dangerButton,
        (disabled || loading) && styles.disabledButton,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.text : colors.white} />
      ) : (
        <Text style={[styles.buttonText, variant !== 'primary' && styles.lightText]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 49,
    borderRadius: 14,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  secondaryButton: { backgroundColor: colors.palePink },
  dangerButton: { backgroundColor: colors.danger },
  disabledButton: { opacity: 0.55 },
  buttonText: { color: colors.text, fontSize: 15, fontWeight: '700' },
  lightText: { color: colors.white },
});

export default CustomButton;
