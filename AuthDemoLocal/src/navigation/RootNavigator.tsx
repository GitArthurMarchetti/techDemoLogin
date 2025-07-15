import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext'; 

// Importar TODAS as telas que serão usadas no RootNavigator
import LoginScreen from '../screens/Auth/LoginScreen';
import EventsScreen from '../screens/App/EventsScreen';
import { RootStackParamList } from '../interfaces/navigation';
import ScanOptionsScreen from '../screens/App/ScanOptionsScreen';
import ScannerScreen from '../screens/App/ScannerScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { isLoggedIn } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          // Grupo de telas para usuários autenticados
          <Stack.Group>
            <Stack.Screen name="Events" component={EventsScreen} />
            <Stack.Screen name="ScanOptions" component={ScanOptionsScreen} />
            <Stack.Screen name="Scanner" component={ScannerScreen} />
          </Stack.Group>
        ) : (
          // Grupo de telas para usuários não autenticados
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;