    import React from 'react';
    import { NavigationContainer } from '@react-navigation/native';
    import { useAuth } from '../context/AuthContext'; 

    import AuthStack from './AuthStack';
    import AppStack from './AppStack';

    
    const RootNavigator = () => {
      const { isLoggedIn } = useAuth();

      return (
        <NavigationContainer>
          {isLoggedIn ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
      );
    };


    export default RootNavigator;
    