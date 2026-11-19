
import React, { useCallback, useState, useMemo } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Lucide } from '@react-native-vector-icons/lucide';

import colors from '../styles/colors';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';
import { getTasks, updateTask } from '../storage/taskStorage';

const CalendarScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString('en-CA')
  );

  const loadTasks = useCallback(async () => {
    const data = await getTasks();
    setTasks(data);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [loadTasks])
  );

  const dates = useMemo(() => {
    const result = [];
    const today = new Date();

    for (let i = -7; i < 23; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      result.push({
        fullDate: [
          date.getFullYear(),
          String(date.getMonth() + 1).padStart(2, '0'),
          String(date.getDate()).padStart(2, '0'),
        ].join('-'),
        day: date.toLocaleDateString('en-US', {
          weekday: 'short',
        }),
        number: date.getDate(),
      });
    }

    return result;
  }, []);

  const filteredTasks = tasks.filter(
    (task) => task.dueDate === selectedDate
  );

  const handleToggle = async (task) => {
    await updateTask(task.id, {
      status: task.status === 'Completed' ? 'To Do' : 'Completed',
    });

    loadTasks();
  };

  const renderDate = ({ item }) => {
    const isSelected = item.fullDate === selectedDate;

    return (
      <TouchableOpacity
        style={[
          styles.dateItem,
          isSelected && styles.selectedDate,
        ]}
        onPress={() => setSelectedDate(item.fullDate)}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.dayText,
            isSelected && styles.selectedText,
          ]}
        >
          {item.day}
        </Text>

        <Text
          style={[
            styles.numberText,
            isSelected && styles.selectedText,
          ]}
        >
          {item.number}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>My Calendar</Text>
      <Text style={styles.subtitle}>
        Your deadlines, all in one view.
      </Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Upcoming schedule</Text>
        <Text style={styles.infoText}>
          Select a date to see your tasks.
        </Text>
      </View>
     
      <View style={styles.calendarContainer}>
        <Text style={styles.monthTitle}>
          {new Date(selectedDate + 'T12:00:00').toLocaleDateString(
            'en-US',
            { month: 'long', year: 'numeric' }
          )}
        </Text>

        <FlatList
          horizontal
          data={dates}
          renderItem={renderDate}
          keyExtractor={(item) => item.fullDate}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateList}
          extraData={selectedDate}
        />
      </View>

      <View style={styles.taskHeader}>
        <Text style={styles.taskTitle}>Tasks for selected date</Text>
        <Text style={styles.taskCount}>
          {filteredTasks.length} tasks
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.taskList}
      >
        {filteredTasks.length === 0 ? (
          <EmptyState message="No tasks on this date." />
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onPress={() =>
                navigation.navigate('TaskDetail', {
                  taskId: task.id,
                })
              }
              onToggle={handleToggle}
            />
          ))
        )}
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
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 5,
  },
  infoCard: {
    backgroundColor: colors.softGreen,
    borderRadius: 18,
    padding: 17,
    marginTop: 20,
    marginBottom: 17,
  },
  infoTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  infoText: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 5,
  },
  calendarContainer: {
    backgroundColor: colors.white,
    borderRadius: 18,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  monthTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 15,
    marginBottom: 12,
  },
  dateList: {
    paddingHorizontal: 10,
    gap: 9,
  },
  dateItem: {
    width: 49,
    height: 70,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  selectedDate: {
    backgroundColor: colors.pink,
  },
  dayText: {
    fontSize: 11,
    color: colors.muted,
    marginBottom: 7,
    fontWeight: '600',
  },
  numberText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  selectedText: {
    color: colors.text,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 13,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  taskCount: {
    fontSize: 12,
    color: colors.muted,
  },
  taskList: {
    paddingBottom: 20,
  },
});

export default CalendarScreen;
