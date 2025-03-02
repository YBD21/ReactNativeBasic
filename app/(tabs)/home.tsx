import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import useStore from "../../hooks/store/useStore";
import { Stack } from "expo-router";

export default function Rates() {
  const { depoRate, retailRate, setDepoRate, setRetailRate } = useStore();
  const [lastUpdated, setLastUpdated] = useState(
    new Date().toLocaleTimeString()
  );
  const [editDepoRate, setEditDepoRate] = useState(false);
  const [editRetailRate, setEditRetailRate] = useState(false);
  const [tempDepoRate, setTempDepoRate] = useState(depoRate.toString());
  const [tempRetailRate, setTempRetailRate] = useState(retailRate.toString());

  const refreshRates = () => {
    // Use the current store default rates without random modifications
    setDepoRate(depoRate);
    setRetailRate(retailRate);
    setLastUpdated(new Date().toLocaleTimeString());
  };

  const handleUpdateRate = (type: "depo" | "retail") => {
    const newRate =
      type === "depo" ? parseFloat(tempDepoRate) : parseFloat(tempRetailRate);

    if (isNaN(newRate)) {
      Alert.alert("Invalid Input", "Please enter a valid number");
      return;
    }

    if (type === "depo") {
      setDepoRate(newRate);
      setEditDepoRate(false);
    } else {
      setRetailRate(newRate);
      setEditRetailRate(false);
    }
    setLastUpdated(new Date().toLocaleTimeString());
  };

  const handleDeleteRate = (type: "depo" | "retail") => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete the ${
        type === "depo" ? "Depo" : "Retail"
      } rate?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            if (type === "depo") {
              setDepoRate(0);
              setTempDepoRate("0");
            } else {
              setRetailRate(0);
              setTempRetailRate("0");
            }
            setLastUpdated(new Date().toLocaleTimeString());
          },
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: "Rates" }} />;
      <View className="flex-1 bg-white">
        <ScrollView className="p-4">
          <Text className="text-2xl font-bold text-gray-800 mb-4">
            Current Rates
          </Text>

          {/* Depo Rate Card */}
          <View className="bg-gray-50 rounded-lg p-4 mb-3 shadow-sm">
            <Text className="text-lg font-semibold text-gray-900">
              Depo Rate
            </Text>
            {editDepoRate ? (
              <TextInput
                className="text-3xl font-bold border-b border-gray-300 my-2"
                value={tempDepoRate}
                onChangeText={setTempDepoRate}
                keyboardType="numeric"
                autoFocus
              />
            ) : (
              <Text
                className={`text-3xl font-bold ${
                  depoRate >= 1.08 ? "text-green-600" : "text-red-600"
                } my-2`}
              >
                {depoRate.toFixed(4)}
              </Text>
            )}
            <Text className="text-sm text-gray-500">
              Updated: {lastUpdated}
            </Text>
            <View className="flex-row justify-end mt-2 space-x-2">
              {editDepoRate ? (
                <TouchableOpacity
                  className="bg-black py-3 px-6 rounded-lg"
                  onPress={() => handleUpdateRate("depo")}
                >
                  <Text className="text-white font-medium text-center">
                    Save
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  className="bg-black py-3 px-6 rounded-lg"
                  onPress={() => setEditDepoRate(true)}
                >
                  <Text className="text-white font-medium text-center">
                    Edit
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                className="bg-gray-100 border border-gray-200 py-3 px-6 rounded-lg"
                onPress={() => handleDeleteRate("depo")}
              >
                <Text className="text-gray-900 font-medium text-center">
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Retail Rate Card */}
          <View className="bg-gray-50 rounded-lg p-4 mb-3 shadow-sm">
            <Text className="text-lg font-semibold text-gray-900">
              Retail Rate
            </Text>
            {editRetailRate ? (
              <TextInput
                className="text-3xl font-bold border-b border-gray-300 my-2"
                value={tempRetailRate}
                onChangeText={setTempRetailRate}
                keyboardType="numeric"
                autoFocus
              />
            ) : (
              <Text
                className={`text-3xl font-bold ${
                  retailRate >= 1.25 ? "text-green-600" : "text-red-600"
                } my-2`}
              >
                {retailRate.toFixed(4)}
              </Text>
            )}
            <Text className="text-sm text-gray-500">
              Updated: {lastUpdated}
            </Text>
            <View className="flex-row justify-end mt-2 space-x-2">
              {editRetailRate ? (
                <TouchableOpacity
                  className="bg-black py-3 px-6 rounded-lg"
                  onPress={() => handleUpdateRate("retail")}
                >
                  <Text className="text-white font-medium text-center">
                    Save
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  className="bg-black py-3 px-6 rounded-lg"
                  onPress={() => setEditRetailRate(true)}
                >
                  <Text className="text-white font-medium text-center">
                    Edit
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                className="bg-gray-100 border border-gray-200 py-3 px-6 rounded-lg"
                onPress={() => handleDeleteRate("retail")}
              >
                <Text className="text-gray-900 font-medium text-center">
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Refresh Button */}
          <TouchableOpacity
            className="bg-black py-3 px-6 rounded-lg mt-4"
            onPress={refreshRates}
          >
            <Text className="text-white text-center font-medium">
              Refresh Rates
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
}
