import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../../constants/theme';

// Tipe data untuk panduan penggunaan
type GuideItem = {
  id: string;
  title: string;
  icon: string;
  content: string[];
};

const UserGuideScreen = () => {
  const navigation = useNavigation();

  // Kembali ke halaman sebelumnya
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Data panduan penggunaan
  const guideItems: GuideItem[] = [
    {
      id: 'guide1',
      title: 'Memulai dengan Monefiy',
      icon: 'rocket',
      content: [
        '1. Buat akun dengan email & password',
        '2. Lengkapi profil Anda',
        '3. Tambahkan saldo awal',
        '4. Jelajahi dashboard keuangan',
        '5. Atur preferensi keamanan'
      ]
    },
    {
      id: 'guide2',
      title: 'Manajemen Transaksi',
      icon: 'list',
      content: [
        '1. Ketuk tab "Transaksi"',
        '2. Ketuk "+" untuk transaksi baru',
        '3. Pilih tipe: Masuk/Keluar',
        '4. Isi jumlah & pilih kategori',
        '5. Tambah deskripsi (opsional)',
        '6. Ketuk "Simpan"'
      ]
    },
    {
      id: 'guide3',
      title: 'Membuat Anggaran',
      icon: 'wallet',
      content: [
        '1. Buka tab "Anggaran"',
        '2. Ketuk "+" untuk anggaran baru',
        '3. Masukkan nama & jumlah',
        '4. Pilih kategori anggaran',
        '5. Atur periode (harian/bulanan)',
        '6. Tetapkan pengulangan jika perlu',
        '7. Ketuk "Simpan"'
      ]
    },
    {
      id: 'guide4',
      title: 'Tujuan Keuangan',
      icon: 'flag',
      content: [
        '1. Ketuk tab "Tujuan"',
        '2. Ketuk "Tambah Tujuan"',
        '3. Beri nama & jumlah target',
        '4. Tentukan tanggal target',
        '5. Pilih ikon untuk tujuan',
        '6. Atur deposit awal (opsional)',
        '7. Tambah dana sewaktu-waktu'
      ]
    },
    {
      id: 'guide5',
      title: 'Melihat Laporan',
      icon: 'bar-chart',
      content: [
        '1. Buka tab "Laporan"',
        '2. Pilih jenis laporan',
        '3. Atur periode laporan',
        '4. Analisis distribusi pengeluaran',
        '5. Ketuk kategori untuk detail',
        '6. Ekspor laporan jika perlu'
      ]
    },
    {
      id: 'guide6',
      title: 'Manajemen Kategori',
      icon: 'grid',
      content: [
        '1. Buka Profil > Kategori',
        '2. Lihat daftar kategori',
        '3. Ketuk "+" untuk kategori baru',
        '4. Pilih tipe (Masuk/Keluar)',
        '5. Atur nama, warna, dan ikon',
        '6. Edit/hapus kategori yang ada'
      ]
    },
    {
      id: 'guide7',
      title: 'Pengaturan Keamanan',
      icon: 'shield-checkmark',
      content: [
        '1. Ketuk tab "Profil"',
        '2. Pilih "Keamanan"',
        '3. Aktifkan PIN untuk aplikasi',
        '4. Atur dan konfirmasi PIN',
        '5. Aktifkan Biometrik (opsional)',
        '6. Atur waktu auto-lock'
      ]
    },
    {
      id: 'guide8',
      title: 'Backup & Restore',
      icon: 'cloud-upload',
      content: [
        '1. Buka Profil > Pengaturan',
        '2. Pilih "Cadangan"',
        '3. Ketuk "Cadangkan Data"',
        '4. Pilih lokasi penyimpanan',
        '5. Pulihkan dari file cadangan',
        '6. Konfirmasi pemulihan'
      ]
    },
  ];

  // Render header
  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={COLORS.text} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Panduan Pengguna</Text>
      <View style={{ width: 24 }} />
    </View>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.surface}
        barStyle="dark-content"
      />
      {renderHeader()}
      
      <ScrollView style={styles.content}>
        <View style={styles.sectionContainer}>
          {guideItems.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInDown.delay(100 + index * 50).springify()}
            >
              <View style={styles.guideItem}>
                <View style={styles.guideHeader}>
                  <View style={styles.guideIconContainer}>
                    <Ionicons
                      name={item.icon as any}
                      size={22}
                      color={COLORS.primary.main}
                    />
                  </View>
                  <Text style={styles.guideTitle}>{item.title}</Text>
                </View>
                <View style={styles.guideContent}>
                  {item.content.map((step, i) => (
                    <Text key={i} style={styles.guideStep}>{step}</Text>
                  ))}
                </View>
              </View>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
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
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
  },
  content: {
    flex: 1,
  },
  sectionContainer: {
    padding: SPACING.md,
  },
  guideItem: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    ...SHADOWS.sm,
  },
  guideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  guideIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary.light + '30',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  guideTitle: {
    ...TYPOGRAPHY.subtitle1,
    color: COLORS.text,
    flex: 1,
  },
  guideContent: {
    marginLeft: SPACING.xs,
  },
  guideStep: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    lineHeight: 22,
    flexWrap: 'wrap',
    paddingRight: SPACING.sm,
  },
});

export default UserGuideScreen; 