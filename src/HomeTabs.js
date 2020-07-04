// @flow
import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import image from './appConfig/image';
import color from './appConfig/color';
import Home from './containers/Overview';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {NavigationEvents} from 'react-navigation';
import font from './appConfig/font';

const {height, width} = Dimensions.get('window');

class HomeTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navBtn: 'Leads',
      miniPlay: false,
    };
  }

  static tabs = [
    {
      Name: 'Leads',
      label: 'Leads',
      activeImg: image.homeActive,
      inActiveImg: image.homeInactive,
    },
    {
      Name: 'Overview',
      label: 'Overview',
      activeImg: image.homeActive,
      inActiveImg: image.homeInactive,
    },
    {
      Name: 'Activity',
      label: 'Activity',
      activeImg: image.homeActive,
      inActiveImg: image.homeInactive,
    },
    {
      Name: 'More',
      label: 'More',
      activeImg: image.homeActive,
      inActiveImg: image.homeInactive,
    },
  ];

  componentDidMount() {}

  componentWillReceiveProps(props) {}

  payloadFocus(payload) {
    this.setState({navBtn: payload.action.routeName || this.state.navBtn});
  }
  render() {
    const {navigation} = this.props;
    const navState = navigation.state;
    const {miniPlay} = this.state;
    const cIdx = navState.index;
    return (
      <SafeAreaView style={styles(this.props).tabs}>
        <NavigationEvents onWillFocus={payload => this.payloadFocus(payload)} />
        <View style={styles(this.props).container}>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            {HomeTabs.tabs.map((info, i) => {
              return (
                <View key={i} style={styles(this.props).tab}>
                  {info.Name == 'Leads' && (
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation &&
                          this.props.navigation.navigate(info.Name);
                      }}
                      style={[
                        styles(this.props).btnFlex,
                        {
                          height: 50,
                          backgroundColor: '#fff',
                          justifyContent: 'center',
                        },
                      ]}>
                      <View>
                        <View style={styles(this.props).tab}>
                          <Image
                            source={image.feedIcon}
                            style={{
                              tintColor:
                                cIdx == i ? color.blackTheme : color.bdTheme,
                              height: 20,
                              width: 20,
                            }}
                          />
                          <Text
                            style={{
                              ...font.fs10SB,
                              textAlign: 'center',
                              color:
                                cIdx == i ? color.blackTheme : color.bdTheme,
                            }}>
                            {'Overview'}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  {info.Name == 'Overview' && (
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation &&
                          this.props.navigation.navigate(info.Name);
                      }}
                      style={[
                        styles(this.props).btnFlex,
                        {
                          height: 50,
                          backgroundColor: '#fff',
                          justifyContent: 'center',
                        },
                      ]}>
                      <View>
                        <View style={styles(this.props).tab}>
                          <Image
                            source={image.feedIcon}
                            style={{
                              tintColor:
                                cIdx == i ? color.blackTheme : color.bdTheme,
                              height: 20,
                              width: 20,
                            }}
                          />
                          <Text
                            style={{
                              ...font.fs10SB,
                              textAlign: 'center',
                              color:
                                cIdx == i ? color.blackTheme : color.bdTheme,
                            }}>
                            {'Overview'}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}

                  {info.Name == 'Activity' && (
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation &&
                          this.props.navigation.navigate(info.Name);
                      }}
                      style={[
                        styles(this.props).btnFlex,
                        {
                          height: 50,
                          backgroundColor: '#fff',
                          justifyContent: 'center',
                        },
                      ]}>
                      <View>
                        <View style={styles(this.props).tab}>
                          <MaterialIcons
                            name={'local-activity'}
                            size={30}
                            color={cIdx == i ? color.blackTheme : color.bdTheme}
                          />
                          <Text
                            style={{
                              ...font.fs10SB,
                              textAlign: 'center',
                              color:
                                cIdx == i ? color.blackTheme : color.bdTheme,
                            }}>
                            Activity
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  {info.Name == 'More' && (
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation &&
                          this.props.navigation.navigate(info.Name);
                      }}
                      style={[
                        styles(this.props).btnFlex,
                        {
                          height: 50,
                          backgroundColor: '#fff',
                          justifyContent: 'center',
                        },
                      ]}>
                      <View>
                        <View style={styles(this.props).tab}>
                          <MaterialIcons
                            name={'more-horiz'}
                            size={40}
                            color={cIdx == i ? color.blackTheme : color.bdTheme}
                          />
                          <Text
                            style={{
                              ...font.fs10SB,
                              textAlign: 'center',
                              color:
                                cIdx == i ? color.blackTheme : color.bdTheme,
                            }}>
                            More
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  {info.Name == 'Profile' && (
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation &&
                          this.props.navigation.navigate(info.Name);
                      }}
                      style={[
                        styles(this.props).btnFlex,
                        {
                          height: 50,
                          backgroundColor: '#fff',
                          justifyContent: 'center',
                        },
                      ]}>
                      <View>
                        <View style={styles(this.props).tab}>
                          <Image
                            source={image.profileIcon}
                            style={{
                              tintColor:
                                cIdx == i ? color.blackTheme : color.bdTheme,
                              height: 20,
                              width: 20,
                            }}
                          />
                          <Text
                            style={{
                              ...font.fs10SB,
                              textAlign: 'center',
                              color:
                                cIdx == i ? color.blackTheme : color.bdTheme,
                            }}>
                            Profile
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default HomeTabs;

const styles = props =>
  StyleSheet.create({
    tabs: {
      backgroundColor: '#fff',
    },
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderTopWidth: 1,
      borderTopColor: '#e1e1e1',
      borderRadius: 5,
      height: 60,
    },
    tab: {
      flexGrow: 1,
      // height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    nameStyle: {
      fontSize: 12,
    },
    btnFlex: {
      flex: 1,
    },
    miniPlayerConteainer: {
      height: 80,
      width: width,
      backgroundColor: color.white,
    },
  });

{
  /* <View style={styles(this.props).container}>
{
  HomeTabs.tabs.map((info, i) => {
    // const color = i === cIdx
    // ? Theme.palette.primary
    // : Theme.palette.lightGray;
    return (
      <View>
        <TouchableOpacity key={`mainslider_${info.Name}`} onPress={() => { this.props.navigation.navigate(info.Name) }}>
          <View>
            <View style={styles(this.props).tab}>
              {/* <Image source={cIdx == i ? info.activeImg : info.inActiveImg} style={{ height: 32, width: 32, resizeMode: 'contain' }} /> */
}
//               <Text style={[styles(this.props).nameStyle, { color: cIdx == i ? '#1B1E21' : 'red' }]}>{info.label}</Text>
//             </View>
//           </View>
//         </TouchableOpacity>
//       </View>
//     );
//   })
// }
// </View> */}
