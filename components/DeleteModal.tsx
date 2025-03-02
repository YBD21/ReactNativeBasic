import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
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
      <BlurView intensity={15} tint="dark" style={styles.blurContainer}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="delete-outline" size={32} color="#DC2626" />
            </View>
            <Text style={styles.headerText}>Delete {rateText} Rate</Text>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.messageText}>
              This will reset the {rateText} rate to 0. Are you sure you want to
              proceed?
            </Text>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={onCancel}
                style={[styles.button, styles.cancelButton]}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onConfirm}
                style={[styles.button, styles.deleteButton]}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    backgroundColor: "rgba(254, 226, 226, 0.8)",
    padding: 24,
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "rgba(254, 202, 202, 0.8)",
    padding: 16,
    borderRadius: 50,
    marginBottom: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#DC2626",
  },
  content: {
    padding: 24,
  },
  messageText: {
    fontSize: 16,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  deleteButton: {
    backgroundColor: "#DC2626",
  },
  cancelButtonText: {
    color: "#374151",
    fontWeight: "500",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "500",
  },
});

export default DeleteModal;
