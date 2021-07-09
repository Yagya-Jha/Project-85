import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feed from '../Screens/Feed';
import CreatePosts from '../Screens/CreatePosts';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { RFValue } from 'react-native-responsive-fontsize';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () =>{
    return (
        <Tab.Navigator
        labeled = {false}
        barStyle = {styles.bottomtabstyle}
        screenOptions = {({route})=>({
          tabBarIcon: ({focused, color, size})=>{
          let iconname;

          if(route.name==='Feed'){
            iconname = focused?'home':'home-outline';
          }else if(route.name === 'CreatePosts'){
            iconname = focused?'add-circle':'add-circle-outline'
          }
          return < Ionicons name = {iconname} itemname size = {RFValue(25)} color = {color} style = {styles.icons}/>
          },})}
          tabBarOptions = {{
            activeTintColor: 'black',
            inactiveTintColor: 'grey'
          }}>
          <Tab.Screen name = "Feed" component = {Feed} />
          <Tab.Screen name = "CreatePosts" component = {CreatePosts} />
          </Tab.Navigator>
    );
  }

  export default BottomTabNavigator;

  const styles = StyleSheet.create({
    bottomtabstyle:{
      backgroundColor: "#2f345d",
      height: '8%',
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      overflow: "hidden",
      position: "absolute",
    },
    icons: {
      width: RFValue(30),
      height: RFValue(30),
    }
  });