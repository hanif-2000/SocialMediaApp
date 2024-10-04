import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
} from 'react-native';
import {mockProfileData} from '../data/mockData';
import {launchImageLibrary} from 'react-native-image-picker';

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState(mockProfileData);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(profileData.username);
  const [newBio, setNewBio] = useState(profileData.bio);
  const [scrollY] = useState(new Animated.Value(0));

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    setProfileData(prevState => ({
      ...prevState,
      username: newUsername,
      bio: newBio,
    }));
    setIsEditing(false);
  };

  const handleSelectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setProfileData(prevState => ({
          ...prevState,
          avatar: response.assets[0].uri,
        }));
      }
    });
  };

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [200, 80],
    extrapolate: 'clamp',
  });

  const {username, avatar, bio, followers, posts, postsImages} = profileData;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, {height: headerHeight}]}>
        <TouchableOpacity onPress={handleSelectImage}>
          <Image source={{uri: avatar}} style={styles.avatar} />
        </TouchableOpacity>
        {isEditing ? (
          <TextInput
            value={newUsername}
            onChangeText={setNewUsername}
            style={styles.usernameInput}
            placeholder="Enter username"
          />
        ) : (
          <Text style={styles.username}>{username}</Text>
        )}
        <View style={styles.statsContainer}>
          <View style={{height: 20, alignItems: 'center'}}>
            <Text style={styles.statsNo}>{posts} </Text>
            <Text style={styles.statsText}> Posts</Text>
          </View>
          <View style={{height: 20, alignItems: 'center'}}>
            <Text style={styles.statsNo}>{followers} </Text>
            <Text style={styles.statsText}> Followers</Text>
          </View>
          <View style={{height: 20, alignItems: 'center'}}>
            <Text style={styles.statsNo}>{followers} </Text>
            <Text style={styles.statsText}> Following</Text>
          </View>
        </View>
      </Animated.View>

      {/* Bio Section */}
      <View style={styles.bioContainer}>
        {isEditing ? (
          <TextInput
            value={newBio}
            onChangeText={setNewBio}
            style={styles.bioInput}
            placeholder="Enter your bio"
            multiline
          />
        ) : (
          <Text style={styles.bio}>{bio}</Text>
        )}
      </View>

      {/* Edit/Save Button */}
      {isEditing ? (
        <TouchableOpacity onPress={handleSaveProfile} style={styles.editButton}>
          <Text style={styles.editButtonText}>Save</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleEditToggle} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      )}

      {/* Scrollable Posts Grid */}
      <ScrollView
        style={styles.postsContainer}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        <FlatList
          data={postsImages}
          renderItem={({item}) => (
            <Image source={{uri: item}} style={styles.postImage} />
          )}
          keyExtractor={item => item}
          numColumns={3}
          contentContainerStyle={styles.postsGrid}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    zIndex: 100,
    paddingVertical: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
  },
  usernameInput: {
    fontWeight: 'bold',
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 5,
    width: '60%',
    textAlign: 'center',
    paddingVertical: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 5,
  },
  statsNo: {
    fontSize: 16,
    color: '#000',
  },
  statsText: {
    fontSize: 16,
    color: '#888',
  },
  bioContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  bio: {
    fontSize: 16,
    color: '#333',
  },
  bioInput: {
    textAlign: 'center',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '80%',
    marginBottom: 10,
    paddingVertical: 6,
  },
  editButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    margin: 15,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  postsContainer: {
    flex: 1,
    marginTop: 10,
  },
  postsGrid: {
    paddingBottom: 50,
  },
  postImage: {
    width: '48%',
    aspectRatio: 1,
    margin: 2,
    borderRadius: 5,
  },
});

export default ProfileScreen;
