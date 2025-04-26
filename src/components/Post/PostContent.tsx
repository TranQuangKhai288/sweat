import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface PostContentProps {
  content: string;
}

const PostContent: React.FC<PostContentProps> = ({content}) => {
  const maxLength = 100;
  const [isExpanded, setIsExpanded] = useState(false);

  const isLongContent = content.length > maxLength;
  const displayedContent =
    isExpanded || !isLongContent
      ? content
      : content.slice(0, maxLength) + '...';

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        {displayedContent}
        {isLongContent && (
          <Text style={styles.readMoreText} onPress={handleReadMore}>
            {isExpanded ? 'Ẩn bớt' : 'Đọc thêm'}
          </Text>
        )}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  content: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 5,
  },
  readMoreText: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
    marginLeft: 5,
  },
});

export default PostContent;
