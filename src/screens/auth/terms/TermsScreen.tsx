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

// Components
import Button from '../../../components/common/Button';

// Types
import { TermsScreenNavigationProp } from './types';

// Constants
import { TERMS_SECTIONS } from './constants';

// Styles
import { styles } from './TermsScreen.styles';
import { COLORS } from '../../../constants/theme';

// Get screen dimensions for responsive design
const { width } = Dimensions.get('window');
const isTablet = width >= 768;

const TermsScreen: React.FC = () => {
  const navigation = useNavigation<TermsScreenNavigationProp>();
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeSection, setActiveSection] = useState<string>('introduction');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Fungsi untuk kembali ke halaman sebelumnya
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Fungsi untuk scroll ke section tertentu
  const scrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    
    const sectionIndex = TERMS_SECTIONS.findIndex(section => section.id === sectionId);
    
    if (sectionIndex !== -1 && scrollViewRef.current) {
      // Estimasi posisi section berdasarkan index
      // (Ini adalah perkiraan kasar, idealnya kita akan menyimpan refs untuk setiap section)
      const estimatedPosition = sectionIndex * (isTablet ? 400 : 300); // Perkiraan tinggi rata-rata section
      
      scrollViewRef.current.scrollTo({ 
        y: estimatedPosition, 
        animated: true 
      });
    }
  }, []);

  // Efek fade in saat komponen dimuat
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Render table of contents
  const renderTableOfContents = () => (
    <View style={styles.tableOfContents}>
      <Text style={styles.tableOfContentsTitle}>Daftar Isi</Text>
      {TERMS_SECTIONS.map((section) => (
        <TouchableOpacity
          key={section.id}
          style={styles.tableOfContentsItem}
          onPress={() => scrollToSection(section.id)}
          activeOpacity={0.7}
        >
          <View style={styles.bullet} />
          <Text style={[
            styles.tableOfContentsItemText,
            activeSection === section.id && { color: COLORS.primary.main, fontWeight: 'bold' }
          ]}>
            {section.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // Render sections
  const renderSections = () => (
    <>
      {TERMS_SECTIONS.map((section) => (
        <Animated.View 
          key={section.id}
          style={[
            styles.section,
            { opacity: fadeAnim }
          ]}
        >
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.content.map((paragraph, idx) => (
            <Text key={`${section.id}-p-${idx}`} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </Animated.View>
      ))}
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
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
              color={COLORS.primary.main} 
            />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Syarat & Ketentuan</Text>
          
          <View style={styles.spacer} />
        </View>
      </View>
      
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.lastUpdate}>
            Terakhir diperbarui: 1 Juni 2023
          </Text>
          
          {renderTableOfContents()}
          {renderSections()}
          
          {/* Spacing untuk tombol bottom */}
          <View style={{ height: isTablet ? 100 : 80 }} />
        </ScrollView>
        
        <View style={styles.acceptButtonContainer}>
          <Button
            title="Saya Menyetujui Syarat & Ketentuan"
            onPress={handleGoBack}
            useGradient={true}
            gradientColors={[COLORS.primary.main, COLORS.primary.dark]}
            fullWidth
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TermsScreen; 