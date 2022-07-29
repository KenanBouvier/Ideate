import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet , View, ScrollView } from 'react-native';
import data from './components/data';
import StyledButton from './components/StyledButton';

// own imports here
import TextItem from './components/TextItem';

export default function App() {
  const [index,setIndex] = useState(0);
  return (
  <ScrollView>
    <View style={styles.container}>
      <View>
        <TextItem title={data[index].title} category={data[index].category} description={data[index].description} first={true} />
      </View>
      
      <View>
        <TextItem title={data[index+1].title} category={data[index+1].category} description={data[index+1].description} first={false} />
      </View>

      {/* Buttons here */}
      <View>
        <StyledButton 
        type={"yes"} 
        content={"Yes"}
        onPress={()=>{
            console.warn("You see an idea here!");
        }}
        />
        <StyledButton 
        type={"no"} 
        content={"No"}
        onPress={()=>{
            console.warn("You don't see an idea here!");
        }}
        />
        <StyledButton 
        type={"next"} 
        content={"Next"}
        onPress={()=>{
            console.warn("Moving to next...");
            setIndex((index+1)%(data.length-1)); 
        }}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#f7f7ff",
  },
});
