import { Amplify } from 'aws-amplify';
import { NEXT_PUBLIC_USER_POOL_ID, NEXT_PUBLIC_USER_POOL_CLIENT_ID, NEXT_PUBLIC_COGNITO_REGION } from '@env';

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: NEXT_PUBLIC_USER_POOL_ID, 
        userPoolClientId: NEXT_PUBLIC_USER_POOL_CLIENT_ID, 
        region: NEXT_PUBLIC_COGNITO_REGION, 

        loginWith: {
          oauth: {
            domain: "tfpapayalogin.auth.us-west-2.amazoncognito.com", 
            scopes: [
              "aws.cognito.signin.user.admin",
              "openid",
              "profile",
              "email"
            ],
            redirectSignIn: [
              'http://localhost:8081/Events/', 
              'https://kiplingpass.com/Events/' 
            ],
            redirectSignOut: [
              'http://localhost:8081/Login/', 
              'https://kiplingpass.com/Login/' 
            ],
            responseType: 'code',
          }
        },
      },
    }
  });


export default function CognitoConfig() {
    return null
}
