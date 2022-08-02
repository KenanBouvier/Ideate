import { View ,TextInput,Pressable,StyleSheet, ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import { Text } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import {useMutation,gql} from '@apollo/client';


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
      name
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
    console.log(data);
    console.log(error);

    const onSubmit = ()=>{
        signUp({variables:{name,email,password}})
        
        // navigation.navigate('Root');
    }

    const redirectSignIn = ()=>{
        navigation.navigate('SignIn');
    }

  return (
    <View style = {styles.container}>
        <TextInput
        placeholder='Name'
        placeholderTextColor={'#48494a'}
        value={name}
        onChangeText={setName}
        style = {styles.textInput}
        />
        <TextInput
        placeholder='Email address'
        placeholderTextColor={'#48494a'}
        value={email}
        onChangeText={setEmail}
        style = {styles.textInput}
        />
        <TextInput
        placeholder='Password'
        placeholderTextColor={'#48494a'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style = {[styles.textInput,{marginBottom:50}]}
        />
        <Pressable disabled={loading} onPress={onSubmit} style = {styles.pressable}>
            {loading && <ActivityIndicator/>}
            <Text style = {styles.txt}>Sign Up</Text>
        </Pressable>
        <Pressable onPress={redirectSignIn} style = {styles.signUpPressable}>
            <View style = {styles.signUpView}>
                <Text style={styles.signUptxt}>Already have an account? </Text>
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
