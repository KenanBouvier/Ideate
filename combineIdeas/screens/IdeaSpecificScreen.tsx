import { StyleSheet,Pressable,SafeAreaView,ScrollView, FlatList,TextInput } from 'react-native';
import { useState } from 'react';
import { Text, View } from '../components/Themed';
import StyledButton from '../components/StyledButton';


interface IdeaSpecificScreen{
  item:{
    id:string
    title1:string 
    title2:string
    description:string
  }
}

export default function IdeaSpecificScreen(props:IdeaSpecificScreen) {
    //test item:
    const item = {
      id:'1',
      title1:'This is the first title!',
      title2:'This is the second title!',
      summary:"this is a summary of all",
      description:'Woah this is a description of my idea with these two titles. Hopefully I can think of an idea with them two... maybe' 
    }

  const [editing,setEditing] = useState(false);

  const [desc,setDesc] = useState(item.description);

  const onPressEdit = ()=>{
    setEditing(true);

  }
  const onPressSubmit = ()=>{
    setEditing(false);
  }

  return (
    <View style = {styles.container}>
      <View style = {styles.allTitles}>
        <Text style = {styles.title}>{item.title1}</Text>
        <Text style ={styles.title}>{item.title2}</Text>
      </View>
       
      {editing && <TextInput
        placeholder='Idea description'
        placeholderTextColor={'#48494a'}
        value={desc}
        onChangeText={setDesc}
        style = {styles.description}
      />}

      {!editing && <Text style={styles.description}>{desc}</Text>}
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
  description:{
    marginVertical:30,
    fontSize:19.5,
    color:"#495867",
  },
  category:{
    fontSize:25,
    color:"#495867",
  },
});