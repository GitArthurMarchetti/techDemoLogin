import { NavigatorScreenParams } from '@react-navigation/native';

type AuthStackParamList = {
    Login: undefined;
};

type AppStackParamList = {
    Events: undefined;
    ScanOptions: { eventId: string; eventName: string; eventLocation: string };
};

export type RootStackParamList = AuthStackParamList & AppStackParamList & {
    AuthStack: NavigatorScreenParams<AuthStackParamList>;
    AppStack: NavigatorScreenParams<AppStackParamList>;
};