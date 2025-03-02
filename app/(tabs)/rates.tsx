import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import { Stack } from "expo-router";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import useStore from "../../hooks/store/useStore";
import DeleteModal from "../../components/DeleteModal";

// Utility function
const formatDateTime = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `Date: ${yyyy}-${mm}-${dd} Time: ${hours}:${minutes}`;
};

interface RateCardProps {
  title: string;
  isEditing: boolean;
  tempRate: string;
  setTempRate: (value: string) => void;
  setEditing: (isEditing: boolean) => void;
  onUpdate: () => void;
  onCancel: () => void;
  onDelete: () => void;
  lastUpdated: string;
}

const RateCard: React.FC<RateCardProps> = ({
  title,
  isEditing,
  tempRate,
  setTempRate,
  setEditing,
  onUpdate,
  onCancel,
  onDelete,
  lastUpdated,
}) => (
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
      <Text className="text-3xl font-bold my-3">
        {parseFloat(tempRate).toFixed(2)}
      </Text>
    )}
    <Text className="text-sm text-gray-600 mb-3">
      <FontAwesome name="clock-o" size={14} /> {lastUpdated}
    </Text>
    <View className="flex-row justify-end space-x-2 gap-6">
      {isEditing ? (
        <>
          <TouchableOpacity
            className="bg-black py-3 px-6 rounded-lg flex-row items-center flex-1 justify-center"
            onPress={onUpdate}
          >
            <MaterialIcons name="save" size={16} color="white" />
            <Text className="text-white ml-2 font-medium">Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-gray-100 border border-gray-200 py-3 px-6 rounded-lg flex-row items-center flex-1 justify-center"
            onPress={onCancel}
          >
            <MaterialIcons name="close" size={16} color="#666" />
            <Text className="text-gray-900 ml-2 font-medium">Cancel</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            className="bg-black py-3 px-6 rounded-lg flex-row items-center flex-1 justify-center"
            onPress={() => setEditing(true)}
          >
            <MaterialIcons name="edit" size={16} color="white" />
            <Text className="text-white ml-2 font-medium">Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-red-600 py-3 px-6 rounded-lg flex-row items-center flex-1 justify-center"
            onPress={onDelete}
          >
            <MaterialIcons name="delete-outline" size={16} color="white" />
            <Text className="text-white ml-2 font-medium">Delete</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  </View>
);

export default function Rates() {
  const { depoRate, retailRate, setDepoRate, setRetailRate } = useStore();
  const [lastUpdated, setLastUpdated] = useState(formatDateTime(new Date()));

  // Combine editing state and temporary rate for both rate types
  const [rates, setRates] = useState({
    depo: { editing: false, temp: depoRate.toString() },
    retail: { editing: false, temp: retailRate.toString() },
  });

  useEffect(() => {
    setRates({
      depo: { editing: false, temp: depoRate.toString() },
      retail: { editing: false, temp: retailRate.toString() },
    });
    setLastUpdated(formatDateTime(new Date()));
  }, [depoRate, retailRate]);

  const handleUpdateRate = (type: "depo" | "retail") => {
    const tempValue = rates[type].temp;
    const newRate = parseFloat(tempValue);
    if (isNaN(newRate)) {
      Alert.alert("Invalid Input", "Please enter a valid number");
      return;
    }
    type === "depo" ? setDepoRate(newRate) : setRetailRate(newRate);
    setRates((prev) => ({
      ...prev,
      [type]: { ...prev[type], editing: false },
    }));
    setLastUpdated(formatDateTime(new Date()));
  };

  const handleCancelEdit = (type: "depo" | "retail") => {
    const resetValue =
      type === "depo" ? depoRate.toString() : retailRate.toString();
    setRates((prev) => ({
      ...prev,
      [type]: { editing: false, temp: resetValue },
    }));
  };

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteRateType, setDeleteRateType] = useState<
    "depo" | "retail" | null
  >(null);

  const handleDeleteRate = (type: "depo" | "retail") => {
    setDeleteModalVisible(true);
    setDeleteRateType(type);
  };

  const confirmDeleteRate = () => {
    if (deleteRateType) {
      deleteRateType === "depo" ? setDepoRate(0) : setRetailRate(0);
    }
    setDeleteModalVisible(false);
    setDeleteRateType(null);
  };

  const cancelDeleteRate = () => {
    setDeleteModalVisible(false);
    setDeleteRateType(null);
  };

  const rateConfigs = [
    {
      key: "depo" as const,
      title: "Depo Rate",
      config: rates.depo,
      setEditing: (val: boolean) =>
        setRates((prev) => ({ ...prev, depo: { ...prev.depo, editing: val } })),
      setTemp: (value: string) =>
        setRates((prev) => ({ ...prev, depo: { ...prev.depo, temp: value } })),
      onUpdate: () => handleUpdateRate("depo"),
      onCancel: () => handleCancelEdit("depo"),
      onDelete: () => handleDeleteRate("depo"),
    },
    {
      key: "retail" as const,
      title: "Retail Rate",
      config: rates.retail,
      setEditing: (val: boolean) =>
        setRates((prev) => ({
          ...prev,
          retail: { ...prev.retail, editing: val },
        })),
      setTemp: (value: string) =>
        setRates((prev) => ({
          ...prev,
          retail: { ...prev.retail, temp: value },
        })),
      onUpdate: () => handleUpdateRate("retail"),
      onCancel: () => handleCancelEdit("retail"),
      onDelete: () => handleDeleteRate("retail"),
    },
  ];

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
          {rateConfigs.map((rate) => (
            <RateCard
              key={rate.key}
              title={rate.title}
              isEditing={rate.config.editing}
              tempRate={rate.config.temp}
              setTempRate={rate.setTemp}
              setEditing={rate.setEditing}
              onUpdate={rate.onUpdate}
              onCancel={rate.onCancel}
              onDelete={rate.onDelete}
              lastUpdated={lastUpdated}
            />
          ))}
        </ScrollView>
        <DeleteModal
          visible={deleteModalVisible}
          deleteRateType={deleteRateType}
          onCancel={cancelDeleteRate}
          onConfirm={confirmDeleteRate}
        />
      </View>
    </>
  );
}
