import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Lucide } from "@react-native-vector-icons/lucide";
import colors from "../styles/colors";

const priorityColors = {
  High: colors.high,
  Medium: colors.medium,
  Low: colors.low,
};

const TaskCard = ({ task, onPress, onToggle }) => {
  const isCompleted = task.status === "Completed";

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.82}
      onPress={onPress}
    >
      <View style={styles.row}>
        <TouchableOpacity
          onPress={(event) => {
            event.stopPropagation();
            onToggle?.(task);
          }}
          hitSlop={8}
          style={styles.checkButton}
        >
          {isCompleted ? (
            <Lucide name="circle-check" size={23} color="#579B50" />
          ) : (
            <Lucide name="circle" size={23} color={colors.green} />
          )}
        </TouchableOpacity>

        <View style={styles.info}>
          <Text style={[styles.title, isCompleted && styles.completedTitle]}>
            {task.title}
          </Text>
          <Text style={styles.subject}>{task.subject || "No subject"}</Text>
        </View>

        <View
          style={[
            styles.priorityBadge,
            { backgroundColor: priorityColors[task.priority] || colors.medium },
          ]}
        >
          <Text style={styles.priorityText}>{task.priority}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Lucide name="clock-3" size={14} color={colors.muted} />
        <Text style={styles.date}>{task.dueDate || "No due date"}</Text>
        <Text style={styles.status}>{task.status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 15,
    marginBottom: 12,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  checkButton: { padding: 2 },
  info: { flex: 1 },
  title: { fontSize: 15, fontWeight: '700', color: colors.text },
    completedTitle: { 
        textDecorationLine: 'line-through', 
        textDecorationStyle: 'solid',
        textDecorationColor: colors.text,
        textDecorationThickness: 2,
        color: colors.muted 
    },
  subject: { fontSize: 12, color: colors.muted, marginTop: 4 },
  priorityBadge: { paddingHorizontal: 9, paddingVertical: 5, borderRadius: 9 },
  priorityText: { color: colors.text, fontSize: 10, fontWeight: "700" },
  footer: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 13 },
  date: { flex: 1, color: colors.muted, fontSize: 11 },
  status: { color: colors.muted, fontSize: 11 },
});

export default TaskCard;
