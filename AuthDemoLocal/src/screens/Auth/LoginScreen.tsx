import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { StyleSheet, Text, TextInput, View } from "react-native"; 
import { colors } from "../../theme/colors";
import CustomButton from "../../components/CustomButton"; 
import { typography } from "../../theme/typograpy";


const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');



    const { login } = useAuth()


    const handleLogin = async () => {

        setErrorMessage('');

        if (!email || !password) {
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
                placeholderTextColor={colors.textSecondary}
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor={colors.textSecondary}
            />

            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

           <CustomButton
                title={loading ? "" : "Enter"} 
                onPress={handleLogin}
                loading={loading}
                type="primary" 
            />


        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.bgSecondary,
    },
    title: {
        fontSize: typography.fontSizes.extraLarge,
        fontWeight: typography.fontWeights.bold,
        marginBottom: 40,
        color: colors.textPrimary,
    },
    input: {
        width: '100%',
        maxWidth: 300,
        height: 50,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: colors.bgPrimary,
        fontSize: typography.fontSizes.normal,
        color: colors.textPrimary,
    },
    errorMessage: {
        color: colors.danger,
        marginBottom: 15,
        fontSize: typography.fontSizes.small,
        textAlign: 'center',
        width: '100%',
        maxWidth: 300,
    }
});

export default LoginScreen;