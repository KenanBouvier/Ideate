import { View ,TextInput,Alert,Pressable,StyleSheet, ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import {useMutation,gql} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

const SIGN_IN_MUTATION = gql`
    mutation signIn($email: String!, $password:String!){
  signIn(input:{email:$email,password:$password}){
    token
    user {
      id,
      name,
    }
  }
}
`;
   
export default function SignUpScreen() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const navigation = useNavigation();

    const [signIn,{data,error,loading}] = useMutation(SIGN_IN_MUTATION);


    useEffect(()=>{
        if(error){
            Alert.alert('Invalid credentials, try again');
        }
    },[error])

    useEffect(()=>{
        if(data){
            AsyncStorage.setItem('token',data.signIn.token)  
                .then(()=>{
                    navigation.navigate("Root");
                })
        }
    },[data])

    const onSubmit = ()=>{
        signIn({variables:{email,password}});
    }

    const redirectSignUp = ()=>{
        navigation.navigate('SignUp');
    }

    const colorScheme = useColorScheme();

  return (
    <View style = {styles.container}>
        <TextInput
        placeholder='Email address'
        placeholderTextColor={'#48494a'}
        value={email}
        onChangeText={setEmail}
        style = {[styles.textInput,{color:Colors[colorScheme].text}]}
        />
        <TextInput
        placeholder='Password'
        placeholderTextColor={'#48494a'}
        value={password}
        onChangeText={setPassword}
        onSubmitEditing={onSubmit}
        secureTextEntry
        style = {[styles.textInput,{marginBottom:50, color:Colors[colorScheme].text}]}
        />
        <Pressable disabled={loading} onPress={onSubmit} style = {styles.pressable}>
            {loading && <ActivityIndicator/>}
            <Text style = {styles.txt}>Sign In</Text>
        </Pressable>
        <Pressable onPress={redirectSignUp} style = {styles.signUpPressable}>
            <View style = {styles.signUpView}>
                <Text style={[styles.signUptxt,{color:Colors[colorScheme].text}]}>Are you new here? </Text>
                <Text style = {styles.signInTxt}>Sign Up</Text>
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

