import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { X } from "lucide-react-native";

interface RecentSearchItemProps {
  name: string;
  infoCount: number;
  avatarUrl: string;
  onRemove: () => void;
}

const RecentSearchItem: React.FC<RecentSearchItemProps> = ({
  name,
  infoCount,
  avatarUrl,
  onRemove,
}) => {
  return (
    <View className="flex-row items-center justify-between my-1.5">
      <View className="flex-row items-center">
        <Image
          source={{ uri: avatarUrl }}
          className="w-12 h-12 rounded-full mr-3"
        />
        <View>
          <Text className="font-bold text-[#424242] text-lg">{name}</Text>
          <View className="flex-row items-center">
            <View className="w-2 h-2 bg-orange-500 rounded-full mr-2" />
            <Text className="text-sm text-gray-500">
              {infoCount} thông tin mới
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={onRemove}
        className="p-2 rounded-full bg-gray-100"
      >
        <X size={16} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default RecentSearchItem;
