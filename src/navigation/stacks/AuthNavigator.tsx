import { createStackNavigator } from '@react-navigation/stack';

import { COLORS } from '../../constants/theme';
import LoginScreen from '../../screens/auth/LoginScreen';
import RegisterScreen from '../../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../../screens/auth/ForgotPasswordScreen';
import { TermsScreen, PrivacyPolicyScreen } from '../../screens/auth';
import { AuthStackParamList } from '../types/auth.types';

const Stack = createStackNavigator<AuthStackParamList>();
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
