import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Lucide } from '@react-native-vector-icons/lucide';

import colors from '../styles/colors';
import { getTasks } from '../storage/taskStorage';

const ProfileMenuItem = ({ iconName, title, subtitle }) => {
  return (
    <View style={styles.menuItem}>
      <View style={styles.menuIcon}><Lucide name={iconName} size={20} color="#397B38" /></View>
      <View style={styles.menuInfo}>
        <Text style={styles.menuTitle}>{title}</Text>
        {!!subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
};

const ProfileScreen = () => {
  const [tasks, setTasks] = useState([]);
  useFocusEffect(useCallback(() => {
    getTasks().then(setTasks);
  }, []));

  const completed = tasks.filter((task) => task.status === 'Completed').length;

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}><Lucide name="user-round" size={38} color="#397B38" /></View>
        <Text style={styles.name}>Dooday User</Text>
        <Text style={styles.email}>Your personal task planner</Text>
      </View>

      <View style={styles.statsCard}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{tasks.length}</Text>
          <Text style={styles.statLabel}>Total Tasks</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{completed}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Settings</Text>
      <View style={styles.menuCard}>
        <ProfileMenuItem iconName="bell" title="Notifications" subtitle="Reminder preferences" />
        <ProfileMenuItem iconName="palette" title="Appearance" subtitle="Soft & Cute theme" />
        <ProfileMenuItem iconName="list-checks" title="Task statistics" subtitle="Your productivity summary" />
        <ProfileMenuItem iconName="info" title="About Dooday" subtitle="A simple reminder app" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 26, fontWeight: '800', color: colors.text },
  profileCard: { alignItems: 'center', backgroundColor: colors.softGreen, padding: 24, borderRadius: 20, marginTop: 22 },
  avatar: { width: 76, height: 76, borderRadius: 38, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  name: { color: colors.text, fontSize: 19, fontWeight: '800', marginTop: 12 },
  email: { color: colors.muted, fontSize: 12, marginTop: 4 },
  statsCard: { flexDirection: 'row', backgroundColor: colors.white, borderRadius: 17, padding: 18, marginVertical: 18 },
  stat: { flex: 1, alignItems: 'center' },
  statNumber: { color: colors.text, fontSize: 23, fontWeight: '800' },
  statLabel: { color: colors.muted, fontSize: 12, marginTop: 4 },
  statDivider: { width: 1, backgroundColor: colors.border },
  sectionTitle: { color: colors.text, fontSize: 17, fontWeight: '700', marginBottom: 10 },
  menuCard: { backgroundColor: colors.white, borderRadius: 17, paddingHorizontal: 14 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 13, gap: 12 },
  menuIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.paleGreen, alignItems: 'center', justifyContent: 'center' },
  menuInfo: { flex: 1 },
  menuTitle: { color: colors.text, fontWeight: '700', fontSize: 13 },
  menuSubtitle: { color: colors.muted, fontSize: 11, marginTop: 3 },
});

export default ProfileScreen;
