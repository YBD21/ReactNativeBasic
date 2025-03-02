import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Stack } from "expo-router";
import { useState } from "react";

const CalculateVatPage = () => {
  const [quantity, setQuantity] = useState("");
  const [selectedRate, setSelectedRate] = useState<"retail" | "depo">("retail");

  const RateButton = ({
    type,
    label,
  }: {
    type: "retail" | "depo";
    label: string;
  }) => (
    <TouchableOpacity
      onPress={() => setSelectedRate(type)}
      className={`flex-1 p-3 rounded-lg ${
        selectedRate === type ? "bg-black" : "bg-white border border-gray-300"
      }`}
    >
      <Text
        className={`text-center font-semibold ${
          selectedRate === type ? "text-white" : "text-black"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "VAT Calculator",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
        }}
      />

      <ScrollView className="flex-1 bg-white">
        <View className="p-6">
          <View className="mb-6">
            <Text className="text-sm font-semibold mb-2 text-gray-700">
              Quantity
            </Text>
            <TextInput
              className="w-full border border-gray-300 rounded-lg p-3 text-black"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              placeholder="Enter quantity"
              placeholderTextColor="#666"
            />
          </View>

          <Text className="text-sm font-semibold mb-4 text-gray-700">
            Select Rate Type
          </Text>
          <View className="flex-row space-x-4 mb-6 gap-6">
            <RateButton type="retail" label="Retail Rate" />
            <RateButton type="depo" label="Depo Rate" />
          </View>

          <TouchableOpacity className="bg-black p-4 rounded-lg">
            <Text className="text-white text-center font-bold text-lg">
              Calculate VAT
            </Text>
          </TouchableOpacity>

          <View className="mt-6 p-4 border border-gray-200 rounded-lg">
            <Text className="text-lg font-semibold text-black mb-2">
              Calculation Result
            </Text>
            <Text className="text-gray-600">
              Selected Rate: {selectedRate === "retail" ? "Retail" : "Depo"}
            </Text>
            <Text className="text-gray-600">Quantity: {quantity || "0"}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default CalculateVatPage;
