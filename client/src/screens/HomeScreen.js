import React from 'react'
import {useState} from "react"
import {View, Text, Button, StyleSheet, TouchableHighlight} from 'react-native'

import Icon from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen({navigation}){
    return(
        <View style={styles.container}>

          <TouchableHighlight
            style={styles.touchableContainerRaspberry}
            onPress={() => {
              navigation.navigate('Raspiberry',{content1: 'Hey', content2: 'Hello!'})
            }} 
          >
            <View style={styles.viewContainer} >
              <Icon name='raspberry-pi' size={40} color={'white'} />
              <Text style={styles.textStyle} >RASPBERRY PI NEWS</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.touchableContainerUbuntu}
            onPress={() => {
              navigation.navigate('Ubuntu',{content1: 'Hey', content2: 'Hello!'})
            }} 
          >
            <View style={styles.viewContainer} >
              <Icon name='ubuntu' size={40} color={'white'} />
              <Text style={styles.textStyle} >LINUX UBUNTU NEWS</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.touchableContainerBlender}
            onPress={() => {
              navigation.navigate('Blender',{content1: 'Hey', content2: 'Hello!'})
            }} 
          >
            <View style={styles.viewContainer} >
              <MaterialCommunityIcons name='blender-software' size={40} color={'white'} />
              <Text style={styles.textStyle} >BLENDER NEWS</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.touchableContainerFav}
            onPress={() => {
              navigation.navigate('Favourite',{content1: 'Hey', content2: 'Hello!'})
            }} 
          >
            <View style={styles.viewContainer} >
              <MaterialCommunityIcons name='star' size={40} color={'white'} />
              <Text style={styles.textStyle} >FAVORITE NEWS</Text>
            </View>
          </TouchableHighlight>

        </View>
      )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchableContainerRaspberry:{
    width: '85%',
    height: 60,
    backgroundColor: '#CD2355',
    borderRadius: 15,
    alignContent: 'center',
    marginBottom: 25,
  },
  touchableContainerUbuntu:{
    width: '85%',
    height: 60,
    backgroundColor: '#E95420',
    borderRadius: 15,
    alignContent: 'center',
    marginBottom: 25,
  },
  touchableContainerBlender:{
    width: '85%',
    height: 60,
    backgroundColor: 'orange',
    borderRadius: 15,
    alignContent: 'center',
    marginBottom: 25,
  },
  touchableContainerFav:{
    width: '85%',
    height: 60,
    backgroundColor: 'dodgerblue',
    borderRadius: 15,
    alignContent: 'center',
    marginBottom: 25,
  },
  viewContainer:{
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    alignContent: 'space-between',
    alignItems: 'center'
  },
  textStyle:{
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    height: '100%',
    width: '70%',
    textAlignVertical: 'center'
  }
})