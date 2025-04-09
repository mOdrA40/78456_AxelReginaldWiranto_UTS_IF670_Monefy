import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


import Button from '../../../components/common/Button';


import { PrivacyPolicyScreenNavigationProp } from './types';


import { PRIVACY_SECTIONS } from './constants';


import { styles } from './PrivacyPolicyScreen.styles';
import { COLORS, SPACING } from '../../../constants/theme';


const { width } = Dimensions.get('window');
const isTablet = width >= 768;

const PrivacyPolicyScreen: React.FC = () => {
  const navigation = useNavigation<PrivacyPolicyScreenNavigationProp>();
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeSection, setActiveSection] = useState<string>('introduction');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const scrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    
    const sectionIndex = PRIVACY_SECTIONS.findIndex(section => section.id === sectionId);
    
    if (sectionIndex !== -1 && scrollViewRef.current) {
    
      const estimatedPosition = 
        (isTablet ? 250 : 200) + 
        (isTablet ? 380 : 300) + 
        (sectionIndex * (isTablet ? 400 : 300));
      
      scrollViewRef.current.scrollTo({ 
        y: estimatedPosition, 
        animated: true 
      });
    }
  }, []);


  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, translateY]);

  const renderTableOfContents = () => (
    <Animated.View 
      style={[
        styles.tableOfContents,
        {
          opacity: fadeAnim,
          transform: [{ translateY }]
        }
      ]}
    >
      <Text style={styles.tableOfContentsTitle}>Daftar Isi</Text>
      {PRIVACY_SECTIONS.map((section, index) => (
        <TouchableOpacity
          key={section.id}
          style={[
            styles.tableOfContentsItem,
            index === PRIVACY_SECTIONS.length - 1 && { borderBottomWidth: 0 },
          ]}
          onPress={() => scrollToSection(section.id)}
          activeOpacity={0.7}
        >
          <View style={styles.tableOfContentsIcon}>
            <Text style={styles.tableOfContentsItemNumber}>{index + 1}</Text>
          </View>
          <Text style={styles.tableOfContentsItemText}>
            {section.title}
          </Text>
          <Ionicons 
            name="chevron-forward" 
            size={isTablet ? 20 : 16} 
            color={COLORS.neutral[300]} 
          />
        </TouchableOpacity>
      ))}
    </Animated.View>
  );

  const renderSections = () => (
    <View style={styles.sectionsContainer}>
      {PRIVACY_SECTIONS.map((section, index) => (
        <Animated.View 
          key={section.id}
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ 
                translateY: Animated.multiply(
                  translateY,
                  new Animated.Value(1 + (index * 0.2))
                )
              }]
            }
          ]}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.sectionBadge}>
              <Text style={styles.sectionBadgeText}>{index + 1}</Text>
            </View>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>

          {section.content.map((paragraph, idx) => {
            // Cek apakah paragraf adalah bullet point
            if (paragraph.startsWith('•')) {
              return (
                <Text key={`${section.id}-p-${idx}`} style={styles.bullet}>
                  {paragraph}
                </Text>
              );
            }
            return (
              <Text key={`${section.id}-p-${idx}`} style={styles.paragraph}>
                {paragraph}
              </Text>
            );
          })}

          {index < PRIVACY_SECTIONS.length - 1 && <View style={styles.divider} />}
        </Animated.View>
      ))}
    </View>
  );

  // Render hero section
  const renderHero = () => (
    <View style={styles.hero}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.heroText}>
          Kami menghargai privasi Anda dan berkomitmen untuk melindungi informasi pribadi Anda
        </Text>
        <Text style={styles.lastUpdate}>
          Terakhir diperbarui: 1 Juni 2023
        </Text>
      </Animated.View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={COLORS.primary.main} 
      />
      
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={handleGoBack}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Ionicons 
              name="arrow-back" 
              size={isTablet ? 28 : 24} 
              color={COLORS.white} 
            />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Kebijakan Privasi</Text>
          
          <View style={styles.spacer} />
        </View>
      </View>
      
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {renderHero()}
          {renderTableOfContents()}
          {renderSections()}
          
          {/* Spacing untuk tombol bottom */}
          <View style={{ height: isTablet ? 100 : 80 }} />
        </ScrollView>
        
        <View style={styles.acceptButtonContainer}>
          <Button
            title="Saya Menyetujui Kebijakan Privasi"
            onPress={handleGoBack}
            useGradient={true}
            gradientColors={[COLORS.primary.light, COLORS.primary.main, COLORS.primary.dark]}
            fullWidth
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen; 