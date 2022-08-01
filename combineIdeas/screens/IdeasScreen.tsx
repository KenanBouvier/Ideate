import { StyleSheet,SafeAreaView,ScrollView, FlatList } from 'react-native';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import IdeaItem from '../components/IdeaItem';


export default function IdeasScreen() {
  const [ideas,setIdeas] = useState([
    {
        id:"1",
        title1:"First title",
        title2:"Second title",
        description:"THis is description",
    },{
        id:"2",
        title1:"First title",
        title2:"Second title",
        description:"THis is description", 
    },{
        id:"3",
        title1:"First title",
        title2:"Second title",
        description:"THis is description", 
    },{
        id:"4",
        title1:"First title",
        title2:"Second title",
        description:"THis is description", 
    },
    {
        id:"5",
        title1:"First title",
        title2:"Second title",
        description:"THis is description", 
    },
    {
        id:"6",
        title1:"First title",
        title2:"Second title",
        description:"THis is description", 
    },
    {
        id:"7",
        title1:"First title",
        title2:"Second title",
        description:"THis is description", 
    },
    {
        id:"8",
        title1:"First title",
        title2:"Second title",
        description:"THis is description", 
    },
  ]);

  return (
       <View style = {styles.container}>
        <FlatList
        data = {ideas}
        renderItem={({item})=><IdeaItem idea={item}/>}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor:"#f7f7ff",
    // flex: 1,
    padding:20,
  },
  text:{
    color:'red',
    backgroundColor:'red',
  }
});
