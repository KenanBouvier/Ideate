import { View,Alert ,TextInput,Pressable,StyleSheet, ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import { Text } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import {useMutation,gql} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';


const SIGN_UP_MUTATION = gql`
    mutation signUp($email: String!, $password:String!, $name:String!) {
    signUp(input:{
        email:$email,
        password:$password,
        name:$name
        }){
    token
    user {
      id,
      name,
    }
  }
}
`;

export default function SignUpScreen() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const navigation = useNavigation();

    const [signUp,{data,error,loading}] = useMutation(SIGN_UP_MUTATION);
    if(error){
        Alert.alert('Error signing up. Try again');
    }

    if(data){
        //save token
        AsyncStorage.setItem('token',data.signUp.token)
            .then(()=>{
                navigation.navigate('Root');
            })

    }

    const onSubmit = ()=>{
        signUp({variables:{name,email,password}})
    }

    const redirectSignIn = ()=>{
        navigation.navigate('SignIn');
    }
    const colorScheme = useColorScheme();

  return (
    <View style = {styles.container}>
        <TextInput
        placeholder='Name'
        placeholderTextColor={Colors[colorScheme].tint}
        value={name}
        onChangeText={setName}
        style = {[styles.textInput,{color:Colors[colorScheme].text}]}
        />
        <TextInput
        placeholder='Email address'
        placeholderTextColor={Colors[colorScheme].tint}
        value={email}
        onChangeText={setEmail}
        style = {[styles.textInput,{color:Colors[colorScheme].text}]}
        />
        <TextInput
        placeholder='Password'
        placeholderTextColor={Colors[colorScheme].tint}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        onSubmitEditing={onSubmit}
        style = {[styles.textInput,{marginBottom:50, color:Colors[colorScheme].text}]}
        />
        <Pressable disabled={loading} onPress={onSubmit} style = {styles.pressable}>
            {loading && <ActivityIndicator/>}
            <Text style = {styles.txt}>Sign Up</Text>
        </Pressable>
        <Pressable onPress={redirectSignIn} style = {styles.signUpPressable}>
            <View style = {styles.signUpView}>
                <Text style={[styles.signUptxt,{color:Colors[colorScheme].text}]}>Already have an account? </Text>
                <Text style = {styles.signInTxt}>Sign In</Text>
            </View>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:20,
        marginVertical:50,
        alignItems:'center',
        justifyContent:'center',
    },
    signInTxt:{
        fontWeight:'500',
        color:'#3d426b',
    },
    signUpView:{
        flexDirection:'row',
    },
    signUptxt:{
        color:'#e0e0e0',
        fontWeight:'300',
    },
    txt:{
        color:'#e0e0e0',
        fontWeight:'500',
    },
    signUpPressable:{
        height:50,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        marginVertical:10,
    },
    pressable:{
        backgroundColor:'#3d426b',
        height:50,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        marginVertical:10,
        flexDirection:'row'
    },
    textInput:{
        padding:20,
        color:'#e0e0e0',
        fontSize:18,
        width:'100%',
        marginVertical:25,
    }

});
