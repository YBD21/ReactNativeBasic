import { Tabs } from "expo-router";
import { Home, User, Settings } from "lucide-react-native";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#ffffff",
          paddingBottom: 4,
          paddingTop: 4,
          height: 60,
        },
        tabBarActiveTintColor: "#3b82f6", // blue-500
        tabBarInactiveTintColor: "#6b7280", // gray-500
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
