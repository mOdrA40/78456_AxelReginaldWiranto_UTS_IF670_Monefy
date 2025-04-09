import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileStackParamList } from '../types';

// Import screens
import ProfileScreen from '../../screens/profile/ProfileScreen';
import EditProfileScreen from '../../screens/profile/EditProfileScreen';
import SecurityScreen from '../../screens/profile/SecurityScreen';
import HelpScreen from '../../screens/profile/HelpScreen';
import DeveloperScreen from '../../screens/profile/DeveloperScreen';
import NotificationsScreen from '../../screens/profile/NotificationsScreen';

import { 
  HelpCenterScreen,
  FAQScreen,
  UserGuideScreen
} from '../../screens/profile/help';

const ProfileStack = createStackNavigator<ProfileStackParamList>();
const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="ProfileDetail" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileStack.Screen name="Notifications" component={NotificationsScreen} />
      <ProfileStack.Screen name="Security" component={SecurityScreen} />
      <ProfileStack.Screen name="Developer" component={DeveloperScreen} />
      
      {/* Layar bantuan */}
      <ProfileStack.Screen name="Help" component={HelpScreen} />
      <ProfileStack.Screen name="HelpCenter" component={HelpCenterScreen} />
      <ProfileStack.Screen name="FAQ" component={FAQScreen} />
      <ProfileStack.Screen name="UserGuide" component={UserGuideScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
