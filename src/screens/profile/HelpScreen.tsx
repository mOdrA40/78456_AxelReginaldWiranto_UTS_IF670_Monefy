import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

// Types
import { HelpScreenNavigationProp, FAQItem, GuideItem } from './types/help.types';

// Styles
import { helpStyles as styles } from './styles';

// Components
import { FAQItem as FAQItemComponent, GuideItem as GuideItemComponent, TabSelector } from './components/help';

// Constants
import { COLORS } from '../../constants/theme';

const HelpScreen = () => {
  const navigation = useNavigation<HelpScreenNavigationProp>();
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'faq' | 'guide'>('faq');

  // Kembali ke halaman sebelumnya
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Toggle FAQ
  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  // Data FAQ
  const faqItems: FAQItem[] = [
    {
      id: 'faq1',
      question: 'Apa itu Monefiy?',
      answer: 'Monefiy adalah aplikasi keuangan pribadi yang membantu Anda melacak pengeluaran, membuat anggaran, mengelola tabungan, dan mencapai tujuan keuangan. Aplikasi ini dirancang untuk membantu Anda mengelola uang dengan lebih baik dan membuat keputusan keuangan yang cerdas.'
    },
    {
      id: 'faq2',
      question: 'Bagaimana cara membuat anggaran?',
      answer: 'Untuk membuat anggaran, pergi ke tab "Anggaran" lalu ketuk tombol "+" di pojok kanan bawah. Atur jumlah anggaran, pilih kategori, tentukan periode (harian, mingguan, bulanan), dan simpan. Anda dapat membuat beberapa anggaran untuk kategori yang berbeda.'
    },
    {
      id: 'faq3',
      question: 'Bagaimana cara menambahkan transaksi?',
      answer: 'Ketuk tab "Transaksi" lalu ketuk tombol "+" di tengah menu bawah. Pilih tipe transaksi (pemasukan atau pengeluaran), masukkan jumlah, pilih kategori, tambahkan deskripsi, dan simpan. Transaksi akan tercatat dan mempengaruhi saldo dan anggaran Anda.'
    },
    {
      id: 'faq4',
      question: 'Bagaimana cara mengatur tujuan keuangan?',
      answer: 'Buka tab "Tujuan" lalu ketuk "Tambah Tujuan". Berikan nama tujuan, tentukan jumlah target, atur tanggal target, pilih ikon, dan simpan. Anda bisa melihat progres dan menambahkan dana ke tujuan kapan saja.'
    },
    {
      id: 'faq5',
      question: 'Apakah data saya aman?',
      answer: 'Ya, Monefiy menggunakan Firebase Authentication dan Firestore untuk menyimpan data Anda dengan aman. Anda juga bisa mengaktifkan PIN atau biometrik untuk keamanan tambahan melalui menu Keamanan di halaman Profil.'
    },
    {
      id: 'faq6',
      question: 'Bagaimana cara melihat laporan keuangan?',
      answer: 'Buka tab "Laporan" untuk melihat ringkasan keuangan Anda. Anda dapat melihat grafik pengeluaran dan pemasukan, analisis kategori, dan tren pengeluaran berdasarkan periode yang dipilih (minggu, bulan, tahun).'
    },
  ];

  // Data panduan penggunaan
  const guideItems: GuideItem[] = [
    {
      id: 'guide1',
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
      id: 'guide2',
      title: 'Membuat Anggaran',
      icon: 'wallet',
      content: [
        '1. Buka tab "Anggaran"',
        '2. Ketuk "+" untuk anggaran baru',
        '3. Masukkan nama & jumlah',
        '4. Pilih kategori anggaran',
        '5. Atur periode (harian/bulanan)',
        '6. Ketuk "Simpan"'
      ]
    },
    {
      id: 'guide3',
      title: 'Tujuan Keuangan',
      icon: 'flag',
      content: [
        '1. Ketuk tab "Tujuan"',
        '2. Ketuk "Tambah Tujuan"',
        '3. Beri nama & jumlah target',
        '4. Tentukan tanggal target',
        '5. Pilih ikon untuk tujuan',
        '6. Ketuk "Simpan"'
      ]
    },
    {
      id: 'guide4',
      title: 'Melihat Laporan',
      icon: 'bar-chart',
      content: [
        '1. Buka tab "Laporan"',
        '2. Pilih jenis laporan',
        '3. Atur periode laporan',
        '4. Analisis distribusi pengeluaran',
        '5. Ketuk kategori untuk detail'
      ]
    },
    {
      id: 'guide5',
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
  ];

  // Render header
  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={COLORS.text} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Pusat Bantuan</Text>
      <View style={{ width: 24 }} />
    </View>
  );

  // Render tabs
  const renderTabs = () => (
    <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
  );

  // Render FAQ
  const renderFAQ = () => (
    <View style={styles.sectionContainer}>
      {faqItems.map((item, index) => (
        <FAQItemComponent
          key={item.id}
          item={item}
          index={index}
          expandedFAQ={expandedFAQ}
          toggleFAQ={toggleFAQ}
        />
      ))}
    </View>
  );

  // Render panduan penggunaan
  const renderGuide = () => (
    <View style={styles.sectionContainer}>
      {guideItems.map((item, index) => (
        <GuideItemComponent
          key={item.id}
          item={item}
          index={index}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.surface}
        barStyle="dark-content"
      />
      {renderHeader()}
      {renderTabs()}

      <ScrollView style={styles.content}>
        {activeTab === 'faq' && renderFAQ()}
        {activeTab === 'guide' && renderGuide()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpScreen;