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
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral[200],
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
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
  },
  headerTitle: {
    ...TYPOGRAPHY.h2,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.xxxl : TYPOGRAPHY.fontSize.xxl,
    color: COLORS.text,
    textAlign: 'center',
    flex: 1,
  },
  spacer: {
    width: isTablet ? 48 : 40,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: isTablet ? SPACING.xl : SPACING.lg,
    paddingBottom: isTablet ? SPACING.xxl * 2 : SPACING.xl * 2,
  },
  lastUpdate: {
    ...TYPOGRAPHY.caption,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.sm : TYPOGRAPHY.fontSize.xs,
    color: COLORS.textSecondary,
    marginTop: isTablet ? SPACING.xl : SPACING.lg,
    marginBottom: isTablet ? SPACING.lg : SPACING.md,
    textAlign: 'center',
  },
  section: {
    marginBottom: isTablet ? SPACING.xxl : SPACING.xl,
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
        elevation: 2,
      },
    }),
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.xxl : TYPOGRAPHY.fontSize.xl,
    color: COLORS.primary.main,
    marginBottom: isTablet ? SPACING.lg : SPACING.md,
    paddingBottom: isTablet ? SPACING.sm : SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral[200],
  },
  paragraph: {
    ...TYPOGRAPHY.body2,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.md : TYPOGRAPHY.fontSize.sm,
    color: COLORS.text,
    marginBottom: isTablet ? SPACING.lg : SPACING.md,
    lineHeight: isTablet ? 26 : 22,
  },
  tableOfContents: {
    backgroundColor: COLORS.primary.light + '20',
    padding: isTablet ? SPACING.lg : SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: isTablet ? SPACING.xl : SPACING.lg,
  },
  tableOfContentsTitle: {
    ...TYPOGRAPHY.subtitle1,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.lg : TYPOGRAPHY.fontSize.md,
    color: COLORS.primary.main,
    marginBottom: isTablet ? SPACING.md : SPACING.sm,
  },
  tableOfContentsItem: {
    flexDirection: 'row',
    paddingVertical: isTablet ? SPACING.sm : SPACING.xs,
    alignItems: 'center',
  },
  tableOfContentsItemText: {
    ...TYPOGRAPHY.body2,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.md : TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    marginLeft: isTablet ? SPACING.sm : SPACING.xs,
  },
  bullet: {
    width: isTablet ? 8 : 6,
    height: isTablet ? 8 : 6,
    borderRadius: isTablet ? 4 : 3,
    backgroundColor: COLORS.primary.main,
    marginRight: isTablet ? SPACING.sm : SPACING.xs,
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
}); 