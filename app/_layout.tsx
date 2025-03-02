import { Stack } from "expo-router";
import "react-native-reanimated";
import "../global.css";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
