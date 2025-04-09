import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Hooks
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import { useResponsive } from '../../utils/responsive';

// Constants
import { COLORS } from '../../constants/theme';

// Types
import { ProfileScreenNavigationProp, ProfileMenuItem } from './types';

// Styles
import { styles } from './styles/ProfileScreen.styles';

const ProfileScreen = () => {
  // Hooks
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { user, userData, loading: isLoading, logout, updateUserProfile } = useAuth();
  const { currentTheme, toggleTheme } = useTheme();
  const { isTablet, scaleIconSize } = useResponsive();

  // State untuk menyimpan inisial nama pengguna
  const [userInitials, setUserInitials] = useState<string>('');
  
  // State untuk menampilkan loading spinner pada menu item
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  // Mendapatkan inisial dari nama pengguna
  useEffect(() => {
    if (user?.displayName) {
      const names = user.displayName.split(' ');
      let initials = names[0].charAt(0).toUpperCase();
      
      // Tambahkan inisial nama terakhir jika ada
      if (names.length > 1) {
        initials += names[names.length - 1].charAt(0).toUpperCase();
      }
      
      setUserInitials(initials);
    } else {
      setUserInitials('U');
    }
    
    // Debug - log informasi user
    console.log('User data loaded:', user);
  }, [user?.displayName]);
  
  // Refresh profile ketika screen fokus
  useEffect(() => {
    // Selalu load data terbaru saat screen mendapat fokus
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Profile screen focused, refreshing user data...');
      // Tidak perlu refreshUser karena sudah ada listener auth state
    });

    return unsubscribe;
  }, [navigation]);

  // Navigasi ke halaman edit profile
  const handleEditProfile = useCallback(() => {
    navigation.navigate('EditProfile');
  }, [navigation]);

  // Navigasi ke halaman notifikasi
  const handleNotificationsPress = useCallback(() => {
    navigation.navigate('Notifications');
  }, [navigation]);

  // Navigasi ke halaman keamanan
  const handleSecurityPress = useCallback(() => {
    navigation.navigate('Security');
  }, [navigation]);
  
  // Navigasi ke halaman help
  const handleHelpPress = useCallback(() => {
    navigation.navigate('Help');
  }, [navigation]);
  
  // Navigasi ke halaman developer
  const handleDeveloperPress = useCallback(() => {
    navigation.navigate('Developer');
  }, [navigation]);

  // Handle logout
  const handleLogout = useCallback(async () => {
    Alert.alert(
      'Konfirmasi Logout',
      'Apakah Anda yakin ingin keluar?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            setLoadingAction('logout');
            try {
              console.log('Menjalankan proses logout dari ProfileScreen...');
              await logout();
              console.log('Proses logout berhasil dijalankan');
              // Navigasi akan ditangani oleh auth provider
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Gagal logout. Silakan coba lagi.');
            } finally {
              setLoadingAction(null);
            }
          },
        },
      ],
      { cancelable: true }
    );
  }, [logout]);
  
  // Toggle dark/light mode
  const handleToggleTheme = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);
  
  // Daftar menu item
  const menuItems: ProfileMenuItem[] = [
    {
      id: 'notifications',
      icon: 'notifications-outline',
      title: 'Notifikasi',
      subtitle: 'Kelola pengaturan notifikasi',
      onPress: handleNotificationsPress,
    },
    {
      id: 'security',
      icon: 'shield-checkmark-outline',
      title: 'Keamanan',
      subtitle: 'Kata sandi & otentikasi',
      onPress: handleSecurityPress,
    },
    {
      id: 'help',
      icon: 'help-circle-outline',
      title: 'Bantuan & Panduan',
      subtitle: 'FAQ, kontak & panduan pengguna',
      onPress: handleHelpPress,
    },
    {
      id: 'developer',
      icon: 'code-slash-outline',
      title: 'Informasi Pengembang',
      subtitle: 'Tentang aplikasi & pengembang',
      onPress: handleDeveloperPress,
    },
    {
      id: 'logout',
      icon: 'log-out-outline',
      title: 'Keluar',
      subtitle: 'Keluar dari akun Anda',
      onPress: handleLogout,
      danger: true,
    },
  ];
  
  // Jika sedang loading, tampilkan indicator
  if (isLoading && !user) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size={isTablet ? 'large' : 'small'} color={COLORS.primary.main} />
        <Text style={{ marginTop: 16, color: COLORS.textSecondary }}>Memuat profil...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: COLORS.primary.main }]}>
          <View style={styles.profileInfo}>
            {user?.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
            ) : (
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>{userInitials}</Text>
              </View>
            )}

            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user?.displayName || 'Pengguna'}</Text>
              <Text style={styles.userEmail}>{user?.email || 'email@example.com'}</Text>
              {user?.metadata?.lastSignInTime && (
                <Text style={styles.userHint}>
                  Terakhir masuk: {new Date(user.metadata.lastSignInTime).toLocaleDateString('id-ID')}
                </Text>
              )}
            </View>

            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Ionicons name="pencil" size={scaleIconSize(16)} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
              disabled={loadingAction === item.id}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuItemIcon, item.danger && styles.dangerIcon]}>
                  <Ionicons 
                    name={item.icon as any} 
                    size={scaleIconSize(24)} 
                    color={item.danger ? COLORS.danger[600] : COLORS.primary.main} 
                  />
                </View>
                <View style={styles.menuItemTextContainer}>
                  <Text style={[styles.menuItemTitle, item.danger && styles.dangerText]}>
                    {item.title}
                  </Text>
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <View style={styles.menuItemRight}>
                {loadingAction === item.id ? (
                  <ActivityIndicator size="small" color={COLORS.primary.main} />
                ) : (
                  <Ionicons
                    name="chevron-forward"
                    size={scaleIconSize(20)}
                    color={COLORS.neutral[400]}
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* App Version */}
        <Text style={styles.version}>Monefiy v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;