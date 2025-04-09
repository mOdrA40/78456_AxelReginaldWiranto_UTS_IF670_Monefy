import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';

// Types
import { DeveloperScreenNavigationProp } from './types/developer.types';

// Styles
import { developerStyles as styles } from './styles';

// Components
import { DeveloperHeader, DeveloperProfile, SocialMediaItem } from './components/developer';

// Constants
import { DEVELOPER_INFO, SOCIAL_MEDIA_ITEMS } from './constants/developer.constants';
import { COLORS } from '../../constants/theme';

const DeveloperScreen = ({ navigation }: { navigation: DeveloperScreenNavigationProp }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Tidak dapat membuka URL');
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan saat membuka URL');
      console.error(error);
    }
  };

  // Mendapatkan tahun saat ini secara dinamis
  const currentYear = new Date().getFullYear();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Header */}
        <DeveloperHeader onGoBack={handleGoBack} />
        
        <ScrollView>
          {/* Profile Section */}
          <DeveloperProfile developerInfo={DEVELOPER_INFO} />
          
          {/* About Section */}
          <Animated.View
            entering={FadeInDown.delay(600).springify()}
            style={styles.sectionContainer}
          >
            <Text style={styles.sectionTitle}>Tentang Saya</Text>
            <Text style={styles.descriptionText}>
              {DEVELOPER_INFO.description}
            </Text>
          </Animated.View>
          
          {/* Social Media Section */}
          <Animated.View
            entering={FadeInDown.delay(700).springify()}
            style={styles.sectionContainer}
          >
            <Text style={styles.sectionTitle}>Media Sosial</Text>
            <View style={styles.socialContainer}>
              {SOCIAL_MEDIA_ITEMS.map((item, index) => (
                <SocialMediaItem
                  key={item.platform}
                  item={item}
                  index={index}
                  onPress={handleOpenLink}
                />
              ))}
            </View>
          </Animated.View>
          
          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Monefiy v1.0.0</Text>
            <Text style={styles.footerSubtext}>© {currentYear} Axel Reginald Wiranto</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DeveloperScreen;
