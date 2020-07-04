import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  TextInput,
  NativeModules,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DropdownAlert from 'react-native-dropdownalert';
// import CallDetectorManager from 'react-native-call-detection';
import {loginRequest, loginAction} from '../../actions/Auth';
import {NavigationActions, StackActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commonStyle from './../../appConfig/commonStyle';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
import image from './../../appConfig/image';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import styles from './styles';
import {pushNotifications} from '../../services';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PushNotification from 'react-native-push-notification';
import firebase from 'react-native-firebase';
const {height} = Dimensions.get('window');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topBtn: 'login',
      isLogin: true,
      loading: false,
      pushToken: '',
      // username: '',
      // loginPass: '',
      deviceType: 'android',
      username: 'omsai',
      loginPass: '12345678',
    };
  }

  componentDidMount() {
    this.getToken();
  }

  async getToken() {
    let fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      // user has a device token
      console.log('fcmToken--------:', fcmToken);
      this.setState({pushToken: fcmToken});
    }
  }

  _onLogin = () => {
    const {username, loginPass, pushToken, deviceType} = this.state;
    this.setState({loading: true});
    if (username == '') {
      this.setState({loading: false}, () => {
        this.dropdown.alertWithType('error', 'Please enter userid');
      });
    } else if (loginPass == '') {
      this.setState({loading: false}, () => {
        this.dropdown.alertWithType('error', 'Please enter password');
      });
    } else {
      this.setState({loading: true});
      const authData = {
        username: username,
        password: loginPass,
        device_token: pushToken,
        device_type: deviceType,
      };
      console.log('-------apyload-------', authData);
      this.props.actions
        .loginRequest(authData)
        .then(result => {
          this.setState({loading: false});
          console.log('----------Login-result------------', result);
          console.log(
            '-----------token------------',
            result.data.data.api_token,
          );
          if (result.status == 200) {
            AsyncStorage.setItem('token', result.data.data.api_token);
            this.dropdown.alertWithType('success', 'Login Successfully..!');
            setTimeout(() => {
              this.props.navigation.navigate('Leads');
            }, 500);
          }
        })
        .catch(error => {
          console.log('-----Login---Error------------', error);
          if (error.status == 400) {
            this.setState({loading: false}, () => {
              this.dropdown.alertWithType('error', error.data.error);
            });
          } else {
            this.setState({loading: false}, () => {
              this.dropdown.alertWithType('error', error);
            });
          }
        });
    }
  };

  render() {
    const {isMale, username: loginEmail, loginPass, loading} = this.state;
    return (
      <SafeAreaView
        style={[commonStyle.container, {backgroundColor: color.white}]}>
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
        {loading && (
          <View style={commonStyle.loaderCon}>
            <Loader />
          </View>
        )}
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'android' ? 'padding' : 'padding'}
            style={[commonStyle.flex1]}>
            <View>
              <View style={styles.loginLabelContainer}>
                <Text style={styles.loginText}>{'Login'}</Text>
              </View>
              <View style={{paddingHorizontal: 20}}>
                <View style={styles.emailInput}>
                  <View style={styles.logoView}>
                    <Image
                      source={image.mailIcon}
                      style={{height: 18, width: 18}}
                      resizeMode={'contain'}
                    />
                  </View>
                  <TextInput
                    placeholder={'User name'}
                    style={styles.textInput}
                    onChangeText={username => this.setState({username})}
                    value={this.state.username}
                    underlineColorAndroid={'transparent'}
                  />
                </View>
                <View style={styles.textInputContainer}>
                  <View style={styles.logoView}>
                    <Image
                      source={image.loackIcon}
                      style={{height: 20, width: 20}}
                      resizeMode={'contain'}
                    />
                  </View>
                  <TextInput
                    placeholder={'Password'}
                    style={styles.textInput}
                    onChangeText={loginPass => this.setState({loginPass})}
                    value={loginPass}
                    secureTextEntry={true}
                    underlineColorAndroid={'transparent'}
                  />
                </View>
              </View>
              <View style={styles.genderContainer}>
                {/* <TouchableOpacity>
                    <Text style={styles.forgotText}>Forgot password?</Text>
                  </TouchableOpacity> */}
              </View>
            </View>
            <View>
              <View style={[commonStyle.jcaiCntr]}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => this._onLogin()}
                  // onPress={() => this.props.navigation.navigate('Home')}
                  style={[styles.signUpButton, {marginBottom: 15}]}>
                  <Text style={styles.signUpBtnText}>{'LOGIN'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  console.log('---------------Login--state--------', state);
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        loginRequest,
        loginAction,
      },
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
