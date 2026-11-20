import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

import colors from "../styles/colors";
import TaskCard from "../components/TaskCard";
import ProgressCard from "../components/ProgressCard";
import EmptyState from "../components/EmptyState";
import { getTasks, updateTask } from "../storage/taskStorage";

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = useCallback(async () => {
    setTasks(await getTasks());
  }, []);

  useFocusEffect(useCallback(() => { loadTasks(); }, [loadTasks]));

  const today = new Date().toISOString().slice(0, 10);
  const todayTasks = tasks.filter((task) => task.dueDate === today);
  const completed = tasks.filter((task) => task.status === "Completed").length;

  const handleToggle = async (task) => {
    await updateTask(task.id, {
      status: task.status === "Completed" ? "To Do" : "Completed",
    });
    loadTasks();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, there!</Text>
          </View>
        </View>

        <ProgressCard total={tasks.length} completed={completed} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Tasks")}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {todayTasks.length === 0 ? (
          <EmptyState message="No tasks due today. Enjoy the breathing room!" />
        ) : (
          todayTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onPress={() =>
                navigation.navigate("TaskDetail", { taskId: task.id })
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
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 90 },
  header: { marginBottom: 23 },
  greeting: { fontSize: 26, fontWeight: "800", color: colors.text },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: colors.text },
  seeAll: { color: "#397B38", fontWeight: "700", fontSize: 13 },
});

export default HomeScreen;
