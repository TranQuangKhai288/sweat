import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";

const PostSearchItem: React.FC<any> = ({ item }: { item: any }) => {
  return (
    <View className="w-[48%] mb-4">
      <Image
        source={{ uri: item.image }}
        style={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
        className="w-full h-56  mb-2 bg-slate-500"
      />
      <Text className="text-[#424242] text-base" numberOfLines={1}>
        {item.content}
      </Text>
      <View className="flex-row items-center mt-1">
        <Image
          source={{ uri: "https://i.pravatar.cc/100?img=5" }}
          className="w-7 h-7 rounded-full mr-2 bg-slate-500"
        />
        <Text className="text-gray-500 font-bold">{item.username}</Text>
      </View>
    </View>
  );
};

export default PostSearchItem;
