import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import UserInfo from "./UserInfo";
import PostImage from "./PostImage";
// import Rating from './Rating';
import Actions from "./Actions";
import PostContent from "./PostContent";

interface PostProps {
  username: string;
  avatarUrl: string;
  time: Date;
  imageUrls: string[];

  likes: number;
  comments: number;
  content: string;
  onCommentPress: () => void; // <-- thêm dòng này
  onEditPress?: () => void;
}

const PostCard: React.FC<PostProps> = ({
  username,
  avatarUrl,
  time,
  imageUrls,
  likes,
  comments,
  content,
  onCommentPress, // <-- nhận prop
  onEditPress,
}) => {
  return (
    <View className="w-full mb-2 bg-white p-2 shadow-black/10 shadow-md">
      {/* User Info */}
      <UserInfo
        username={username}
        time={time}
        avatarUrl={avatarUrl}
        onEditPress={onEditPress}
      />

      {/* Post Image */}
      <PostImage imageUrls={imageUrls} />

      {/* Rating */}
      {/* <Rating score={score} /> */}

      {/* Actions (Like, Comment) */}
      <Actions
        likes={likes}
        comments={comments}
        onCommentPress={onCommentPress} // <-- truyền xuống cho Actions
      />

      {/* Post Content */}
      <PostContent content={content} />
    </View>
  );
};

export default PostCard;
