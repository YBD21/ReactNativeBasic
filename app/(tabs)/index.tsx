import { Pressable, Text, View } from "react-native";
import { Link, Stack } from "expo-router";

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />
      <View className="flex items-center justify-center h-full ">
        {/* <Text>Edit app/index.tsx to edit this screen.</Text> */}
        <Link href={"/about"} asChild>
          <Pressable className="bg-black px-4 py-2 rounded-lg active:opacity-70">
            <Text className="text-white font-semibold">Explore</Text>
          </Pressable>
        </Link>
      </View>
    </>
  );
}
