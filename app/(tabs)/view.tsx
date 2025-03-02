import { View, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

const AboutPage = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "View",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
        }}
      />

      <StatusBar style="dark" />
      <ScrollView className="flex-1 bg-white">
        <View className="p-5">
          <Text className="text-2xl font-bold mb-5">About Us</Text>
          <Text className="text-base text-gray-600 leading-6">
            Welcome to our app! We are dedicated to providing the best
            experience for our users. This is a simple example of an About page
            built with React Native.
          </Text>

          <Text className="text-xl font-bold mt-5 mb-2">Our Mission</Text>
          <Text className="text-base text-gray-600 leading-6">
            To create innovative solutions that make a difference in people's
            lives through technology and exceptional user experience.
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

export default AboutPage;
