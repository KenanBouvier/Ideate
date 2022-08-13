import React from 'react';
import { StyleSheet,Pressable,SafeAreaView,ScrollView, FlatList,TextInput, ActivityIndicator, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { Text, View } from '../components/Themed';
import StyledButton from '../components/StyledButton';
import { RootStackScreenProps, RootTabScreenProps } from '../types';
import { gql,useMutation } from '@apollo/client';

import { KeyboardAvoidingView } from 'react-native';

const UPDATE_IDEA=gql`
  mutation updateIdea($id:ID!, $description: String!,$summary:String!){
  updateIdea(id: $id, description: $description, summary: $summary) {
    id
    description
    summary
  }
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

export default function IdeaSpecificScreen({route,navigation:{goBack}}:RootStackScreenProps<'IdeaSpecificScreen'>) {

  let {id,description,title1,title2,summary} = route.params;
  const [editing,setEditing] = useState(false);
  const [desc,setDesc] = useState(description);
  const [summ,setSummary] = useState(summary);
  const [updateIdea,{data,error,loading}] = useMutation(UPDATE_IDEA);

  useEffect(()=>{
    
  },[data]);

  useEffect(()=>{
      if(error){
        Alert.alert('Error updating idea ',error.message);
      }
  },[error]);

  if(loading){
    return <ActivityIndicator/>
  }

  const onPressEdit = ()=>{
    setEditing(true);
  }
  const onPressSubmit = ()=>{
    setSummary(summ);
    summary = summ;
    description = desc;
    updateIdea({variables:{id,summary,description}});
    setEditing(false);
  }

  return (
    <View style = {styles.container}>
      <View style = {styles.allTitles}>
        <Text style = {styles.title}>{title1}</Text>
        <Text style ={styles.title}>{title2}</Text>
      </View>
       
      {editing && <TextInput
        placeholder='Summary description'
        placeholderTextColor={'#48494a'}
        value={summ}
        onChangeText={setSummary}
        style = {[styles.inputs]}
        multiline
      />}

      {editing && <TextInput
        placeholder='Idea description'
        placeholderTextColor={'#48494a'}
        value={desc}
        onChangeText={setDesc}
        style = {[styles.inputs]}
        multiline
      />}

      {!editing && <Text style={[styles.inputs]}>{summ}</Text>}
      {!editing && <Text style={[styles.inputs]}>{desc}</Text>}
      {/* Make editable button */}
      <View style = {styles.styledButtons}>
        {!editing && <StyledButton type='next' content={'Edit'} onPress={onPressEdit}/>}
        {editing && <StyledButton type='yes' content={'Submit'} onPress={onPressSubmit}/>}
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