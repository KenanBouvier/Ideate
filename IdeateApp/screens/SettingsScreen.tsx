import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { client } from '../apollo';

import StyledButton from '../components/StyledButton';
import { Text, View } from '../components/Themed';

export default function SettingsScreen() {
  const navigation = useNavigation();

  const logout = ()=>{
    // AsyncStorage.removeItem('token')
    //     .then(()=>{
    //         navigation.navigate("SignIn");
    //     })
    // client.resetStore();
    navigation.navigate('SignIn');
    AsyncStorage.removeItem('token');
    client.resetStore()
  }
  return (
    <View style={styles.container}>
      <View style = {styles.settings}>
        <Text></Text>
        <View style = {styles.styledButtons}>
          <StyledButton type={'next'} content={'Log out'} onPress={logout}/>
        </View>
      </View>
        <View>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

          <Text style={styles.title}>About</Text>
          {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
            <Text style = {styles.about}>This is an app aimed to inspire unique ideas, allowing for different creative solutions. This is done through supplying radically different concepts from which you think of a unique connection to solve a unique problem.</Text>
            <View style = {styles.dev}>
              <Text style = {[styles.about,{fontSize:15}]}>Developed by <Text style = {{color:'#3d426b',fontWeight:'500'}}>Kenan Bouvier</Text></Text>
            </View>
        </View>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding:10,
  },
  settings:{
    width:'100%',
  },
  styledButtons:{
    // width:'100%',
    // paddingVertical:30,
  },
  dev:{
    // backgroundColor:'yellow',
    flex:0.9,
    justifyContent:'flex-end'
  },
  about:{
    fontSize:20,
    padding:8,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf:'center',
  },
  separator: {
    marginVertical: 30,
    height: 2,
  },
});