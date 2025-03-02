import { SplashScreen, Stack } from "expo-router";
import "react-native-reanimated";
import "../global.css";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <>
      <Stack>
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        <Stack.Screen name="about" options={{ title: "about" }} />
        <Stack.Screen name="index" options={{ title: "Home" }} />

        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
