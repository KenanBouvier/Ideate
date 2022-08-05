import { StyleSheet,Alert, FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { Text, View } from '../components/Themed';
import IdeaItem from '../components/IdeaItem';
import { useQuery,gql } from '@apollo/client';

const MY_IDEAS = gql`
  query myTaskLists{
    myTaskLists {
    id
    title1
    title2
    description
    summary
    createdAt
    }
  }
`

export default function IdeasScreen() {

  // setIdeas on the data from the database 
  const [ideas,setIdeas] = useState([]);

  const {data,error,loading} = useQuery(MY_IDEAS);
  
  useEffect(()=>{
      if(error){
        Alert.alert('Error retrieving ideas ',error.message);
      }
  },[error]);

  useEffect(()=>{
      if(data){
       console.log(data) ;
        setIdeas(data.myTaskLists);
      }
  },[data]);

  if(loading){
    return <ActivityIndicator/>
  }

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
    flex: 1,
    padding:20,
  },
  text:{
    color:'red',
    backgroundColor:'red',
  }
});
