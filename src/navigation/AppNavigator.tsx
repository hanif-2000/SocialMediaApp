import React, {useState, useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedScreen from '../screens/FeedScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [lastTap, setLastTap] = useState<number | null>(null);
  const feedRef = useRef<any>(null);

  const handleDoubleTapOnFeed = () => {
    const now = Date.now();
    if (lastTap && now - lastTap < 300) {
      if (feedRef.current) {
        feedRef.current.refreshFeed();
      }
    } else {
      setLastTap(now);
    }
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
          listeners={{
            tabPress: () => handleDoubleTapOnFeed(),
          }}
        />
        <Tab.Screen
          name="CreatePost"
          component={CreatePostScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="plus" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="user" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
