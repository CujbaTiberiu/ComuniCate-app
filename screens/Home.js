import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const Home = () => {

    const auth = getAuth();
    const navigation = useNavigation();
    const handleSignOut = () => {
        auth.signOut();
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Text>{auth.currentUser?.email}</Text>
            <TouchableOpacity onPress={handleSignOut} style={styles.signOutContainer}>
                <Text style={styles.signInBtn}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signOutContainer: {
        width: '80%',
        backgroundColor: '#008080',
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
})