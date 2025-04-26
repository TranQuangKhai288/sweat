import React from 'react';
import {Dimensions, FlatList, Image, View, StyleSheet} from 'react-native';

interface PostImageProps {
  imageUrls: string[]; // Array of image URLs
}

const PostImage: React.FC<PostImageProps> = ({imageUrls}) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <FlatList
        data={imageUrls}
        renderItem={({item}) => (
          <Image
            source={{uri: item}}
            style={[styles.image, {width: screenWidth - 20}]} // -20 to account for padding
            resizeMode="cover"
          />
        )}
        keyExtractor={(item, index) => String(index)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true} // This ensures one image at a time
        snapToInterval={screenWidth - 20} // Snap to image width
        snapToAlignment="center" // Center the images
        decelerationRate="fast" // Improve snapping behavior
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  image: {
    height: '100%', // Adjust height as needed
    backgroundColor: 'gray', // Fallback color in case image fails to load
    aspectRatio: 1, // You can adjust this ratio as needed (1:1 is square)
    borderRadius: 16,
  },
});

export default PostImage;
