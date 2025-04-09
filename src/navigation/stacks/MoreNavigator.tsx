import { createStackNavigator } from '@react-navigation/stack';
import MoreMenu from '../components/MoreMenu';

type MoreStackParamList = {
  MoreMenu: undefined;
};

const MoreStack = createStackNavigator<MoreStackParamList>();

const MoreNavigator: React.FC = () => {
  return (
    <MoreStack.Navigator screenOptions={{ headerShown: false }}>
      <MoreStack.Screen name="MoreMenu" component={MoreMenu} />
    </MoreStack.Navigator>
  );
};

export default MoreNavigator;
