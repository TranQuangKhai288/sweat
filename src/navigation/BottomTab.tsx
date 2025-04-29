import React, { memo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, StyleSheet, Image } from "react-native";
import { Home, Users, Bell, Search } from "lucide-react-native";
import HomeScreen from "../screens/Home";
import FriendsScreen from "../screens/FriendScreen";
import NotificationScreen from "../screens/Notification";
import ProfileScreen from "../screens/Profile";

type TabParamList = {
  Home: undefined;
  Friends: undefined;
  Notification: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

// Tạo một component icon memoized để tránh render lại không cần thiết
const Icon = memo(
  ({
    Component,
    size,
    color,
  }: {
    Component: React.ElementType;
    size: number;
    color: string;
  }) => {
    return <Component size={size} color={color} />;
  }
);

// Định nghĩa icon cho mỗi tab trong một object
const iconMap = {
  Home: Home,
  Friends: Users,
  Notification: Bell,
  Profile: Search,
};

const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const IconComponent = iconMap[route.name]; // Lấy component icon từ map
        const size = 28; // Kích thước cố định cho icon

        return {
          tabBarIcon: ({ color }) => (
            <View className="items-center justify-center pt-2">
              {route.name !== "Profile" ? (
                <Icon Component={IconComponent} size={size} color={color} />
              ) : (
                <View>
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/168/168726.png",
                    }}
                    resizeMode="cover"
                    style={{
                      width: 32,
                      height: 32,
                      marginBottom: 4,
                      borderRadius: 20,
                      backgroundColor: "gray",
                    }}
                  />
                </View>
              )}
            </View>
          ),
          tabBarActiveTintColor: "#F96D40", // Màu khi active
          tabBarInactiveTintColor: "#000", // Màu khi inactive
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#F96D40" : "#000",
                fontSize: 14,
                fontWeight: "bold",
                textAlign: "center",
                // backgroundColor: 'aqua',
                marginBottom: 12,
              }}
            >
              {route.name === "Home"
                ? "Trang Chủ"
                : route.name === "Friends"
                ? "Bạn Bè"
                : route.name === "Notification"
                ? "Thông Báo"
                : "Cá nhân"}
            </Text>
          ),
          tabBarStyle: {
            display: "flex",
            position: "absolute",
            bottom: 0,
            height: 70,
          },
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
