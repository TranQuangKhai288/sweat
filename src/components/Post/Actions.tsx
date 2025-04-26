import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Heart, LucideMessageCircle } from "lucide-react-native";
import BottomSheet from "@gorhom/bottom-sheet";

interface ActionsProps {
  likes: number;
  comments: number;
}

const Actions: React.FC<ActionsProps> = ({ likes, comments }) => {
  const [likeCount, setLikeCount] = useState(likes);
  const sheetRef = useRef<BottomSheet>(null);

  const handleLike = () => {
    setLikeCount(likeCount + 1); // Tăng số lượng yêu thích
  };

  const toggleCommentSection = () => {
    if (sheetRef.current) {
      // Kiểm tra nếu bottom sheet chưa được mở thì mở nó
      console.log("BottomSheet is opened");
      sheetRef.current.expand(); // Mở BottomSheet
    }
  };

  const closeBottomSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close(); // Đóng BottomSheet
    }
  };

  return (
    <View className="flex flex-1 flex-col my-3">
      <View className="flex flex-row items-center">
        <View className="flex flex-row items-center mr-4">
          <Heart size={18} color="#F96D40" fill={"#F96D40"} className="mr-1" />
          <Text className="text-base text-gray-800">{likeCount}</Text>
        </View>
        <View className="flex flex-row items-center mr-4">
          <LucideMessageCircle size={18} color="#424242" className="mr-1" />
          <Text className="text-base text-gray-800">{comments}</Text>
        </View>
      </View>

      <View className="flex flex-row items-center mt-3">
        <TouchableOpacity
          className="flex flex-row items-center mr-4"
          onPress={handleLike}
        >
          <Heart size={25} color="#424242" />
          <Text className="text-base text-gray-800 ml-1">Yêu thích</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row items-center"
          onPress={toggleCommentSection}
        >
          <LucideMessageCircle size={25} color="#424242" />
          <Text className="text-base text-gray-800 ml-1">Bình luận</Text>
        </TouchableOpacity>
      </View>

      {/* BottomSheet */}
      <BottomSheet ref={sheetRef} snapPoints={["25%", "50%", "90%"]} index={0}>
        <View style={{ padding: 20 }}>
          <Text>
            Bạn có thể thay đổi nội dung ở đây, ví dụ như hiển thị các bình
            luận.
          </Text>
          <TouchableOpacity onPress={closeBottomSheet}>
            <Text>Đóng BottomSheet</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Actions;
