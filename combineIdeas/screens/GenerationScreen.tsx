import { ScrollView, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

//Own component imports
import TextItem from '../components/TextItem';
import data from '../components/data';
import StyledButton from '../components/StyledButton';

let colorScheme;

export default function GenerationScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [index,setIndex] = useState(0);

  const nextComparison = ()=>{
    setIndex((index+1)%(data.length-1)); 
  }

  const title1 = data[index].title;
  const title2 = data[index+1].title;

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextItem title={data[index].title} category={data[index].category} description={data[index].description} first={true} />

        <View>
          <TextItem title={data[index+1].title} category={data[index+1].category} description={data[index+1].description} first={false} />
        </View>

        <View>
          <StyledButton 
          type={"yes"} 
          content={"Yes"}
          onPress={()=>{
              //We want to show the textinput
              navigation.navigate('CreateIdea',[title1,title2]);
              //Then move on to nextComparison
              nextComparison();
          }}
          />
          <StyledButton 
          type={"no"} 
          content={"No"}
          onPress={()=>{
              nextComparison();
          }}
          />
          <StyledButton 
          type={"next"} 
          content={"Next"}
          onPress={()=>{
              nextComparison();
          }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
