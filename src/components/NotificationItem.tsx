import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function NotificationItem({
  notification,
}: {
  notification: any;
}) {
  return (
    <View
      className={`p-2 mb-2 rounded-xl flex-row relative ${
        notification.highlighted
          ? "border-l-4 border-orange-400 bg-orange-50 shadow-lg"
          : "bg-gray-50 shadow-lg"
      }`}
    >
      <View className="relative" style={{ width: 50, height: 50 }}>
        <Image
          source={notification.avatar}
          className="rounded-full bg-slate-500"
          style={{ width: 50, height: 50 }}
        />
        {notification.hasComment && (
          <View
            className="absolute bg-orange-500 rounded-full border-2 border-white"
            style={{
              width: 20,
              height: 20,
              bottom: 0,
              right: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text className="text-white text-xs">💬</Text>
          </View>
        )}
      </View>

      <View className="flex-1 ml-3">
        <View className="flex-row justify-between items-start">
          <View className="flex-1 pr-2">
            <Text className="text-gray-900 text-lg " numberOfLines={2}>
              <Text className="font-bold text-lg">{notification.user}</Text>{" "}
              {notification.action}
              {notification.content ? ": " + notification.content : ""}
            </Text>
            <Text className="text-gray-500 text-base">
              {notification.timeAgo}
            </Text>

            {notification.hasActions && (
              <View className="flex-row mt-2">
                <TouchableOpacity className="rounded-full mr-2">
                  <LinearGradient
                    colors={["#F96D40", "#FF965D"]}
                    className="py-2 px-6"
                    style={{ borderRadius: 50 }}
                  >
                    <Text className="text-white text-center font-semibold">
                      Chấp nhận
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity className="border border-[#F96D40] px-4 py-1 rounded-full">
                  <Text className="text-[#424242] text-base font-medium px-4">
                    Từ chối
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <TouchableOpacity className="p-1">
            <Text className="text-2xl">...</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
