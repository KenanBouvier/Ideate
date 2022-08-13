/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import GenerationScreen from '../screens/GenerationScreen';
import IdeasScreen from '../screens/IdeasScreen';
import IdeaSpecificScreen from '../screens/IdeaSpecificScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SplashScreen from '../screens/SplashScreen';
import CreateIdeaScreen from '../screens/CreateIdeaScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator> 
      <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}}/>
      <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown:false}}/>
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Ideas" component={IdeasScreen} options={{ headerShown: false }} />
      {/* <Stack.Screen name="CreateIdea" component={CreateIdeaScreen} options={{ headerShown: false }} /> */}
      <Stack.Screen name="CreateIdea" component={CreateIdeaScreen} />
      <Stack.Screen name="IdeaSpecificScreen" component={IdeaSpecificScreen}/>
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={GenerationScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Ideate!',
          tabBarIcon: ({ color }) => <TabBarIcon name="lightbulb" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={
                ({ pressed }) => ({ opacity: pressed ? 0.5 : 1,})
              }>
              <FontAwesome
                // name="info-circle"
                name='cog'
                size={25}
                color={Colors[colorScheme].tint}
                style={{ marginRight: 15}}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={IdeasScreen}
        options={{
          title: 'My ideas',
          // headerStyle:{backgroundColor:''},
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={30} style={{ marginBottom: -3 }} {...props} />;
}
