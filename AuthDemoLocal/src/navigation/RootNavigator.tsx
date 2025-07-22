import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EventsScreen from '../screens/App/EventsScreen';
import { RootStackParamList } from '../interfaces/navigation'; 
import ScanOptionsScreen from '../screens/App/ScanOptionsScreen';
import ScannerScreen from '../screens/App/ScannerScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Group>
          <Stack.Screen name="Events" component={EventsScreen} />
          <Stack.Screen name="ScanOptions" component={ScanOptionsScreen} />
          <Stack.Screen name="Scanner" component={ScannerScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
