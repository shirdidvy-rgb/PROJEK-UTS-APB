import React, { useCallback, useState } from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import colors from '../styles/colors';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';
import { getTasks, updateTask } from '../storage/taskStorage';

const CalendarScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = useCallback(async () => setTasks(await getTasks()), []);
  useFocusEffect(useCallback(() => { loadTasks(); }, [loadTasks]));

  const sortedTasks = [...tasks].sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  const handleToggle = async (task) => {
    await updateTask(task.id, {
      status: task.status === 'Completed' ? 'To Do' : 'Completed',
    });
    loadTasks();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>My Calendar</Text>
      <Text style={styles.subtitle}>Your deadlines, all in one view.</Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Upcoming schedule</Text>
        <Text style={styles.infoText}>Tasks are sorted by due date.</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {sortedTasks.length === 0 ? (
          <EmptyState message="No scheduled tasks yet." />
        ) : (
          sortedTasks.map((task) => (
            <View key={task.id}>
              <Text style={styles.dateHeading}>{task.dueDate}</Text>
              <TaskCard
                task={task}
                onPress={() => navigation.navigate('TaskDetail', { taskId: task.id })}
                onToggle={handleToggle}
              />
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 20, paddingTop: 14 },
  title: { fontSize: 26, fontWeight: '800', color: colors.text },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 5 },
  infoCard: { backgroundColor: colors.softGreen, borderRadius: 18, padding: 17, marginVertical: 20 },
  infoTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  infoText: { color: colors.muted, fontSize: 12, marginTop: 5 },
  dateHeading: { color: colors.text, fontSize: 14, fontWeight: '700', marginTop: 8, marginBottom: 9 },
});

export default CalendarScreen;
