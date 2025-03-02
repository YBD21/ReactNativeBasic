import { Pressable, Text, View } from "react-native";
import { Link, Stack } from "expo-router";

// Component for the logo/header section
const Header = () => (
  <>
    <View className="flex items-center justify-center">
      <View className="w-24 h-24 bg-black rounded-full flex items-center justify-center">
        <Text className="text-white text-4xl font-bold">🚀</Text>
      </View>
    </View>
  </>
);

// Component for welcome text
const WelcomeText = () => (
  <View className="my-16 px-4">
    <Text className="text-4xl font-bold tracking-tight text-gray-900 text-center">
      Welcome
    </Text>
  </View>
);

// Component for navigation buttons
interface NavigationButtonProps {
  href: any;
  label: string;
  primary?: boolean;
}
const NavigationButton = ({
  href,
  label,
  primary = false,
}: NavigationButtonProps) => (
  <Link href={href} asChild>
    <Pressable
      className={`${
        primary ? "bg-black" : "bg-gray-100 border border-gray-200"
      } py-3 px-6 rounded-lg`}
    >
      <Text
        className={`${
          primary ? "text-white" : "text-gray-900"
        } font-medium text-center text-lg`}
      >
        {label}
      </Text>
    </Pressable>
  </Link>
);

// Main component
export default function Index() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex flex-1 justify-center bg-gray-100">
        <Header />
        <WelcomeText />
        <View className="flex items-center justify-center">
          <View className="space-y-5 w-[85%] max-w-sm gap-4">
            <NavigationButton href="/rates" label="Rates Page" primary />
            <NavigationButton href="/view" label="View" primary />
          </View>
        </View>
      </View>
    </>
  );
}
