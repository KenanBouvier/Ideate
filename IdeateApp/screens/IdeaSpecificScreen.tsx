import React from 'react';
import { StyleSheet,TextInput, ActivityIndicator, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { Text, View } from '../components/Themed';
import StyledButton from '../components/StyledButton';
import { RootStackScreenProps, RootTabScreenProps } from '../types';
import { gql,useMutation } from '@apollo/client';

import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

const UPDATE_IDEA=gql`
  mutation updateIdea($id:ID!, $description: String!,$summary:String!){
  updateIdea(id: $id, description: $description, summary: $summary) {
    id
    description
    summary
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
const DELETE_IDEA=gql`
  mutation deleteIdea($id:ID!){
    deleteIdea(id:$id)
  }
`

interface IdeaSpecificScreen{
  item:{
        id:string,
        title1:string,
        title2:string,
        description:string,
        summary:string,
        createdAt:string,
    }
}

export default function IdeaSpecificScreen({route,navigation}:RootStackScreenProps<'IdeaSpecificScreen'>) {

  let {id,description,title1,title2,summary,createdAt} = route.params;
  const [editing,setEditing] = useState(false);
  const [desc,setDesc] = useState(description);
  const [summ,setSummary] = useState(summary);
  const [updateIdea,{data,error,loading}] = useMutation(UPDATE_IDEA);
  const [deleteIdea,{data:dataDelete,error:errorDelete,loading:loadingDelete}] = useMutation(DELETE_IDEA);
  const colourScheme = useColorScheme();

  const showConfirmDialog = () => {
      return Alert.alert(
          "Delete Idea",
          "Are your sure you want to permanently remove this idea?",
          [
              {
              text: "Yes",
              onPress: () => {
                deleteIdea({variables:{id},refetchQueries:[{query:MY_IDEAS}]});
                navigation.navigate('Root');
              },
              },
              {
              text: "No",
              },
          ]
      );
  }
  // Delete idea mutation
  useEffect(()=>{
    if(errorDelete){
      Alert.alert("Error deleting idea ", errorDelete.message);
    }
  },[errorDelete])

  // useEffect(()=>{
  //   if(dataDelete){
  //     console.log("DATA:");
  //     console.log(dataDelete);
  //   }
  // },[dataDelete])

  // Update idea mutation
  useEffect(()=>{
      if(error){
        Alert.alert('Error updating idea ',error.message);
      }
  },[error]);

  if(loading || loadingDelete){
    return <ActivityIndicator/>
  }

  const onPressEdit = ()=>{
    setEditing(true);
  }
  const onPressSubmit = ()=>{
    updateIdea({variables:{id,summary:summ,description:desc}});
    setEditing(false);
  }
  
  return (
    <View style = {styles.container}>
      <View style = {styles.allTitles}>
        <Text style = {[styles.title,{color:Colors[colourScheme].text}]}>{title1}</Text>
        <Text style ={[styles.title,{color:Colors[colourScheme].text}]}>{title2}</Text>
      </View>
       
      {editing && <TextInput
        placeholder='[Summary]'
        placeholderTextColor={Colors[colourScheme].ideaBg}
        value={summ}
        onChangeText={setSummary}
        style = {[styles.inputs,{color:Colors[colourScheme].tint}]}
        multiline
      />}

      {editing && <TextInput
        placeholder='[Description]'
        placeholderTextColor={Colors[colourScheme].ideaBg}
        value={desc}
        onChangeText={setDesc}
        style = {[styles.inputs,{color:Colors[colourScheme].tint}]}
        multiline
      />}

      {!editing && <Text style={[styles.inputs]}>{summ}</Text>}
      {!editing && <Text style={[styles.inputs]}>{desc}</Text>}
      {/* Make editable button */}
      <View style = {styles.styledButtons}>
        {!editing && <StyledButton type='neutral' content={'Edit'} onPress={onPressEdit}/>}
        {editing && <StyledButton type='yes' content={'Submit'} onPress={onPressSubmit}/>}
        {editing && <StyledButton type='transparent' content={'Delete'} onPress={showConfirmDialog}/>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:20,
  },
  scrollView:{
    flex:1,
  },
  styledButtons:{
    flex:1,
    justifyContent: 'flex-end',
    paddingBottom:'5%',
  },
  title: {
    fontSize:35,
    fontWeight:'500',
    color:"#495867",
  },
  allTitles:{
    // flexDirection:'row',
    alignContent:'center',
    justifyContent: 'center',
  },
  inputs:{
    marginTop:10,
    marginBottom:5,
    fontSize:19.5,
    color:"#495867",
  },
});