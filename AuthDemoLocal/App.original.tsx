import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';

// import { Amplify } from 'aws-amplify'; 
// import awsconfig from './aws-exports'; 

// Amplify.configure(awsconfig);

const App = () => {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
};

export default App;