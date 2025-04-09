import React, { useState } from 'react';
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

// Tipe data untuk FAQ
type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

const FAQScreen = () => {
  const navigation = useNavigation();
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

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
    {
      id: 'faq7',
      question: 'Bisakah saya mengatur pengingat untuk pembayaran rutin?',
      answer: 'Ya, Anda dapat mengatur pengingat untuk transaksi berulang melalui menu Transaksi. Pilih "Transaksi Berulang", atur jumlah, kategori, frekuensi (mingguan, bulanan), dan simpan. Monefiy akan mengirimkan notifikasi saat pembayaran jatuh tempo.'
    },
    {
      id: 'faq8',
      question: 'Bagaimana jika saya lupa PIN?',
      answer: 'Jika Anda lupa PIN, buka menu Profil > Keamanan > Reset PIN. Anda perlu memverifikasi identitas melalui email atau autentikasi biometrik (jika diaktifkan). Setelah verifikasi, Anda dapat membuat PIN baru.'
    },
    {
      id: 'faq9',
      question: 'Bisakah saya ekspor data keuangan saya?',
      answer: 'Ya, Monefiy memungkinkan Anda mengekspor data keuangan dalam format CSV atau PDF. Buka tab Laporan, pilih periode yang ingin diekspor, ketuk ikon Ekspor, pilih format, dan data akan dikirim ke email terdaftar Anda.'
    },
    {
      id: 'faq10',
      question: 'Apakah Monefiy mendukung multi-mata uang?',
      answer: 'Saat ini, Monefiy mendukung mata uang utama (IDR, USD, EUR). Anda dapat mengatur mata uang default di menu Profil > Pengaturan > Mata Uang. Fitur konversi mata uang akan tersedia di pembaruan mendatang.'
    },
  ];

  // Render header
  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={COLORS.text} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>FAQ</Text>
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
          {faqItems.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInDown.delay(100 + index * 50).springify()}
            >
              <TouchableOpacity
                style={styles.faqItem}
                onPress={() => toggleFAQ(item.id)}
                activeOpacity={0.7}
              >
                <View style={styles.faqHeader}>
                  <Text style={styles.faqQuestion}>{item.question}</Text>
                  <Ionicons
                    name={expandedFAQ === item.id ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={COLORS.textSecondary}
                  />
                </View>
                {expandedFAQ === item.id && (
                  <Text style={styles.faqAnswer}>{item.answer}</Text>
                )}
              </TouchableOpacity>
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
  faqItem: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    ...SHADOWS.sm,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    ...TYPOGRAPHY.subtitle1,
    color: COLORS.text,
    flex: 1,
  },
  faqAnswer: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
    lineHeight: 20,
  },
});

export default FAQScreen; 