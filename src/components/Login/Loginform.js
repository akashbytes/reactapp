import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    AsyncStorage
} from "react-native";

class Loginform extends Component {

    constructor(props) {
        super(props)
        this.state = {
          UserEmail: '',
          UserPassword: '',
           LoginButton:'Login',
  
        }
      }
  
      _UserLoginFunction = () =>{
  
  
        const { UserEmail }  = this.state ;
        const { UserPassword }  = this.state ;
         
        this.setState({ LoginButton: 'Please Wait..' });
        
        
       fetch('https://adeeclinic.com/Api/login.php', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           email: UserEmail,
           password: UserPassword
         })
       }).then((response) => response.json())
             .then((responseJson) => {
               // If server response message same as Data Matched
           
  
              if(responseJson.msg === 'Login Successfull')
               {
                   //Then open Profile activity and send user email to profile activity.
                   let userdata =  responseJson.userData.user_id;
                    AsyncStorage.setItem('userToken', userdata);
                   this.props.navigation.navigate('App');
               }
               else{
                 Alert.alert(responseJson.msg);
  
  
                  this.setState({ LoginButton: 'Login' });
  
               }
  
             }).catch((error) => {
               console.error(error);
             });
         }
  
        goToSignup(){
            this.props.navigation.navigate("Signup");
           
        }



    render() {
        return (
            <View style={styles.container}>
                <TextInput  
                         style={styles.input}
                         placeholder="Username or Email"
                         placeholderTextColor="rgba(255,255,255,0.5)"
                         onChangeText={UserEmail => this.setState({UserEmail})}
                         underlineColorAndroid='transparent'
                        autoCapitalize="none"


                />
                <TextInput  
                         style={styles.input}
                         placeholder="Password"
                         placeholderTextColor="rgba(255,255,255,0.5)"
                         onChangeText={UserPassword => this.setState({UserPassword})}
                         underlineColorAndroid='transparent'   
                         secureTextEntry={true}
                        autoCapitalize="none"

                />      
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Forget')}  style={styles.forgetPassword} >
                    <Text style={styles.forgetPasswordText}>Forget password ?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._UserLoginFunction} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>{this.state.LoginButton}</Text>
                </TouchableOpacity>     

                <TouchableOpacity   onPress={() => this.props.navigation.navigate('Signup')}  style={styles.signup} >
                    <Text style={styles.signupText}>Don't have an account ? Signup </Text>
                </TouchableOpacity>
                

            </View>
        );
    }
}
export default Loginform;

const styles = StyleSheet.create({
    container: {
        padding:20,
    },
    input: {
        height:55,
        borderRadius:3,
        // backgroundColor:'rgba(255,255,255,0.5)',
        borderBottomColor:'#fff',
        borderBottomWidth:1,
        marginBottom:15,
        color:'#fff',
        paddingHorizontal:10,
    },
    buttonContainer: {
        backgroundColor:'#ffffff',
        paddingVertical:20,
        borderRadius:3,
        justifyContent:'center',
        // alignContent:'center',
        alignItems:'center',
        marginTop:10
    },
    buttonText: {
        fontSize:15,
        fontWeight:'700',
        color:'#F04343',
    },
    forgetPassword: {
        // marginTop:10,
        marginHorizontal:10,
        marginVertical:10,
    },
    forgetPasswordText: {
        color:'#fff',
        // alignSelf:'right',
    },
    signup: {
        justifyContent:'center',
        marginVertical:20,
        alignItems:'center'
    },
    signupText: {
        color:'#fff',
        // alignSelf:'right',
    }
    
});