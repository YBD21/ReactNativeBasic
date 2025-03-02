import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import useStore from "../../hooks/store/useStore";
import { Stack } from "expo-router";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function Rates() {
  const { depoRate, retailRate, setDepoRate, setRetailRate } = useStore();
  const [lastUpdated, setLastUpdated] = useState(formatDateTime(new Date()));
  const [editDepoRate, setEditDepoRate] = useState(false);
  const [editRetailRate, setEditRetailRate] = useState(false);
  const [tempDepoRate, setTempDepoRate] = useState(depoRate.toString());
  const [tempRetailRate, setTempRetailRate] = useState(retailRate.toString());

  function formatDateTime(date: Date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `Date: ${yyyy}-${mm}-${dd} Time: ${hours}:${minutes}`;
  }

  useEffect(() => {
    setTempDepoRate(depoRate.toString());
    setTempRetailRate(retailRate.toString());
    setLastUpdated(formatDateTime(new Date()));
  }, [depoRate, retailRate]);

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
    setLastUpdated(formatDateTime(new Date()));
  };

  const handleCancelEdit = (type: "depo" | "retail") => {
    if (type === "depo") {
      setTempDepoRate(depoRate.toString());
      setEditDepoRate(false);
    } else {
      setTempRetailRate(retailRate.toString());
      setEditRetailRate(false);
    }
  };

  const handleDeleteRate = (type: "depo" | "retail") => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete the ${
        type === "depo" ? "Depo" : "Retail"
      } rate?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            if (type === "depo") setDepoRate(0);
            else setRetailRate(0);
          },
        },
      ]
    );
  };

  interface RateCardProps {
    title: string;
    rate: number;
    threshold: number;
    isEditing: boolean;
    tempRate: string;
    setTempRate: (value: string) => void;
    setEditing: (isEditing: boolean) => void;
    onUpdate: () => void;
    onCancel: () => void;
    onDelete: () => void;
  }

  const RateCard = ({
    title,
    rate,
    threshold,
    isEditing,
    tempRate,
    setTempRate,
    setEditing,
    onUpdate,
    onCancel,
    onDelete,
  }: RateCardProps) => (
    <View className="bg-white rounded-lg p-5 mb-4 shadow-sm border border-gray-200">
      <Text className="text-lg font-semibold text-black">{title}</Text>
      {isEditing ? (
        <TextInput
          className="text-3xl font-bold border-b border-gray-400 my-3 px-2 py-1 text-black"
          value={tempRate}
          onChangeText={setTempRate}
          keyboardType="numeric"
          autoFocus
        />
      ) : (
        <Text
          className={`text-3xl font-bold ${
            rate >= threshold ? "text-green-600" : "text-red-600"
          } my-3`}
        >
          {rate.toFixed(4)}
        </Text>
      )}
      <Text className="text-sm text-gray-600 mb-3">
        <FontAwesome name="clock-o" size={14} /> {lastUpdated}
      </Text>

      <View className="flex-row justify-end space-x-2 gap-6">
        {isEditing ? (
          <>
            <TouchableOpacity
              className="bg-black py-2 px-4 rounded-full flex-row items-center flex-1 justify-center"
              onPress={onUpdate}
            >
              <MaterialIcons name="save" size={16} color="white" />
              <Text className="text-white ml-2 font-medium">Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="border border-gray-400 py-2 px-4 rounded-full flex-row items-center flex-1 justify-center"
              onPress={onCancel}
            >
              <MaterialIcons name="close" size={16} color="#666" />
              <Text className="text-gray-600 ml-2 font-medium">Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              className="bg-black py-2 px-4 rounded-full flex-row items-center flex-1 justify-center"
              onPress={() => setEditing(true)}
            >
              <MaterialIcons name="edit" size={16} color="white" />
              <Text className="text-white ml-2 font-medium">Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="border border-red-500 py-2 px-4 rounded-full flex-row items-center flex-1 justify-center"
              onPress={onDelete}
            >
              <MaterialIcons name="delete-outline" size={16} color="#EF4444" />
              <Text className="text-red-500 ml-2 font-medium">Delete</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Rates",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
        }}
      />
      <View className="flex-1 bg-gray-100">
        <ScrollView className="p-4">
          <RateCard
            title="Depo Rate"
            rate={depoRate}
            threshold={1.08}
            isEditing={editDepoRate}
            tempRate={tempDepoRate}
            setTempRate={setTempDepoRate}
            setEditing={setEditDepoRate}
            onUpdate={() => handleUpdateRate("depo")}
            onCancel={() => handleCancelEdit("depo")}
            onDelete={() => handleDeleteRate("depo")}
          />

          <RateCard
            title="Retail Rate"
            rate={retailRate}
            threshold={1.25}
            isEditing={editRetailRate}
            tempRate={tempRetailRate}
            setTempRate={setTempRetailRate}
            setEditing={setEditRetailRate}
            onUpdate={() => handleUpdateRate("retail")}
            onCancel={() => handleCancelEdit("retail")}
            onDelete={() => handleDeleteRate("retail")}
          />
        </ScrollView>
      </View>
    </>
  );
}
