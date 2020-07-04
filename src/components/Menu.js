import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationActions, StackActions} from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logout} from '../actions/Auth';
import Entypo from 'react-native-vector-icons/Entypo';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import color from '../appConfig/color';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import commonStyle from '../appConfig/commonStyle';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class Menu extends PureComponent {
  static navigationOptions = {
    tabBarVisible: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      isOnDefaultToggleSwitch: true,
      isSwitch1On: false,
    };
  }

  _btnClick(scr) {
    console.log('scr', scr);
    this.props.navigation.navigate(scr);
    this.props.closeModal(false);
  }

  _logOut() {
    AsyncStorage.clear(() => {
      let routeName = 'Login';
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName})],
      });
      this.props.closeModal(false);
      this.props.navigation.dispatch(resetAction);
      this.props.actions.logout();
    });
  }

  render() {
    console.log('-------menu auth----------', this.props.auth);
    const {auth} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.secondContainer}>
          <View style={styles.mainView}>
            <ScrollView>
              <View style={styles.closeIconView}>
                <Image
                  source={{
                    uri:
                      'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
                  }}
                  style={styles.profileImage}
                />
                <View style={commonStyle.mrT10}>
                  <Text style={styles.userNameText}>{auth.name}</Text>
                  {auth.role == 'admin' ? (
                    <Text style={{color: '#566573'}}>{auth.email}</Text>
                  ) : (
                    <Text style={{color: '#566573'}}>{auth.contact_1}</Text>
                  )}
                </View>
              </View>
              <View style={styles.dividerBorder} />
              {auth.role == 'admin' ? (
                <View style={commonStyle.pdL20}>
                  <TouchableOpacity
                    onPress={() => this._btnClick('Statuses')}
                    style={styles.bodyContzent}>
                    <FontAwesome5 name={'staylinked'} size={25} />
                    <View style={commonStyle.mrL20}>
                      <Text style={styles.textLabel}>{'Statuses'}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this._btnClick('Types')}
                    style={styles.bodyContzent}>
                    <Feather name={'type'} size={25} />
                    <View style={commonStyle.mrL20}>
                      <Text style={styles.textLabel}>{'Types'}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this._btnClick('Employees')}
                    style={styles.bodyContzent}>
                    <FontAwesome5 name={'user-tie'} size={25} />
                    <View style={commonStyle.mrL20}>
                      <Text style={styles.textLabel}>{'Employee'}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this._btnClick('Jobs')}
                    style={styles.bodyContzent}>
                    <FontAwesome name={'briefcase'} size={25} />
                    <View style={commonStyle.mrL20}>
                      <Text style={styles.textLabel}>{'Jobs'}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={commonStyle.pdL20}>
                  <TouchableOpacity
                    onPress={() => this._btnClick('EmployeeJobs')}
                    style={styles.bodyContzent}>
                    <FontAwesome name={'briefcase'} size={25} />
                    <View style={commonStyle.mrL20}>
                      <Text style={styles.textLabel}>{'Jobs'}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              {/* <View style={commonStyle.pdL20}>
                <TouchableOpacity
                  onPress={() => this._btnClick('Overview')}
                  style={styles.bodyContzent}>
                  <Image
                    source={image.feedIcon}
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                  <View style={commonStyle.mrL20}>
                    <Text style={styles.textLabel}>{'Overview'}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this._btnClick('AddSupport')}
                  style={styles.bodyContzent}>
                  <MaterialIcons
                    name={'more-horiz'}
                    size={28}
                    color={color.blackTheme}
                  />
                  <View style={commonStyle.mrL20}>
                    <Text style={styles.textLabel}>{'Add Support'}</Text>
                  </View>
                </TouchableOpacity>
              </View> */}
            </ScrollView>
            <TouchableOpacity
              onPress={() => this._logOut()}
              style={styles.logoutContainer}>
              <Entypo name={'log-out'} size={28} color={color.blackTheme} />
              <View style={commonStyle.mrL20}>
                <Text style={styles.textLabel}>{'Logout'}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: 'rgba(0,0,0,0.6)', width: 75}}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => this.props.closeModal(false)}
            />
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.userCredentials,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        logout,
      },
      dispatch,
    ),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width,
    height: height,
  },
  secondContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  mainView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    backgroundColor: 'gray',
  },
  userNameText: {
    color: '#2C3E50',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeIconView: {
    flex: 1,
    marginLeft: 20,
    ...ifIphoneX(
      {
        marginTop: 30,
      },
      {
        marginTop: Platform.OS === 'android' ? 20 : 20,
      },
    ),
  },
  dividerBorder: {
    height: 0.4,
    width: '100%',
    backgroundColor: 'gray',
    marginVertical: 10,
  },
  bodyContzent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  textLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 50,
    marginLeft: 25,
  },
});
