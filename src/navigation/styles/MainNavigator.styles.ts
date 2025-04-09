import { StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../constants/theme';

export const styles = StyleSheet.create({
  
  tabBar: {
    height: Platform.OS === 'ios' ? 85 : 65,
    borderTopWidth: 1,
    borderTopColor: COLORS.neutral[200],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
    paddingTop: 5,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '500',
    paddingBottom: 3,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  
  fabContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 5,
  },

  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  moreMenuContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  moreMenuHeader: {
    paddingTop: Platform.OS === 'android' ? 45 : 60,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral[200],
    alignItems: 'center',
  },
  moreMenuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  menuItemsContainer: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
});
