import React, { Fragment,Component } from "react";
import { 
    View,
    StatusBar, 
    StyleSheet,
    Image,
} from "react-native";
import Signupform from "./Signupform";

class Signup extends Component {
    render() {
        return (
            <Fragment>
              <StatusBar  barStyle="light-content" hidden = {false} backgroundColor = "#F04343"  />
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                           <Image style={styles.logo}  source={require('../../../images/logo.png')} /> 
                    </View>
                    <View style={styles.formContainer}>
                            <Signupform  navigation={ this.props.navigation }    />
                    </View>
                                        
                </View>
            </Fragment>
            
        );
    }
}
export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor :'#F04343',
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    title: {
        color:'#fff',
        fontSize:22
    },  
    logo: {
        height:200,
        width:200,  
        marginTop:50,
    },
    logoContainer: {
        alignItems:'center',
        justifyContent:'center',
        // flexGrow:1,
    },
    formContainer : {

    }
});