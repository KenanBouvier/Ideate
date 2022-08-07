import { ScrollView, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { useState , useEffect} from 'react';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps, RootTabScreenProps } from '../types';

//Own component imports
import TextItem from '../components/TextItem';
import data from '../components/data';
import StyledButton from '../components/StyledButton';
import { useNavigation } from '@react-navigation/native';
import Navigation from '../navigation';
import {gql, useMutation} from '@apollo/client';



const ADD_IDEA = gql`
    mutation createIdea($title1:String!, $title2:String!,$description:String,$summary:String){
  createIdea(title1:$title1, title2:$title2,description:$description,summary:$summary){
    id
    createdAt
    title1
    title2
    description
    summary
    users {
      id
      name
    }
  }
}
`


export default function CreateIdeaScreen({ route, navigation }: RootStackScreenProps<'CreateIdea'>) {

    const [summary,setSummary] = useState('');
    const [description,setDescription] = useState('');
    const [title1,setTitle1] =useState('');
    const [title2,setTitle2] = useState('');

    // setTitle1(inputTitle1);
    // setTitle2(inputTitle2);

    // const navigation = useNavigation();

    const [createIdea,{data,error,loading}] = useMutation(ADD_IDEA);

    useEffect(()=>{
        if(error){
            Alert.alert("Couldn't create Idea");
        }
    },[error])

    useEffect(()=>{
        if(data){
            console.log(data);
            navigation.navigate('Ideas');
        }
    },[data])

    const onSubmit = ()=>{
        createIdea({variables:{summary, description , title1 , title2}})
        Alert.alert("Submit :)");
    }

    const redirectSignUp = ()=>{
        navigation.navigate('SignUp');
    }

  return (
    <View style = {styles.container}>
        <TextInput
        placeholder='Brief summary'
        placeholderTextColor={'#48494a'}
        value={summary}
        onChangeText={setSummary}
        style = {styles.textInput}
        />
        <TextInput
        placeholder='Description'
        placeholderTextColor={'#48494a'}
        value={description}
        onChangeText={setDescription}
        onSubmitEditing={onSubmit}
        style = {[styles.textInput,{marginBottom:50}]}
        />
        <Pressable  onPress={onSubmit} style = {styles.pressable}>
            <Text style = {styles.txt}>Add idea</Text>
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