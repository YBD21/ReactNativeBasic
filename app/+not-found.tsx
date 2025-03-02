import { Link, Stack } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-xl font-bold dark:text-white">
          This screen doesn't exist.
        </Text>
        <Link href="/" asChild>
          <Pressable className="mt-4 py-4">
            <Text className="text-blue-500 dark:text-blue-400">
              Go to home screen!
            </Text>
          </Pressable>
        </Link>
      </View>
    </>
  );
}
