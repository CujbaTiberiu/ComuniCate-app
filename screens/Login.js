import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'



const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //const auth = getAuth();
    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user
                console.log('Registered with:', user.email)
                setEmail('')
                setPassword('')
            })
            .catch(error => alert(error.message))
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user
                console.log('Logged in with:', user.email)
                setEmail('')
                setPassword('')
            })
            .catch(error => alert(error.message))
    }

    const navigation = useNavigation();
    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate('Home');
            }
        })
        return unsubscribe;
    }, []);

    return (
        <KeyboardAvoidingView style={styles.container}
            behavior='padding'>
            <View style={styles.inputContainer}>
                <TextInput placeholder='Email'
                    style={styles.input}
                    //keyboardType='email-address'                
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput placeholder='Password'
                    style={styles.input}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                />
            </View>

            <View style={styles.btnsContainer}>
                <TouchableOpacity onPress={handleLogin} style={styles.signInContainer}>
                    <Text style={styles.signInBtn}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignUp} style={styles.regContiner}>
                    <Text style={styles.regBtn}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}


export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: '80%',
    },

    input: {
        margin: 10,
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#f5fffa',
    },

    btnsContainer: {
        width: '60%',
    },

    signInContainer: {
        width: '100%',
        backgroundColor: '#008080',
        padding: 10,
        borderRadius: 5,
        margin: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    regContiner: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#008080',
        padding: 10,
        borderRadius: 5,
        margin: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signInBtn: {
        fontWeight: 'bold',
        color: '#fff'
    },
    regBtn: {
        fontWeight: 'bold',
        color: '#008080'
    }
})