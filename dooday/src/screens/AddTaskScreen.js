import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../styles/colors";
import CustomButton from "../components/CustomButton";
import globalStyles from "../styles/globalStyles";
import { addTask, updateTask } from "../storage/taskStorage";

const priorities = ["High", "Medium", "Low"];

const AddTaskScreen = ({ navigation, route }) => {
  const existingTask = route.params?.task;
  const [title, setTitle] = useState(existingTask?.title || "");
  const [subject, setSubject] = useState(existingTask?.subject || "");
  const [description, setDescription] = useState(existingTask?.description || "");
  const [dueDate, setDueDate] = useState(existingTask?.dueDate || "");
  const [priority, setPriority] = useState(existingTask?.priority || "Medium");

  const handleSave = async () => {
    if (!title.trim() || !subject.trim() || !dueDate.trim()) {
      Alert.alert(
        "Incomplete information",
        "Please enter a title, subject, and due date.",
      );
      return;
    }

    const taskData = {
      title: title.trim(),
      subject: subject.trim(),
      description: description.trim(),
      dueDate: dueDate.trim(),
      priority,
      status: existingTask?.status || "To Do",
    };

    if (existingTask) {
      await updateTask(existingTask.id, taskData);
    } else {
      await addTask(taskData);
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <Text style={globalStyles.title}>
          {existingTask ? "Edit Task" : "Add New Task"}
        </Text>
        <Text style={globalStyles.subtitle}>
          A little plan makes a big difference.
        </Text>

        <Text style={globalStyles.label}>Task Title *</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Enter task title"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={globalStyles.label}>Subject *</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="e.g. Mobile Programming"
          value={subject}
          onChangeText={setSubject}
        />

        <Text style={globalStyles.label}>Description</Text>
        <TextInput
          style={[globalStyles.input, styles.description]}
          placeholder="Write a short description..."
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={globalStyles.label}>Due Date * (YYYY-MM-DD)</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="2026-11-20"
          value={dueDate}
          onChangeText={setDueDate}
          autoCapitalize="none"
        />

        <Text style={globalStyles.label}>Priority</Text>
        <View style={styles.priorityRow}>
          {priorities.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setPriority(item)}
              style={[styles.priorityButton, priority === item && styles.selectedPriority]}
            >
              <Text style={styles.priorityText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.saveButton}>
          <CustomButton title={existingTask ? "Save Changes" : "Save Task"} onPress={handleSave}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  description: { height: 105, textAlignVertical: "top" },
  priorityRow: { flexDirection: "row", gap: 9 },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.white,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedPriority: {
    backgroundColor: colors.palePink,
    borderColor: colors.pink2,
  },
  priorityText: { color: colors.text, fontWeight: "600", fontSize: 12 },
  saveButton: { marginTop: 28, marginBottom: 30 },
});

export default AddTaskScreen;
