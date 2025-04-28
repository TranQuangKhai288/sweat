import React, { useRef, useState, useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { Heart, LucideMessageCircle } from "lucide-react-native";

interface ActionsProps {
  likes: number;
  comments: number;
  onCommentPress: () => void; // <-- thêm prop này
}

const Actions: React.FC<ActionsProps> = ({
  likes,
  comments,
  onCommentPress,
}) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);

  // BottomSheet setup

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <View className="flex flex-1 flex-col my-3">
      <View className="flex flex-row items-center">
        <View className="flex flex-row items-center mr-4">
          <Heart
            size={18}
            color={isLiked ? "#F96D40" : "#424242"}
            fill={isLiked ? "#F96D40" : "transparent"}
          />
          <Text className="text-base text-gray-800 ml-1">{likeCount}</Text>
        </View>
        <View className="flex flex-row items-center mr-4">
          <LucideMessageCircle size={18} color="#424242" />
          <Text className="text-base text-gray-800 ml-1">{comments}</Text>
        </View>
      </View>

      <View className="flex flex-row items-center mt-3">
        <TouchableOpacity
          className="flex flex-row items-center mr-4"
          onPress={handleLike}
        >
          <Heart
            size={25}
            color={isLiked ? "#F96D40" : "#424242"}
            fill={isLiked ? "#F96D40" : "transparent"}
          />
          <Text className="text-base text-gray-800 ml-1">Yêu thích</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row items-center"
          onPress={onCommentPress} // <-- gọi hàm khi bấm bình luận
        >
          <LucideMessageCircle size={25} color="#424242" />
          <Text className="text-base text-gray-800 ml-1">Bình luận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Actions;
