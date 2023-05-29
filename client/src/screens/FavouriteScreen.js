import {FETCH_IP} from "@env"
import {useEffect, useState} from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Linking, TouchableHighlight } from 'react-native';
import * as rssParser from 'react-native-rss-parser';
import Axios from "axios";

import Icon from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import NewsSlot from '../components/NewsSlot';

const delay = ms => new Promise(res => setTimeout(res, ms));

export default function FavouriteScreen({route, navigation}){
  const [data, setData] = useState([
    {title: 'Title', url: 'URL', description: 'DESCRIPTIOMN', published: 'PUBLISHED', colorIndex: 1, show: false, key: 1, otherKey: 1}
  ]);
  const [displayData, setDisplayData] = useState([
    {title: 'Title', url: 'URL', description: 'DESCRIPTIOMN', published: 'PUBLISHED', colorIndex: 1, show: false, key: 1, otherKey: 1}
  ]);
  const [loadingText, setLoadingText] = useState('');

  const [lista, setLista] = useState();

  async function updateData(){
    //ADD ASYNC SYSTEM HERE SO IT WILL WAIT FOR THE SYSTEM TO FETCH THE DATA FROM THE SERVER

    if(lista.length == 0) {
      setShow(false);
      setLoadingText('Favourites Empty')
      return;
    }

    console.log('Updating')

    setShow(false);
    setLoadingText('Loading')

    await delay(3000);

    console.log(`FETCH ${lista.length}`)

    setButtonText('Reload')
    setSearch('');

    obj = []
    for (let i = 0; i < lista.length; i++) {
      x = {
        title: lista[i].title,
        url: lista[i].link,
        description: lista[i].descr,
        published: '',
        show: false,
        colorIndex: GetColorIndex(lista[i].sourceType),
        key: (i+1),
        otherKey: lista[i].favID
      }

      obj.push(x);
    }

    setData(obj)
    setDisplayData(obj);

    console.log(`OBJ: ${obj.length}`)
    console.log(`DATA: ${data.length}`)
    console.log(`DISPLAY DATA: ${displayData.length}`)

    setShow(true);

  }

  const searchArray = (input) => {
    setDisplayData(
      () => {
        return data.filter(data => data.title.toLowerCase().includes(input.toLowerCase()))
      }
    );
  }

  
  useEffect(() => {
    Axios.get(FETCH_IP).then(
      (response) => {
        setLista(response.data)
      }
    )
  }, [lista])

  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);

  const [buttonText, setButtonText] = useState('Load');

  return(
    <View style={styles.container}>
        <StatusBar backgroundColor="#CD2355" hidden={true}/>
        <View style={styles.titleBar}>
          <View style={styles.reloadView}>
            <TouchableHighlight style={styles.reloadButton}>
              <View>
                <MaterialCommunityIcons name='arrow-left-bold-circle' size={40} color={'white'} onPress={ () => navigation.goBack()} />
              </View>
            </TouchableHighlight>
          </View>

          <MaterialCommunityIcons name='star' size={40} color={'dodgerblue'} />


          <Text style={styles.titleText}>FAVOURITED NEWS</Text>

          <View style={styles.reloadView}>
            <TouchableHighlight style={styles.reloadButton}>
              <View>
                <MaterialCommunityIcons name='reload' size={40} color={'white'} onPress={ () => {
                  updateData();
                  console.log(data);
                }} />
              </View>
            </TouchableHighlight>
          </View>
            
          </View>

            <View style={styles.search}>
              <Text style={styles.searchTitle}>Search: </Text>
              <TextInput 
                placeholder="Search"
                style={styles.textinput}
                onChangeText={(newText) => {
                  setSearch(newText)
                
                  if(data.length <= 1 && data[0].title == "Title") return;

                  console.log(`NEW TEXT: ${newText} |  ${newText.trim().length}\nSEARCH TEXT: ${search} | ${search.trim().length}`)
                  if(newText.trim().length == 0){
                    //getRSS();
                    setDisplayData(data)
                    console.log(`Area is empty! ${newText.trim().length}`)
                    return;
                  }

                  //Alert.alert('SEARCHING FOR ' + search.trim());
                  searchArray(newText.trim())
                }}
                value={search}
              />
            </View>

            <View style={{width:'100%',height:'100%'}}>
              <ScrollView style={show ? styles.scrollViewGrey : styles.scrollViewWhite}>
                {
                  show ?
                  displayData.map(
                    (item) => {
                      return (
                        <NewsSlot data={item} key={item.key} />
                      )
                    }
                  )
                  :
                  <View>
                    <Text style={{textAlign: 'center'}} >{loadingText}</Text>
                  </View>
                }
              </ScrollView>
            </View>
      </View>
  )
}

function GetColorIndex(input){
  output = 1;
  
  if(input == 'R'){
    output = 1;
  }else if(input == 'U'){
      output = 2;
  }else if(input == 'B'){
      output = 3;
  }

  return output;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 75,
    paddingBottom: 50,
  },
  titleBar:{
    width: '95%',
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  search: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'space-between',
    padding: 15,
    borderTopWidth: 2,
  },
  textinput:{
    borderWidth: 2,
    borderColor: 'black',
    width: '75%',
    paddingLeft: 5,
    marginRight: 15,
  },
  mapView:{
    margin: 5,
    borderWidth: 5,
    borderRadius: 15,
    padding: 5,
    borderColor: '#CD2355',
    backgroundColor: 'white',
  },
  scrollViewGrey:{
    backgroundColor: '#dddddd',
  },
  scrollViewWhite:{
    backgroundColor: 'white',
  },
  titleText:{
    fontSize: 17,
    fontWeight: 'bold',
  },
  searchTitle:{
    textAlignVertical: 'center',
  },
  articleText:{
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  link:{
    color: 'dodgerblue',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  timeText:{
    textAlign: 'right',
    fontSize: 10,
  },
  reloadView:{
    height: '100%'
  },
  reloadButton:{
    backgroundColor: 'dodgerblue',
    height: 55,
    width:55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  }
});
