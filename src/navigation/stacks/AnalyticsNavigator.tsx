import { createStackNavigator } from '@react-navigation/stack';

import AnalyticsScreen from '../../screens/analytics/AnalyticsScreen';

import { COLORS } from '../../constants/theme';
import { AnalyticsStackParamList } from '../types';

const Stack = createStackNavigator<AnalyticsStackParamList>();

const AnalyticsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AnalyticsDashboard"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen 
        name="AnalyticsDashboard" 
        component={AnalyticsScreen}
      />
    </Stack.Navigator>
  );
};

export default AnalyticsNavigator;
