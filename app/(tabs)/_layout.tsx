import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="send"
        options={{
          title: 'Enviar',
          tabBarIcon: ({ color, size }) => <Ionicons name="arrow-up-circle" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="receive"
        options={{
          title: 'Receber',
          tabBarIcon: ({ color, size }) => <Ionicons name="arrow-down-circle" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
