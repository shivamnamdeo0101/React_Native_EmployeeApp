import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import CreateEmployee from './screens/CreateEmployee';
import Profile from './screens/Profile';
import Contants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();
const myOptions={
  
    title:"My Sweet Home",
    headerTintColor:"white",
    headerStyle:{
      backgroundColor:"#f033fa"
    },

}


function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home"
         component={Home} 
         options={myOptions}
        />
        <Stack.Screen name="Create" 
        component={CreateEmployee}
        options={{...myOptions,title:"CreateEmployee"}}
        />
        <Stack.Screen name="Profile" 
        options={{...myOptions,title:"Profile"}}
        component={Profile} />
    </Stack.Navigator>
    </View>
  );
}


export default()=>{
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: '#fff',

   
  },
});
