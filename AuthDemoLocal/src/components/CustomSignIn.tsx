import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react-native';
import CognitoConfig from '../amplify-config';
import RootNavigator from '../navigation/RootNavigator';

function App() {
  return (
    <Authenticator.Provider>
      <CognitoConfig />
      <Authenticator
        loginMechanisms={['email']}
        components={{
          SignUp: () => null, 
        }}
        initialState="signIn" 
      >
        <RootNavigator />
      </Authenticator>
    </Authenticator.Provider>
  );
}

export default App;
