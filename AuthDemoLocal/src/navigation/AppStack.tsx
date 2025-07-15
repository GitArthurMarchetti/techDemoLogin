import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventsScreen from '../screens/App/EventsScreen';
import { RootStackParamList } from '../interfaces/navigation';
import ScanOptionsScreen from '../screens/App/ScanOptionsScreen';


const Stack = createNativeStackNavigator<RootStackParamList>(); 

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Events" component={EventsScreen} />
      <Stack.Screen name="ScanOptions" component={ScanOptionsScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;