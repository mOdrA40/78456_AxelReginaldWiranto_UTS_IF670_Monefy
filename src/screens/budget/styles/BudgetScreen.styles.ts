import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../../constants/theme';

// Menghitung padding untuk menghindari status bar
const STATUSBAR_HEIGHT = StatusBar.currentHeight || (Platform.OS === 'ios' ? 44 : 0);

// Get screen dimensions for responsive design
const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: isTablet ? SPACING.xl : SPACING.lg,
    paddingVertical: isTablet ? SPACING.lg : SPACING.md,
    paddingTop: (isTablet ? SPACING.lg : SPACING.md) + STATUSBAR_HEIGHT, // Tambahkan padding top untuk menghindari status bar
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.xxxl : TYPOGRAPHY.fontSize.xl,
  },
  addButton: {
    width: isTablet ? 48 : 40,
    height: isTablet ? 48 : 40,
    borderRadius: isTablet ? 24 : 20,
    backgroundColor: COLORS.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: isTablet ? SPACING.xl : SPACING.lg,
    paddingVertical: isTablet ? SPACING.lg : SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  monthText: {
    ...TYPOGRAPHY.subtitle1,
    color: COLORS.text,
    fontWeight: '600',
    fontSize: isTablet ? TYPOGRAPHY.fontSize.lg : TYPOGRAPHY.fontSize.md,
  },
  monthButton: {
    padding: isTablet ? SPACING.sm : SPACING.xs,
  },
  content: {
    flex: 1,
    padding: isTablet ? SPACING.lg : SPACING.md,
    maxWidth: isTablet ? 700 : undefined,
    alignSelf: isTablet ? 'center' : undefined,
    width: isTablet ? '100%' : undefined,
  },
  categoryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: isTablet ? SPACING.lg : SPACING.md,
    marginBottom: isTablet ? SPACING.lg : SPACING.md,
    ...SHADOWS.sm,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isTablet ? SPACING.sm : SPACING.xs,
  },
  categoryName: {
    ...TYPOGRAPHY.subtitle1,
    color: COLORS.text,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.lg : TYPOGRAPHY.fontSize.md,
  },
  categoryAmount: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.md : TYPOGRAPHY.fontSize.sm,
  },
  categoryProgress: {
    position: 'relative',
    height: isTablet ? 26 : 22, // Meningkatkan tinggi bar menjadi lebih besar
    backgroundColor: COLORS.neutral[200],
    borderRadius: isTablet ? 13 : 11, // Menyesuaikan border radius dengan tinggi baru
    marginTop: isTablet ? SPACING.sm : SPACING.xs,
    marginBottom: isTablet ? SPACING.md : SPACING.sm,
  },
  categoryProgressBarBackground: {
    height: isTablet ? 26 : 22, // Menyesuaikan tinggi background
    backgroundColor: COLORS.neutral[200],
    borderRadius: isTablet ? 13 : 11,
    width: '100%',
  },
  percentageContainer: {
    position: 'absolute',
    right: isTablet ? 16 : 12, // Menambah padding kanan
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  categoryPercentage: {
    ...TYPOGRAPHY.caption,
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    fontSize: isTablet ? 13 : 11,
  },
  emptyState: {
    padding: isTablet ? SPACING.xxl : SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    marginBottom: isTablet ? SPACING.lg : SPACING.md,
    textAlign: 'center',
    fontSize: isTablet ? TYPOGRAPHY.fontSize.md : TYPOGRAPHY.fontSize.sm,
  },
  emptyStateButton: {
    backgroundColor: COLORS.primary.main,
    paddingVertical: isTablet ? SPACING.md : SPACING.sm,
    paddingHorizontal: isTablet ? SPACING.xl : SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
  },
  emptyStateButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
    fontWeight: '600',
    fontSize: isTablet ? TYPOGRAPHY.fontSize.md : TYPOGRAPHY.fontSize.sm,
  },
  
  // Styles untuk Floating Action Button (FAB)
  fabContainer: {
    position: 'absolute',
    bottom: isTablet ? SPACING.xxl + 10 : SPACING.xl + 10, // Menambah jarak dari bawah
    right: isTablet ? SPACING.xxl + 10 : SPACING.xl + 10, // Menambah jarak dari kanan
  },
  fab: {
    width: isTablet ? 64 : 56,
    height: isTablet ? 64 : 56,
    borderRadius: isTablet ? 32 : 28,
    backgroundColor: COLORS.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
    elevation: 5,
  },
  // Tambahan style untuk loading container
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  // Style untuk judul section
  sectionTitle: {
    ...TYPOGRAPHY.h6,
    color: COLORS.text,
    marginBottom: isTablet ? SPACING.lg : SPACING.md,
    marginTop: isTablet ? SPACING.md : SPACING.sm,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.xl : TYPOGRAPHY.fontSize.lg,
  },
  // Style untuk container kategori
  categoriesContainer: {
    paddingBottom: isTablet ? SPACING.xxl * 2 : SPACING.xl * 2, // Tambahkan padding bottom untuk FAB
  },
  // Style untuk container ringkasan anggaran
  summaryContainer: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: isTablet ? SPACING.xl : SPACING.lg,
    paddingVertical: isTablet ? SPACING.lg : SPACING.md,
    marginBottom: isTablet ? SPACING.lg : SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: isTablet ? SPACING.md : SPACING.sm,
  },
  summaryItem: {
    flex: 1,
    paddingHorizontal: isTablet ? SPACING.sm : SPACING.xs,
  },
  summaryLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: isTablet ? SPACING.xs : SPACING.xs / 2,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.sm : TYPOGRAPHY.fontSize.xs,
  },
  summaryValue: {
    ...TYPOGRAPHY.h6,
    color: COLORS.text,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.xl : TYPOGRAPHY.fontSize.lg,
  },
});
