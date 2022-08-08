import { StyleSheet,Pressable,SafeAreaView,ScrollView, FlatList,TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { Text, View } from '../components/Themed';
import StyledButton from '../components/StyledButton';
import { RootStackScreenProps, RootTabScreenProps } from '../types';


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
    useEffect(()=>{
      console.log(route);
    })

  const {description,title1,title2,summary} = route.params;

  const [editing,setEditing] = useState(false);

  const [desc,setDesc] = useState(description);
  const [summ,setSumm] = useState(summary);

  const onPressEdit = ()=>{
    setEditing(true);

  }
  const onPressSubmit = ()=>{
    setEditing(false);
  }

  return (
    <View style = {styles.container}>
      <View style = {styles.allTitles}>
        <Text style = {styles.title}>{title1}</Text>
        <Text style ={styles.title}>{title2}</Text>
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