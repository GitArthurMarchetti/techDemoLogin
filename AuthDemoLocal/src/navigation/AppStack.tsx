    import React from 'react';
    import { createNativeStackNavigator } from '@react-navigation/native-stack';
    import EventsScreen from '../screens/App/EventsScreen'; 

    const Stack = createNativeStackNavigator();
    
    const AppStack = () => {
      return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Events" component={EventsScreen} />
        </Stack.Navigator>
      );
    };

    export default AppStack;
    