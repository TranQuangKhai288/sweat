import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { Ellipsis } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";

interface UserInfoProps {
  username: string;
  avatarUrl: string;
  time: Date;
  onEditPress?: () => void; // Thêm prop này nếu cần
}

const UserInfo: React.FC<UserInfoProps> = ({
  username,
  avatarUrl,
  time,
  onEditPress,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  //Tính thời gian đã đăng trước đó
  const timeDiff = new Date().getTime() - time.getTime();
  const minutesDiff = Math.floor(timeDiff / 1000 / 60);
  const hoursDiff = Math.floor(minutesDiff / 60);
  const daysDiff = Math.floor(hoursDiff / 24);
  const weeksDiff = Math.floor(daysDiff / 7);
  const monthsDiff = Math.floor(daysDiff / 30);
  const yearsDiff = Math.floor(daysDiff / 365);

  let timeString = "";
  if (yearsDiff > 0) {
    timeString = `${yearsDiff} năm trước`;
  } else if (monthsDiff > 0) {
    timeString = `${monthsDiff} tháng trước`;
  } else if (weeksDiff > 0) {
    timeString = `${weeksDiff} tuần trước`;
  } else if (daysDiff > 0) {
    timeString = `${daysDiff} ngày trước`;
  } else if (hoursDiff > 0) {
    timeString = `${hoursDiff} giờ trước`;
  } else if (minutesDiff > 0) {
    timeString = `${minutesDiff} phút trước`;
  } else {
    timeString = "Vừa xong";
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
        // backgroundColor: 'pink',
      }}
    >
      {/* Avatar can be added here if needed */}
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={() => {
          navigation.navigate("UserProfile"); // Replace with actual user ID
        }}
      >
        <Image
          source={{ uri: avatarUrl }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            marginRight: 10,
            backgroundColor: "gray", // Fallback color in case image fails to load
          }}
        />
        <View>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.time}>{timeString}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={onEditPress}>
        <Ellipsis size={26} color="#424242" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  time: {
    color: "gray",
    fontSize: 12,
  },
});

export default UserInfo;
