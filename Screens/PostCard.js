import AppLoading from 'expo-app-loading';
import * as React from 'react';
import { Text, View, StyleSheet, Platform, StatusBar,Image, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons'

let custom_font = {'Bubblegum-Sans':require('../assets/fonts/BubblegumSans-Regular.ttf')}

export default class PostCard extends React.Component{
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

    render(){
        if(! this.state.fontsLoaded){
            return <AppLoading />
        }
        else{
            return(
                <TouchableOpacity style = {styles.container} onPress = {()=>{this.props.navigation.navigate('PostScreen', {post: this.props.story})}}>
                    <View style = {styles.cardContainer}>
                        <View style = {styles.profile}>
                        <Image source = {require('../assets/profile_img.png')} style = {styles.profileImage} />
                        <Text style = {[styles.titleText, {marginLeft: 60, bottom: 50}]}>
                                {this.props.post.author}
                        </Text>
                        </View>
                        <Image source = {require('../assets/post.jpeg')} style = {styles.postImg} />
                        <View style = {styles.titleContainer}>
                            <Text style = {styles.titleText}>
                                {this.props.post.title}
                            </Text>
                            
                            <Text style = {styles.descriptionText}>
                                {this.props.post.description}
                            </Text>
                        </View>
                        <View style = {styles.actionContainer}>
                            <View style = {styles.likeButton}>
                                <Ionicons name = {"heart"} size = {RFValue(25)} color = "white" />
                                    <Text style = {styles.likeText}>
                                        12K
                                    </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%'
    },
    safeView: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
      flex: 0.07,
      flexDirection: "row"
    },
    profile:{
        height: 60,
        borderRadius: 20,
        backgroundColor: '#272C59'
    },
    appIcon: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    postImg: {
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
    titleTextLight: {
        color: "black",
        fontSize: RFValue(28),
        fontFamily: "Bubblegum-Sans"
      },
    cardContainer: {
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "#15193c",
        padding: 10,
        borderRadius: 20,
        height: undefined,
    },
    cardContainerLight: {
        marginTop: -20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 20,
        height: undefined,
        shadowColor: 'rgb(0,0,0)',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
      },
    actionContainer:{
        justifyContent:"center",
        alignItems: "center",
        padding: RFValue(10),
    },
    likeButton:{
        width: RFValue(150),
        height:RFValue(40),
        bottom: 50,
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
    descriptionTextLight:{
        color:"black",
        fontFamily:"Bubblegum-Sans",
        fontSize:RFValue(30),
        paddingTop: RFValue(10)
    },
    profileImage: {
        width: 48,
        height: 48,
        bottom: -2,
        resizeMode: "contain"
    }
  });