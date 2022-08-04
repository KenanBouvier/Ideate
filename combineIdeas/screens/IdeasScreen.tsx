import { StyleSheet,Alert, FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { Text, View } from '../components/Themed';
import IdeaItem from '../components/IdeaItem';
import { useQuery,gql } from '@apollo/client';

const MY_IDEAS = gql`
  query myIdeas{
    myIdeas {
    id
    title
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
        console.log(error.message);
        Alert.alert('Error retrieving ideas ',error.message);
      }
  },[error]);


  useEffect(()=>{
      if(data){
        console.log(data);
        setIdeas(data.myIdeas);
      }
  },[data]);

  if(loading){
    return <ActivityIndicator/>
  }

  // const [ideas,setIdeas] = useState([ {
  //       id:"1",
  //       title1:"First title",
  //       title2:"Second title",
  //       description:"THis is description",
  //   },{
  //       id:"2",
  //       title1:"First title",
  //       title2:"Second title",
  //       description:"THis is description", 
  //   },{
  //       id:"3",
  //       title1:"First title",
  //       title2:"Second title",
  //       description:"THis is description", 
  //   },{
  //       id:"4",
  //       title1:"First title",
  //       title2:"Second title",
  //       description:"THis is description", 
  //   },
  //   {
  //       id:"5",
  //       title1:"First title",
  //       title2:"Second title",
  //       description:"THis is description", 
  //   },
  //   {
  //       id:"6",
  //       title1:"First title",
  //       title2:"Second title",
  //       description:"THis is description", 
  //   },
  //   {
  //       id:"7",
  //       title1:"First title",
  //       title2:"Second title",
  //       description:"THis is description", 
  //   },
  //   {
  //       id:"8",
  //       title1:"First title",
  //       title2:"Second title",
  //       description:"THis is description", 
  //   },
  //   {
  //       id:"9",
  //       title1:"First title",
  //       title2:"Second title",
  //       description:"THis is description", 
  //   },
  // ]);

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
