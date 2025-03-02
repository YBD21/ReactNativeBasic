import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

interface DeleteModalProps {
  visible: boolean;
  deleteRateType: "depo" | "retail" | null;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  visible,
  deleteRateType,
  onCancel,
  onConfirm,
}) => {
  if (!visible || !deleteRateType) return null;

  const rateText = deleteRateType === "depo" ? "Depo" : "Retail";

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-4">
        <View className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-lg">
          {/* Header */}
          <View className="bg-red-50 p-5 items-center">
            <View className="bg-red-100 rounded-full p-3 mb-2">
              <MaterialIcons name="delete-outline" size={30} color="#EF4444" />
            </View>
            <Text className="text-xl font-bold text-red-500">
              Delete {rateText} Rate !
            </Text>
          </View>

          {/* Body */}
          <View className="p-5">
            <Text className="text-base text-gray-600 text-center mb-6">
              This will reset the {rateText} rate to 0. Are you sure you want to
              proceed?
            </Text>

            {/* Buttons */}
            <View className="flex-row justify-between space-x-3 mt-5 gap-6">
              <TouchableOpacity
                onPress={onCancel}
                className="flex-1 py-3 px-4 rounded-lg border border-gray-300"
              >
                <Text className="text-center font-medium text-gray-600">
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onConfirm}
                className="flex-1 py-3 px-4 rounded-lg bg-red-500"
              >
                <Text className="text-center font-medium text-white">
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
