import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
    Login: undefined; 
};

export type AppStackParamList = {
    Events: undefined; 
    ScanOptions: { eventId: string; eventName: string; eventLocation: string; };
    Scanner: { eventId: string; }; 
};

export type RootStackParamList = {
    AuthStack: NavigatorScreenParams<AuthStackParamList>;
    AppStack: NavigatorScreenParams<AppStackParamList>;
};
