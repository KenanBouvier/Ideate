import { ScrollView, StyleSheet, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useState , useEffect} from 'react';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps, RootTabScreenProps } from '../types';

//Own component imports
import TextItem from '../components/TextItem';
import data from '../components/data';
import StyledButton from '../components/StyledButton';
import { useNavigation } from '@react-navigation/native';
import Navigation from '../navigation';
import {gql, useMutation,useQuery} from '@apollo/client';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

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
const MY_IDEAS = gql`
  query myIdeas{
    myIdeas {
    id
    title1
    title2
    description
    summary
    createdAt
    }
  }
`

export default function CreateIdeaScreen({ route}: RootStackScreenProps<'CreateIdea'>) {
    const [summary,setSummary] = useState('');
    const [description,setDescription] = useState('');
    const [title1,setTitle1] = useState('');
    const [title2,setTitle2] = useState('');

    const [createIdea,{data,error,loading}] = useMutation(ADD_IDEA);
    const navigation = useNavigation();
    useEffect(()=>{
        setTitle1(route.params[0]);
        setTitle2(route.params[1]);
    })

    useEffect(()=>{
        if(error){
            Alert.alert("Couldn't create Idea");
        }
    },[error])

    useEffect(()=>{
        if(data){
            navigation.navigate('Root');
        }
    },[data])

    const onSubmit = ()=>{
        createIdea({variables:{summary, description , title1 , title2}, refetchQueries:[{query:MY_IDEAS}]})
    }

    const colorScheme = useColorScheme();

  return (
    <View style = {styles.container}>
        <View style = {styles.titleContainer}>
            <Text style = {[styles.title,{color:Colors[colorScheme].text}]}>{title1}</Text>
            <Text style ={[styles.title,{alignItems:'center',justifyContent: 'center',color:Colors[colorScheme].text}]}>&</Text>
            <Text style = {[styles.title,{color:Colors[colorScheme].text}]}>{title2}</Text>
        </View>

        <TextInput
        placeholder='[Summary]'
        placeholderTextColor={Colors[colorScheme].ideaBg}
        value={summary}
        onChangeText={setSummary}
        style = {[styles.textInput,{color:Colors[colorScheme].tint}]}
        multiline
        />
        <TextInput
        placeholder='[Description]'
        placeholderTextColor={Colors[colorScheme].ideaBg}
        value={description}
        onChangeText={setDescription}
        // onSubmitEditing={onSubmit}
        style = {[styles.textInput,{marginBottom:50,color:Colors[colorScheme].tint,paddingTop:0}]}
        multiline
        />

        <View style = {styles.button}>
        <Pressable  onPress={onSubmit} style = {styles.pressable}>
            {loading && <ActivityIndicator/>}
            <Text style = {styles.txt}>Add idea</Text>
        </Pressable>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        // padding:10,
        alignItems:'center',
    },
    title:{
        fontSize:30,
        fontWeight:'bold',
        // alignItems:'baseline',
    },
    titleContainer:{
        justifyContent: 'center',
        alignItems:'center',
    },
    txt:{
        color:'#e0e0e0',
        fontWeight:'500',
    },
    pressable:{
        backgroundColor:'#3d426b',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        marginVertical:10,
    },
    button:{
        flex:1,
        justifyContent: 'flex-end',
        width:'90%',
        paddingBottom:10,
    },
    textInput:{
        paddingHorizontal:15,
        fontSize:18,
        width:'100%',
        marginVertical:15,
    }
});