import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

import colors from "../styles/colors";
import TaskCard from "../components/TaskCard";
import EmptyState from "../components/EmptyState";
import { getTasks, updateTask } from "../storage/taskStorage";

const filters = ["All", "To Do", "Completed"];

const TasksScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  const loadTasks = useCallback(async () => setTasks(await getTasks()), []);
  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [loadTasks]),
  );

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.status === filter);

  const handleToggle = async (task) => {
    await updateTask(task.id, {
      status: task.status === "Completed" ? "To Do" : "Completed",
    });
    loadTasks();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>My Tasks</Text>
      <Text style={styles.subtitle}>All your assignments in one place.</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
      >
        <View style={styles.filters}>
          {filters.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setFilter(item)}
              style={[
                styles.filterButton,
                filter === item && styles.activeFilter,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === item && styles.activeFilterText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredTasks.length === 0 ? (
          <EmptyState message="No tasks in this category yet." />
        ) : (
          filteredTasks.map((task) => (
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
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  title: { fontSize: 26, fontWeight: "800", color: colors.text },
  subtitle: { fontSize: 14, color: colors.muted, marginTop: 5 },
  filterScroll: { flexGrow: 0, marginVertical: 20 },
  filters: { flexDirection: "row", gap: 8, paddingRight: 10 },
  filterButton: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: colors.white,
  },
  activeFilter: { backgroundColor: colors.palePink },
  filterText: { color: colors.muted, fontSize: 12, fontWeight: "600" },
  activeFilterText: { color: colors.text },
});

export default TasksScreen;
