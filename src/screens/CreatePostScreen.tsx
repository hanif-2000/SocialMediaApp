import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Image, Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {mockFeedData} from '../data/mockData'; // Import mock feed data

const CreatePostScreen = ({navigation}: {navigation: any}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const handleSelectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = () => {
    if (!title || !description || !image) {
      Alert.alert('Please fill out all fields and select an image');
      return;
    }

    // Create new post object
    const newPost = {
      id: (mockFeedData.length + 1).toString(), 
      username: 'user1', 
      avatar: 'https://example.com/avatar1.jpg',
      images: [image],
      description,
      liked: false,
      date: new Date().toLocaleString(),
    };

    // Add new post to the beginning of mockFeedData
    mockFeedData.unshift(newPost);

    console.log(mockFeedData);

    // Reset input fields after submitting
    setTitle('');
    setDescription('');
    setImage(null);

    // Navigate back to Feed screen after submitting
    navigation.navigate('Feed');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button title="Select Image" onPress={handleSelectImage} />
      {image && <Image source={{uri: image}} style={styles.image} />}
      <Button title="Create Post" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});

export default CreatePostScreen;
