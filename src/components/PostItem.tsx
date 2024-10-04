import React from 'react';
import { View, Text, Image, Button, StyleSheet, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';

interface PostItemProps {
  username: string;
  avatar: string;
  images: string[];
  description: string;
  date: string;
  liked: boolean;
  onLikeToggle: () => void;
}

const PostItem: React.FC<PostItemProps> = ({
  username,
  avatar,
  images,
  description,
  date,
  liked,
  onLikeToggle,
}) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text>{username}</Text>
      </View>
      <FlatList
        horizontal
        data={images}
        renderItem={({ item }) => <FastImage source={{ uri: item }} style={styles.image} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text>{description}</Text>
      <Button title={liked ? 'Unlike' : 'Like'} onPress={onLikeToggle} />
      <Text>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: { padding: 10 },
  header: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  image: { width: 300, height: 200, marginRight: 10 },
});

export default PostItem;