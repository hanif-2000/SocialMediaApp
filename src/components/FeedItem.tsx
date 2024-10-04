import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome';

const FeedItem = ({
  item,
  onToggleLike,
}: {
  item: any;
  onToggleLike: () => void;
}) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <Text style={styles.username}>{item.username}</Text>
      </View>
      <FlatList
        horizontal
        data={item.images}
        renderItem={({ item: img }) => (
          <FastImage
            style={styles.image}
            source={{
              uri: img,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
            onError={() => console.log('Image failed to load: ' + img)}
          />
        )}
        keyExtractor={img => img}
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity style={styles.likeButton} onPress={onToggleLike}>
        <Icon
          name={item.liked ? 'heart' : 'heart-o'}
          size={24}
          color={item.liked ? '#FF0000' : '#888'}
        />
      </TouchableOpacity>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 8,
    marginRight: 10,
  },
  description: {
    marginVertical: 8,
    fontSize: 14,
    color: '#333',
  },
  likeButton: {
    padding: 10,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
});

export default FeedItem;
