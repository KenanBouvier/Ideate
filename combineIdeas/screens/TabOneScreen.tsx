import { ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

//Own component imports
import TextItem from '../components/TextItem';
import data from '../components/data';
import StyledButton from '../components/StyledButton';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [index,setIndex] = useState(0);

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextItem title={data[index].title} category={data[index].category} description={data[index].description} first={true} />

        <View>
          <TextItem title={data[index+1].title} category={data[index+1].category} description={data[index+1].description} first={false} />
        </View>

        <View>
          <StyledButton 
          type={"yes"} 
          content={"Yes"}
          onPress={()=>{
              // console.warn("You see an idea here!");
          }}
          />
          <StyledButton 
          type={"no"} 
          content={"No"}
          onPress={()=>{
              // console.warn("You don't see an idea here!");
          }}
          />
          <StyledButton 
          type={"next"} 
          content={"Next"}
          onPress={()=>{
              // console.warn("Moving to next...");
              setIndex((index+1)%(data.length-1)); 
          }}
          />
        </View>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#f7f7ff",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
