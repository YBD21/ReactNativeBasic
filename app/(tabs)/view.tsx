import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Stack } from "expo-router";
import { useState } from "react";
import useStore from "../../hooks/store/useStore"; // added store import

const CalculateVatPage = () => {
  const [quantity, setQuantity] = useState("");
  const [selectedRate, setSelectedRate] = useState<"retail" | "depo">("retail");
  const [result, setResult] = useState<{
    perUnit: number;
    totalValue: number;
    tax: number;
    totalPayable: number;
  } | null>(null);

  const { retailRate, depoRate } = useStore(); // extract rates from store

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

  const handleCalculate = () => {
    const qty = parseFloat(quantity) || 0;
    const currentRate = selectedRate === "retail" ? retailRate : depoRate;
    const perUnit = currentRate / 1.13;
    const totalValue = perUnit * qty;
    const tax = ((currentRate * qty) / 1.13) * 0.13;
    const totalPayable = totalValue + tax;
    setResult({ perUnit, totalValue, tax, totalPayable });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "VAT Calculator",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
        }}
      />

      <ScrollView className="flex-1 bg-gray-50">
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
          <View className="flex-row space-x-4 mb-6">
            <RateButton type="retail" label="Retail Rate" />
            <RateButton type="depo" label="Depo Rate" />
          </View>

          <TouchableOpacity
            onPress={handleCalculate}
            className="bg-black p-4 rounded-lg shadow-md"
          >
            <Text className="text-white text-center font-bold text-lg">
              Calculate VAT
            </Text>
          </TouchableOpacity>

          {result && (
            <View className="mt-6 p-4 bg-white rounded-lg shadow border border-gray-200">
              <Text className="text-lg font-semibold text-black mb-2">
                Calculation Result
              </Text>
              <View className="space-y-2">
                <Text className="text-gray-600">
                  प्रति इकाई (Per Unit): {result.perUnit.toFixed(2)}
                </Text>
                <Text className="text-gray-600">
                  जम्मा मूल्य (Total Value): {result.totalValue.toFixed(2)}
                </Text>
                <Text className="text-gray-600">
                  13% Tax: {result.tax.toFixed(2)}
                </Text>
                <Text className="text-gray-600">
                  जम्मा तिर्नु पर्ने रकम (Total Payable):{" "}
                  {result.totalPayable.toFixed(2)}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default CalculateVatPage;
