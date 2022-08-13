import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { client } from '../apollo';

import EditScreenInfo from '../components/EditScreenInfo';
import StyledButton from '../components/StyledButton';
import { Text, View } from '../components/Themed';

export default function ModalScreen() {
  const navigation = useNavigation();

  const logout = ()=>{
    AsyncStorage.removeItem('token')
        .then(()=>{
            navigation.navigate("SignIn");
        })
    client.resetStore();
  }

  return (
    <View style={styles.container}>

      <Text style = {styles.title}>Settings</Text>
      <StyledButton type={'next'} content={'Log out'} onPress={logout}/>

      <View style = {styles.settings}>
        <Text style={styles.title}>About</Text>
        {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
        <Text>This is an app aimed to inspire unique ideas, allowing for different creative solutions. This is done through supposed random concepts from which you think of a unique connection. </Text>
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
    // justifyContent: 'center',
  },
  settings:{
    flex:1,
    justifyContent: 'flex-end',
    paddingBottom:20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
