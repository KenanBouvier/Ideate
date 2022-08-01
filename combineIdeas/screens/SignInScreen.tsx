import { View ,TextInput,Pressable,StyleSheet} from 'react-native'
import React, { useState } from 'react'
import { Text } from '../components/Themed';

export default function SignInScreen() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const onSubmit = ()=>{
        //submit logic
    }

  return (
    <View style = {styles.container}>
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
        <Pressable onPress={onSubmit} style = {styles.pressable}>
            <Text style = {styles.txt}>Sign In</Text>
        </Pressable>

        <Pressable onPress={onSubmit} style = {styles.pressable}>
            <Text style={styles.txt}>Sign Up</Text>
        </Pressable>

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        // backgroundColor:'#100c08',
        padding:20,
        marginVertical:50,
        alignItems:'center',
        justifyContent:'center',
    },
    txt:{
        color:'#e0e0e0',
        fontWeight:'500',
    },
    pressable:{
        backgroundColor:'#3d426b',
        height:50,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        marginVertical:10,
    },
    textInput:{
        padding:20,
        color:'#e0e0e0',
        fontSize:18,
        width:'100%',
        marginVertical:25,
    }

});
