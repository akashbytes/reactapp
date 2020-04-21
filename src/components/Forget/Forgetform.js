import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from "react-native";

class Forgetform extends Component {

    constructor(props) {
        super(props)
        this.state = {
          UserEmail: '',
           ForgetButton:'Reset Password',
        }
      }
  
      _forgetPassword = () =>{
  
  
        const { UserEmail }  = this.state ;
         
        this.setState({ ForgetButton: 'Please Wait..' });
        
        
       fetch('https://adeeclinic.com/Api/forget.php', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           email: UserEmail,
         })
       }).then((response) => response.json())
             .then((responseJson) => {
               // If server response message same as Data Matched
           
                // console.warn(responseJson);
              if(responseJson.msg === 'success')
               {
                   //Then open Profile activity and send user email to profile activity.
                   let userid =  responseJson.userData.user_id;
                   this.setState({ ForgetButton: 'Reset Password' });

                   this.props.navigation.navigate('Otp',{
                    otp: responseJson.otp,
                    userId: userid,
                  });
               }
               else{
                 Alert.alert(responseJson.msg);
                  this.setState({ ForgetButton: 'Reset Password' });
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
                         placeholder="Email"
                         onChangeText={UserEmail => this.setState({UserEmail})}

                         placeholderTextColor="rgba(255,255,255,0.5)"
                        autoCapitalize="none"


                />
                   
                <TouchableOpacity style={styles.forgetPassword} >
                    <Text style={styles.forgetPasswordText}>Enter your email to get OTP</Text>
                </TouchableOpacity>
                

                <TouchableOpacity style={styles.buttonContainer} onPress={this._forgetPassword} >
                    <Text style={styles.buttonText}>{this.state.ForgetButton}</Text>
                </TouchableOpacity>    

                <TouchableOpacity style={styles.signup} onPress={() => this.props.navigation.goBack()} >
                    <Text style={styles.signupText}>Already have an account ? Login </Text>
                </TouchableOpacity>
                

            </View>
        );
    }
}
export default Forgetform;

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