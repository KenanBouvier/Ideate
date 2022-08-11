import React from 'react';
import { StyleSheet,Pressable,SafeAreaView,ScrollView, FlatList,TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { Text, View } from '../components/Themed';
import StyledButton from '../components/StyledButton';
import { RootStackScreenProps, RootTabScreenProps } from '../types';
import { gql,useMutation } from '@apollo/client';

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

export default function IdeaSpecificScreen({route,navigation}:RootStackScreenProps<'IdeaSpecificScreen'>) {

  const {id,description,title1,title2,summary} = route.params;
  const [editing,setEditing] = useState(false);
  const [desc,setDesc] = useState(description);
  const [summ,setSummary] = useState(summary);

  const onPressEdit = ()=>{
    setEditing(true);
  }
  const onPressSubmit = ()=>{
    // const [updateIdea,{data,error,loading}] = useMutation(UPDATE_IDEA);
    setEditing(false);
  }

  const [height,setHeight] = React.useState(30);

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
        style = {[styles.inputs,{height}]}
        onContentSizeChange={(event)=>{
          setHeight(event.nativeEvent.contentSize.height);
        }}
        multiline
      />}

      {editing && <TextInput
        placeholder='Idea description'
        placeholderTextColor={'#48494a'}
        value={desc}
        onChangeText={setDesc}
        style = {[styles.inputs,{height}]}
        onContentSizeChange={(event)=>{
          setHeight(event.nativeEvent.contentSize.height);
        }}
        multiline
      />}

      {!editing && <Text style={styles.inputs}>{summary}</Text>}
      {!editing && <Text style={styles.inputs}>{desc}</Text>}
      {/* Make editable button */}
      {!editing && <StyledButton type='next' content={'Edit'} onPress={onPressEdit}/>}
      {editing && <StyledButton type='yes' content={'Submit'} onPress={onPressSubmit}/>}

      {/* <Pressable onPress={onPress}>
        <Text style = {styles.edit}>Edit</Text>
      </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex:1,
    padding:20,

  },
  title: {
    fontSize:35,
    fontWeight:'500',
    color:"#495867",
    alignContent:'center',
    justifyContent: 'center',
    
  },
  allTitles:{
    // flexDirection:'row',
    alignContent:'center',
    justifyContent: 'center',
  },
  inputs:{
    marginVertical:30,
    fontSize:19.5,
    color:"#495867",
  },
  category:{
    fontSize:25,
    color:"#495867",
  },
});