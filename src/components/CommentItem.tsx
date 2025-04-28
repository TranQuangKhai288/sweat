import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Heart } from "lucide-react-native";

interface CommentItemProps {
  avatarUrl: string;
  username: string;
  time: Date;
  content: string;
  onReply?: () => void;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  avatarUrl,
  username,
  time,
  content,
  onReply,
}) => {
  return (
    <View className="flex-row items-start py-2">
      {/* Avatar */}
      <Image
        source={{ uri: avatarUrl }}
        className="w-12 h-12 rounded-full bg-slate-600 mr-3"
      />
      {/* Nội dung comment */}
      <View className="flex-1">
        <View className="flex-row items-center gap-2">
          <Text className="font-bold text-lg">{username}</Text>
          <Text className="text-gray-400 text-xs">{time.toLocaleString()}</Text>
        </View>
        <Text className="text-lg">{content}</Text>
        <TouchableOpacity onPress={onReply}>
          <Text className="text-gray-400 text-base mt-1">Trả lời</Text>
        </TouchableOpacity>
      </View>

      {/* Icon Like */}
      <TouchableOpacity>
        <Heart size={18} color="gray" />
      </TouchableOpacity>
    </View>
  );
};
