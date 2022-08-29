import { StyleSheet,Alert, FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { Text, View } from '../components/Themed';
import IdeaItem from '../components/IdeaItem';
import { useQuery,gql } from '@apollo/client';
import { RootTabScreenProps } from '../types';

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

export default function IdeasScreen({ navigation }: RootTabScreenProps<'TabTwo'>) {

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
        setIdeas(data.myIdeas);
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
        // inverted
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15,
  },
});