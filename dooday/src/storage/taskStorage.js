import AsyncStorage from "@react-native-async-storage/async-storage";

const TASKS_KEY = "@dooday/tasks";

export async function getTasks() {
  try {
    const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error("Error reading tasks:", error);
    return [];
  }
}

export async function saveTasks(tasks) {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    return true;
  } catch (error) {
    console.error("Error saving tasks:", error);
    return false;
  }
}

export async function addTask(task) {
  const tasks = await getTasks();
  const newTask = {
    ...task,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  const updatedTasks = [newTask, ...tasks];
  await saveTasks(updatedTasks);
  return updatedTasks;
}

export async function updateTask(id, changes) {
  const tasks = await getTasks();
  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, ...changes, id } : task,
  );
  await saveTasks(updatedTasks);
  return updatedTasks;
}

export async function deleteTask(id) {
  const tasks = await getTasks();
  const updatedTasks = tasks.filter((task) => task.id !== id);
  await saveTasks(updatedTasks);
  return updatedTasks;
}
