import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Platform,
} from "react-native";
import { Calendar, ChevronDown } from "lucide-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface CustomInputProps {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  type?: "text" | "textarea" | "date" | "select";
  options?: Array<{ label: string; value: string }>;
  numberOfLines?: number;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  type = "text",
  options = [],
  numberOfLines = 1,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Xử lý date picker
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate && onChangeText) {
      // Format: dd/MM/yyyy
      const formattedDate = `${selectedDate
        .getDate()
        .toString()
        .padStart(2, "0")}/${(selectedDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${selectedDate.getFullYear()}`;
      onChangeText(formattedDate);
    }
  };

  // Xử lý select dropdown
  const handleSelectOption = (option: { label: string; value: string }) => {
    if (onChangeText) {
      onChangeText(option.value);
    }
    setShowDropdown(false);
  };

  // Render nội dung dựa vào type
  const renderInputContent = () => {
    switch (type) {
      case "textarea":
        return (
          <TextInput
            className="-mt-2 rounded-xl px-4 py-2 text-black text-lg"
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            multiline={true}
            numberOfLines={numberOfLines || 3}
            textAlignVertical="top"
          />
        );
      case "date":
        return (
          <TouchableOpacity
            className="-mt-2 rounded-xl px-4 py-2 flex-row justify-between items-center"
            onPress={() => setShowDatePicker(true)}
          >
            <Text className="text-black text-lg">{value || placeholder}</Text>
            <Calendar size={20} color="#666" />
            {showDatePicker && (
              <DateTimePicker
                value={
                  value
                    ? new Date(value.split("/").reverse().join("-"))
                    : new Date()
                }
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </TouchableOpacity>
        );
      case "select":
        return (
          <View className="-mt-2">
            <TouchableOpacity
              className=" rounded-xl px-4 py-2 flex-row justify-between items-center"
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Text className="text-black text-lg">{value || placeholder}</Text>
              <ChevronDown size={20} color="#666" />
            </TouchableOpacity>
            <Modal
              visible={showDropdown}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setShowDropdown(false)}
            >
              <TouchableOpacity
                style={styles.modalOverlay}
                onPress={() => setShowDropdown(false)}
                activeOpacity={1}
              >
                <View className="bg-white rounded-t-lg absolute bottom-0 left-0 right-0 max-h-72 shadow-lg">
                  <View className="px-4 py-2 border-b border-gray-200">
                    <Text className="text-lg font-semibold text-center">
                      Chọn {label}
                    </Text>
                  </View>
                  <FlatList
                    data={options}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        className="p-4 border-b border-gray-100"
                        onPress={() => handleSelectOption(item)}
                      >
                        <Text className="text-base text-black">
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </TouchableOpacity>
            </Modal>
          </View>
        );
      default:
        return (
          <TextInput
            className=" rounded-xl px-4 py-2 -mt-2 text-black text-lg"
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            multiline={multiline}
            numberOfLines={numberOfLines}
          />
        );
    }
  };

  return (
    <View className="mb-4 border border-gray-300 rounded-xl bg-white">
      <Text className="text-gray-600 text-base ml-4 mt-1">{label}</Text>
      {renderInputContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
});

export default CustomInput;
