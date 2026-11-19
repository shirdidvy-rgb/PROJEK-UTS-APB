import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Lucide } from '@react-native-vector-icons/lucide';

import colors from '../styles/colors';
import CustomButton from '../components/CustomButton';
import { getTasks, deleteTask, updateTask } from '../storage/taskStorage';

const TaskDetailScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [task, setTask] = useState(null);

  const loadTask = useCallback(async () => {
    const tasks = await getTasks();
    setTask(tasks.find((item) => item.id === taskId) || null);
  }, [taskId]);

  useFocusEffect(useCallback(() => { loadTask(); }, [loadTask]));

  const handleDelete = () => {
    Alert.alert('Delete task?', 'This task will be permanently deleted.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteTask(taskId);
          navigation.goBack();
        },
      },
    ]);
  };

  const handleStatusChange = async () => {
    const nextStatus = task.status === 'Completed' ? 'To Do' : 'Completed';
    await updateTask(taskId, { status: nextStatus });
    loadTask();
  };

  if (!task) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={styles.title}>Task not found</Text>
        <CustomButton title="Go Back" onPress={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Task Details</Text>

        <View style={styles.detailCard}>
          <View style={styles.topRow}>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <View style={styles.priorityBadge}>
              <Text style={styles.priorityText}>{task.priority}</Text>
            </View>
          </View>

          <Text style={styles.label}>Subject</Text>
          <Text style={styles.value}>{task.subject || '-'}</Text>

          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>{task.description || 'No description added.'}</Text>

          <Text style={styles.label}>Due date</Text>
          <Text style={styles.value}>{task.dueDate || '-'}</Text>

          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>{task.status}</Text>
        </View>

        <View style={styles.actions}>
          <CustomButton
            title={task.status === 'Completed' ? 'Mark as To Do' : 'Mark as Completed'}
            onPress={handleStatusChange}
          />
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('AddTask', { task })}
          >
            <Lucide name="pencil" size={17} color={colors.text} />
            <Text style={styles.editText}>Edit Task</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Lucide name="trash-2" size={17} color={colors.danger} />
            <Text style={styles.deleteText}>Delete Task</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 26, fontWeight: '800', color: colors.text, marginBottom: 20 },
  detailCard: { backgroundColor: colors.white, borderRadius: 18, padding: 19, borderWidth: 1, borderColor: colors.border },
  topRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 },
  taskTitle: { flex: 1, color: colors.text, fontSize: 20, fontWeight: '800' },
  priorityBadge: { backgroundColor: colors.palePink, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6 },
  priorityText: { color: colors.text, fontSize: 11, fontWeight: '700' },
  label: { color: colors.muted, fontSize: 12, marginTop: 20 },
  value: { color: colors.text, fontSize: 15, marginTop: 5, lineHeight: 22 },
  actions: { gap: 12, marginTop: 22 },
  editButton: { minHeight: 48, borderRadius: 14, backgroundColor: colors.palePink, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  editText: { color: colors.text, fontWeight: '700' },
  deleteButton: { minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  deleteText: { color: colors.danger, fontWeight: '700' },
});

export default TaskDetailScreen;
