import * as React from 'react';
import { Text, View,TouchableOpacity,StyleSheet, Platform, StatusBar,Image, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';

export default class Login extends React.Component{
    
  isUserEqual = (googleUser, firebaseUser)=> {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      }

    onSignIn = async(googleUser)=> {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (! this.isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
          );

            // Sign in with credential from the Google user.
            firebase.auth().signInWithCredential(credential).then(function(result){
                if(result.additionalUserInfo.isNewUser){
                    firebase.database().ref("/users/"+result.user.uid).set({
                        gmail: result.user.email,
                        profile_picture: result.additionalUserInfo.profile.picture,
                        locale: result.additionalUserInfo.profile.locale,
                        first_name: result.additionalUserInfo.profile.given_name,
                        last_name: result.additionalUserInfo.profile.family_name,
                        current_theme: "dark",
                    }).then(function(snapshot){});
                }
            }).catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
          } else {
            console.log('User already signed-in Firebase.');
          }
        });
      }

    signInWithGoogleAsync = async()=> {
        try {
          const result = await Google.logInAsync({
            androidClientId: "993015933833-67cid17sk06a0ih6ilub42cub2vshret.apps.googleusercontent.com",
            iosClientId: "993015933833-l0i27eptilu0puulbu5lj4qjumajps93.apps.googleusercontent.com",
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
              this.onSignIn(result);
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }

    render(){
          return(
              <View style = {{flex: 1, justifyContent:"center", alignItems:"center", backgroundColor: 'white'}}>
                <Button title = "Sign In With Google" color = 'skyblue'  onPress = {()=>this.signInWithGoogleAsync()} />                  
              </View>
          );
        }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#15193c"
    },
    safeView: {
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
    iconImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain"
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
    buttonContainer: {
      flex: 0.3,
      justifyContent:"center",
      alignItems: "center"
    },
    button:{
      width: RFValue(250),
      height: RFValue(50),
      flexDirection:"row",
      justifyContent:"space-evenly",
      alignItems:"center",
      borderRadius: RFValue(30),
      backgroundColor:'white',
    },
    googleIcon: {
      width: RFValue(30),
      height: RFValue(30),
      resizeMode: "contain",
    },
    googleText:{
      color: 'black',
      fontSize: RFValue(20),
      fontFamily: 'Bubbegum-Sans'
    },

    cloudContainer: {
      flex: 0.3,
    },
    cloudImage: {
      position: 'absolute',
      width: '100%',
      resizeMode:'contain',
      bottom: RFValue(-10)
    }
  });