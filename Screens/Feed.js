import AppLoading from 'expo-app-loading';
import * as React from 'react';
import { Text, View, StyleSheet,Platform, StatusBar,Image, FlatList} from 'react-native';
import * as Font from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import PostCard from './PostCard';

let custom_font = {'Bubbegum-Sans':require('../assets/fonts/BubblegumSans-Regular.ttf')}
let posts = require("./temp_posts.json");
export default class Feed extends React.Component{
    constructor(){
        super();
        this.state = {
            fontsLoaded: false,
        };
    }

    async loadFonts(){
        await Font.loadAsync(custom_font); 
        this.setState({fontsLoaded: true});
    }

    componentDidMount(){
        this.loadFonts();
    }

    renderItem = ({item: post})=>{
        return <PostCard post = {post} navigation = {this.props.navigation} />
    };

    keyExtractor = (item, index)=> index.toString();

    render(){
        if(! this.state.fontsLoaded){
            return <AppLoading />
        }
        else{
            return(
                <View style = {styles.container}>
                    <SafeAreaView style = {styles.safeview}/>
                <View style = {styles.appTitle}>
                        <View style = {styles.appIcon}>
                            <Image source = {require('../assets/logo.png')} style = {styles.iconImage}/>
                        </View>
                        <View style = {styles.appTitleTextContainer}>
                            <Text style = {styles.appTitleText}>
                                Spectagram
                            </Text>
                        </View>
                </View>
                <View style = {styles.postContainer}>
                            <FlatList 
                            keyExtractor = {this.keyExtractor}
                            data = {posts}
                            renderItem = {this.renderItem}/>
                        </View>
                </View>
            );
    }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
      },
      appTitleTextContainer: {
        flex: 0.7,
        justifyContent: "center"
      },
      appTitleText: {
        color: "white",
        fontSize: RFValue(25),
        fontFamily: "Bubblegum-Sans"
      },
      iconImage: {
        width: 48,
        height: 48,
        bottom: 5,
        resizeMode: "contain"
      },
      safeview: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
      },
      appTitle: {
        flex: 0.07,
        flexDirection: "row"
      },
      appIcon: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center"
      },
      storyImg: {
        width: "95%",
        height: RFValue(250),
        resizeMode: "contain",
        alignSelf:"center",
      },
      titleContainer: {
        paddingLeft: RFValue(20),
        justifyContent: "center"
      },
      titleText: {
        color: "white",
        fontSize: RFValue(28),
        fontFamily: "Bubblegum-Sans"
      },
      postContainer: {
          marginTop: 20,
          marginBottom: 20,
          marginLeft: 20,
          marginRight: 20,
          backgroundColor: "black",
          padding: 10,
          borderRadius: 20,
          height: undefined,
      },
      actionContainer:{
          justifyContent:"center",
          alignItems: "center",
          padding: RFValue(10),
      },
      likeButton:{
          width: RFValue(150),
          height:RFValue(40),
          bottom: 20,
          justifyContent:"center",
          alignItems:"center",
          borderRadius: RFValue(30),
          flexDirection:"row",
          backgroundColor:"#eb3948"
      },
      likeText:{
          color:"white",
          fontFamily:"Bubblegum-Sans",
          fontSize:RFValue(25),
          marginLeft: RFValue(5),
      },
      descriptionText:{
          color:"white",
          fontFamily:"Bubblegum-Sans",
          fontSize:RFValue(30),
          paddingTop: RFValue(10)
      },
    });