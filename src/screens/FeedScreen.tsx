import React, {useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {mockFeedData} from '../data/mockData';
import FeedItem from '../components/FeedItem';

const FeedScreen = () => {
  const [feed, setFeed] = useState(mockFeedData);

  const toggleLike = (id: string) => {
    setFeed(prevData =>
      prevData.map(item =>
        item.id === id ? {...item, liked: !item.liked} : item,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={feed}
        renderItem={({item}) => (
          <FeedItem
            item={item}
            onToggleLike={() => toggleLike(item.id)}
          />
        )}
        keyExtractor={item => item.id}
        style={styles.feedContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  feedContainer: {
    padding: 10,
  },
});

export default FeedScreen;
