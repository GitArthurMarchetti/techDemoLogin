import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/Auth/LoginScreen";
import { RootStackParamList } from "../interfaces/navigation";


const Stack = createNativeStackNavigator<RootStackParamList>(); // Use o tipo aqui

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    )
}

export default AuthStack;