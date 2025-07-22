  import React from 'react';
  import { Authenticator, } from '@aws-amplify/ui-react-native';
  import CognitoConfig from './src/amplify-config';
  import RootNavigator from './src/navigation/RootNavigator';


  function App() {
    return (
      <Authenticator.Provider>
        <CognitoConfig />
        <Authenticator
          loginMechanisms={['email']}
          signUpAttributes={['given_name', 'family_name']}
        >
          <RootNavigator/>
        </Authenticator>
      </Authenticator.Provider>
    );
  }

  export default App; 