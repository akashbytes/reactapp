import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert


            
} from "react-native";

class Otpform extends Component {

    
    constructor(props){
        super(props)
        this.state = {
            otp:'',
            userID:'', 
            otpButton:'Submit',
        }
    }
    
    // this.props.navigation.state.params.userId, 
    // 

    componentDidMount(){
        this.setState({otp:this.props.navigation.state.params.otp,'userID':this.props.navigation.state.params.userId });
    }
    otpFunction = () =>{
        const { otp }  = this.state;
        const { userID }  = this.state;

        this.setState({ otpButton: 'Please Wait..' });
        
        fetch('https://adeeclinic.com/Api/otp.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            otp: otp,
            userId:userID,
          })
        }).then((response) => response.json())
              .then((responseJson) => {
                // If server response message same as Data Matched
            
                 // console.warn(responseJson);
               if(responseJson.msg === 'success')
                {
                    //Then open Profile activity and send user email to profile activity.
                    // let userid =  responseJson.userData.user_id;
                    this.setState({ otpButton: 'Submit' });
 
                    this.props.navigation.navigate('ResetPassword',{
                     otp: responseJson.userData.email_otp,
                     userId: responseJson.userData.user_id,
                   });
                }
                else{
                  Alert.alert(responseJson.msg);
                   this.setState({ otpButton: 'Submit' });
                }
   
              }).catch((error) => {
                console.error(error);
              });


    }


    render() {

        console.warn(this.props.navigation);

        return (
            <View style={styles.container}>
                 <TextInput  
                         style={styles.input}
                         placeholder="Enter Otp"
                         placeholderTextColor="rgba(255,255,255,0.5)"
                         onChangeText={otp => this.setState({otp})}
                        autoCapitalize="none"

                />      

                <TouchableOpacity style={styles.buttonContainer}  onPress={this.otpFunction} >
                    <Text style={styles.buttonText}>{this.state.otpButton}</Text>
                </TouchableOpacity>    

                <TouchableOpacity style={styles.signup} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.signupText}>Already have an account ? Login  </Text>
                </TouchableOpacity>
                
                

            </View>
        );
    }
}
export default Otpform;

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