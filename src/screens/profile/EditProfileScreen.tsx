import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Hooks
import useAuth from '../../hooks/useAuth';
import { useResponsive } from '../../utils/responsive';

// Constants
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants/theme';

// Types
import { ProfileScreenNavigationProp } from './types';

const EditProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { user, updateUserProfile, loading: isLoading } = useAuth();
  const { isTablet, scaleFontSize, scaleSpacing, scaleIconSize } = useResponsive();

  // State untuk form
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [avatarInitials, setAvatarInitials] = useState('');
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Load data saat component mount
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
      setPhotoURL(user.photoURL || null);
      
      // Set avatar initials dari nama
      if (user.displayName) {
        const names = user.displayName.split(' ');
        let initials = names[0].charAt(0).toUpperCase();
        
        if (names.length > 1) {
          initials += names[names.length - 1].charAt(0).toUpperCase();
        }
        
        setAvatarInitials(initials);
      }
    }
  }, [user]);
  
  // Handle update profile
  const handleUpdateProfile = useCallback(async () => {
    // Validasi nama
    if (!displayName.trim()) {
      setError('Nama tidak boleh kosong');
      return;
    }

    try {
      setIsLoadingForm(true);
      setError(null);
      
      // Update profile
      await updateUserProfile({
        displayName: displayName.trim()
      });
      
      // Kembali ke halaman sebelumnya
      navigation.goBack();
    } catch (e) {
      setError('Gagal memperbarui profil');
      console.error('Error updating profile:', e);
    } finally {
      setIsLoadingForm(false);
    }
  }, [displayName, navigation, updateUserProfile]);
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons 
              name="arrow-back" 
              size={scaleIconSize(24)} 
              color={COLORS.text} 
            />
          </TouchableOpacity>
          
          <Text style={[styles.headerTitle, isTablet && styles.tabletHeaderTitle]}>
            Edit Profil
          </Text>
          
          <View style={{ width: scaleIconSize(24) }} />
        </View>
        
        <ScrollView 
          style={styles.content}
          contentContainerStyle={[
            styles.contentContainer,
            isTablet && styles.tabletContentContainer
          ]}
        >
          <View style={[styles.form, isTablet && styles.tabletForm]}>
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
            
            <View style={styles.inputGroup}>
              <Text style={[styles.label, isTablet && styles.tabletLabel]}>
                Nama Lengkap
              </Text>
              <TextInput 
                style={[styles.input, isTablet && styles.tabletInput]}
                value={displayName}
                onChangeText={setDisplayName}
                placeholder="Masukkan nama lengkap"
                placeholderTextColor={COLORS.neutral[400]}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.label, isTablet && styles.tabletLabel]}>
                Email
              </Text>
              <TextInput 
                style={[
                  styles.input, 
                  styles.disabledInput,
                  isTablet && styles.tabletInput
                ]}
                value={email}
                editable={false}
                placeholder="Email tidak dapat diubah"
                placeholderTextColor={COLORS.neutral[400]}
              />
              <Text style={styles.helperText}>
                Email tidak dapat diubah
              </Text>
            </View>
            
            <TouchableOpacity 
              style={[
                styles.saveButton,
                isTablet && styles.tabletSaveButton,
                isLoadingForm && styles.disabledButton
              ]}
              onPress={handleUpdateProfile}
              disabled={isLoadingForm}
            >
              {isLoadingForm ? (
                <ActivityIndicator color={COLORS.white} size="small" />
              ) : (
                <Text style={[
                  styles.saveButtonText,
                  isTablet && styles.tabletSaveButtonText
                ]}>
                  Simpan Perubahan
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
  },
  tabletHeaderTitle: {
    ...TYPOGRAPHY.h2,
    fontSize: TYPOGRAPHY.fontSize.xxxl,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.lg,
  },
  tabletContentContainer: {
    padding: SPACING.xl,
    maxWidth: 700,
    alignSelf: 'center',
    width: '100%',
  },
  form: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  tabletForm: {
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    ...TYPOGRAPHY.subtitle2,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  tabletLabel: {
    ...TYPOGRAPHY.subtitle1,
    marginBottom: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    color: COLORS.text,
    ...TYPOGRAPHY.body1,
  },
  tabletInput: {
    padding: SPACING.lg,
    ...TYPOGRAPHY.h3,
  },
  disabledInput: {
    backgroundColor: COLORS.neutral[100],
    color: COLORS.neutral[500],
  },
  helperText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.neutral[500],
    marginTop: SPACING.xs,
  },
  saveButton: {
    backgroundColor: COLORS.primary.main,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  tabletSaveButton: {
    padding: SPACING.lg,
    marginTop: SPACING.xl,
  },
  saveButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
  },
  tabletSaveButtonText: {
    ...TYPOGRAPHY.h3,
  },
  disabledButton: {
    backgroundColor: COLORS.neutral[400],
  },
  errorContainer: {
    backgroundColor: COLORS.danger[100],
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
  },
  errorText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.danger[600],
  },
});

export default EditProfileScreen;
