import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from "react-native";




const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');



    const { login } = useAuth()


    const handleLogin = async () => {

        setErrorMessage('');

        if (!email || !password) {
            // Alert.alert('Error', "Please, fill in all fields")
            setErrorMessage('Please, fill in all fields.');
            return;
        }

        setLoading(true);

        const result = login(email, password);

        await new Promise(resolve => setTimeout(resolve, 1000));

        setLoading(false)

        if (!result.success) {
            setErrorMessage(result.message || 'Login Error.');
        }

    }

    return (

        <View style={styles.container}>


            <Text style={styles.title}>
                Welcome!
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#999"
            />

            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

            {loading ? (
                <ActivityIndicator size="large" color={"#007bff"} />
            ) : (
                <Button title="Enter" onPress={handleLogin} color="#007bff" />
            )}


        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f4f8',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#2c3e50',
    },
    input: {
        width: '100%',
        maxWidth: 300,
        height: 50,
        borderColor: '#b0c4de',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#ffffff',
        fontSize: 16,
        color: '#333',
    },
    errorMessage: {
        color: 'red', 
        marginBottom: 15, 
        fontSize: 14,
        textAlign: 'center',
        width: '100%',
        maxWidth: 300,
      }
});

export default LoginScreen;