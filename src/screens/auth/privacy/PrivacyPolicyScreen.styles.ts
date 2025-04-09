import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../../constants/theme';

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768;

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    paddingHorizontal: isTablet ? SPACING.xl : SPACING.lg,
    paddingTop: Platform.OS === 'ios' 
      ? (isTablet ? SPACING.xxl : SPACING.xl) 
      : (isTablet ? SPACING.xl : SPACING.lg),
    paddingBottom: isTablet ? SPACING.lg : SPACING.md,
    backgroundColor: COLORS.primary.main,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: isTablet ? 48 : 40,
    height: isTablet ? 48 : 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: isTablet ? 24 : 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTitle: {
    ...TYPOGRAPHY.h2,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.xxxl : TYPOGRAPHY.fontSize.xxl,
    color: COLORS.white,
    textAlign: 'center',
    flex: 1,
  },
  spacer: {
    width: isTablet ? 48 : 40,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: isTablet ? SPACING.xxl * 2 : SPACING.xl * 2,
  },
  hero: {
    backgroundColor: COLORS.primary.main,
    paddingHorizontal: isTablet ? SPACING.xl : SPACING.lg,
    paddingTop: isTablet ? SPACING.lg : SPACING.md,
    paddingBottom: isTablet ? SPACING.xxl : SPACING.xl,
  },
  heroText: {
    ...TYPOGRAPHY.body1,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.lg : TYPOGRAPHY.fontSize.md,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: isTablet ? SPACING.lg : SPACING.md,
    lineHeight: isTablet ? 28 : 24,
  },
  lastUpdate: {
    ...TYPOGRAPHY.caption,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.sm : TYPOGRAPHY.fontSize.xs,
    color: COLORS.white,
    opacity: 0.8,
    textAlign: 'center',
    marginTop: isTablet ? SPACING.md : SPACING.sm,
  },
  tableOfContents: {
    margin: isTablet ? SPACING.xl : SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: isTablet ? SPACING.xl : SPACING.lg,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  tableOfContentsTitle: {
    ...TYPOGRAPHY.subtitle1,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.lg : TYPOGRAPHY.fontSize.md,
    color: COLORS.primary.main,
    marginBottom: isTablet ? SPACING.lg : SPACING.md,
    textAlign: 'center',
  },
  tableOfContentsItem: {
    flexDirection: 'row',
    paddingVertical: isTablet ? SPACING.sm : SPACING.xs,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral[100],
    paddingHorizontal: isTablet ? SPACING.sm : SPACING.xs,
  },
  tableOfContentsIcon: {
    marginRight: isTablet ? SPACING.md : SPACING.sm,
    backgroundColor: COLORS.primary.light + '30',
    width: isTablet ? 36 : 28,
    height: isTablet ? 36 : 28,
    borderRadius: isTablet ? 18 : 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableOfContentsItemText: {
    ...TYPOGRAPHY.body2,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.md : TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    flex: 1,
  },
  tableOfContentsItemNumber: {
    ...TYPOGRAPHY.caption,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.sm : TYPOGRAPHY.fontSize.xs,
    color: COLORS.primary.main,
    fontWeight: 'bold',
  },
  sectionsContainer: {
    paddingHorizontal: isTablet ? SPACING.xl : SPACING.lg,
  },
  section: {
    marginBottom: isTablet ? SPACING.xxl : SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: isTablet ? SPACING.lg : SPACING.md,
  },
  sectionBadge: {
    backgroundColor: COLORS.primary.main + '15',
    paddingHorizontal: isTablet ? SPACING.md : SPACING.sm,
    paddingVertical: isTablet ? SPACING.xs : SPACING.xs / 2,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: isTablet ? SPACING.md : SPACING.sm,
  },
  sectionBadgeText: {
    ...TYPOGRAPHY.caption,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.sm : TYPOGRAPHY.fontSize.xs,
    color: COLORS.primary.main,
    fontWeight: 'bold',
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.xxl : TYPOGRAPHY.fontSize.xl,
    color: COLORS.text,
    flex: 1,
  },
  paragraph: {
    ...TYPOGRAPHY.body2,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.md : TYPOGRAPHY.fontSize.sm,
    color: COLORS.text,
    marginBottom: isTablet ? SPACING.lg : SPACING.md,
    lineHeight: isTablet ? 26 : 22,
  },
  bullet: {
    ...TYPOGRAPHY.body2,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.md : TYPOGRAPHY.fontSize.sm,
    color: COLORS.text,
    marginBottom: isTablet ? SPACING.md : SPACING.sm,
    lineHeight: isTablet ? 26 : 22,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.neutral[200],
    marginVertical: isTablet ? SPACING.lg : SPACING.md,
  },
  acceptButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    padding: isTablet ? SPACING.xl : SPACING.lg,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  buttonGradient: {
    borderRadius: BORDER_RADIUS.lg,
  },
}); 