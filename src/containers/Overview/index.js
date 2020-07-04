import React, {Component} from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import _ from 'underscore';
import commonStyle from '../../appConfig/commonStyle';
import fonts from '../../appConfig/font';
import color from '../../appConfig/color';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import styles from './styles';

class Overview extends Component {
  static PropTypes = {
    isBgimage: PropTypes.bool,
    imageurl: PropTypes.string,
  };

  static defaultProps = {
    isLoading: false,
    isBgimage: true,
    imageurl:
      'https://analyticsindiamag.com/wp-content/uploads/2018/12/image.jpg',
  };
  constructor(props) {
    super(props);
    this.state = {
      topBtn: 'now',
      isLoading: false,
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then(token => {
      console.log('-------------------token-----------------', token);
    });
  }

  componentWillMount() {}

  componentWillReceiveProps(props) {}

  fieldRef = React.createRef();

  onSubmit = () => {
    let {current: field} = this.fieldRef;

    console.log(field.value());
  };

  formatText = text => {
    return text.replace(/[^+\d]/g, '');
  };

  render() {
    const {isLoading} = this.state;
    return (
      <SafeAreaView style={commonStyle.container}>
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
        {isLoading && (
          <View style={[commonStyle.loaderCon]}>
            <Loader />
          </View>
        )}
        <View>
          <Header {...this.props} hamburgMenu={true} title={'overview'} />
        </View>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.personalContainer}>
              <View>
                <Text style={styles.personalText}>{'Personal'}</Text>
              </View>
              <View>
                <Octicons name={'bookmark'} size={20} color={color.bdTheme} />
              </View>
            </View>
            <View style={[commonStyle.pdB10]}>
              <View style={styles.rowBlockContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Assigned To'}</Text>
                  <Text style={styles.valueText}>{'Shakespeare'}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Updated On'}</Text>
                  <Text style={styles.valueText}>
                    {'22 Feb 2020, 04:24 pm'}
                  </Text>
                </View>
              </View>
              <View style={styles.dividerBorder} />
              <View style={styles.rowBlockContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Stage'}</Text>
                  <Text style={styles.valueText}>{'Open'}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Type'}</Text>
                  <Text style={styles.valueText}>
                    {'computer call'.toUpperCase()}
                  </Text>
                </View>
              </View>
              <View style={styles.rowBlockContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Source'}</Text>
                  <Text style={styles.valueText}>{'-'}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Priority'}</Text>
                  <Text style={styles.valueText}>{'Normal'}</Text>
                </View>
              </View>
              <View style={styles.rowBlockContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Expected ClosingOn'}</Text>
                  <Text style={styles.valueText}>{'03 Mar 2020'}</Text>
                </View>
              </View>
              {/* <View style={styles.dividerBorder} /> */}
            </View>
            {/* ------------------------# STATISTICS # -------------------------------*/}
            <View style={styles.personalContainer}>
              <View>
                <Text style={styles.personalText}>{'Statistics'}</Text>
              </View>
            </View>
            <View style={[commonStyle.pdB10]}>
              <View style={[styles.rowBlockContainer, {marginTop: 15}]}>
                <View style={styles.staticRowBody}>
                  <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                      name={'file-plus'}
                      size={20}
                      color={'gray'}
                    />
                  </View>
                  <Text style={[styles.lableText]}>{'1 Notes'}</Text>
                </View>
                <View style={styles.staticRowBody}>
                  <View style={styles.staticRowBody}>
                    <View style={styles.iconContainer}>
                      <MaterialCommunityIcons
                        name={'file-document-box-outline'}
                        size={20}
                        color={'gray'}
                      />
                    </View>
                    <Text style={[styles.lableText]}>{'No Followup'}</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.rowBlockContainer, {marginTop: 15}]}>
                <View style={styles.staticRowBody}>
                  <View style={styles.iconContainer}>
                    <FontAwesome5
                      name={'user-friends'}
                      size={20}
                      color={'gray'}
                    />
                  </View>
                  <Text style={[styles.lableText]}>{'No Meetings'}</Text>
                </View>
                <View style={styles.staticRowBody}>
                  <View style={styles.iconContainer}>
                    <FontAwesome name={'phone'} size={20} color={'gray'} />
                  </View>
                  <Text style={[styles.lableText]}>{'No Calls'}</Text>
                </View>
              </View>
              <View style={[styles.rowBlockContainer, {marginTop: 15}]}>
                <View style={styles.staticRowBody}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name={'email'} size={20} color={'gray'} />
                  </View>
                  <Text style={[styles.lableText]}>{'No Emails'}</Text>
                </View>
                <View style={styles.staticRowBody}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name={'sms'} size={20} color={'gray'} />
                  </View>
                  <Text style={[styles.lableText]}>{'No SMS'}</Text>
                </View>
              </View>
              <View style={styles.dividerBorder} />
              <View style={styles.rowBlockContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Created On'}</Text>
                  <Text style={styles.valueText}>
                    {'22 Feb 2018, 04:24 pm'}
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Owner'}</Text>
                  <Text style={styles.valueText}>{'me'.toUpperCase()}</Text>
                </View>
              </View>
              <View style={styles.rowBlockContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Updated'}</Text>
                  <Text style={styles.valueText}>{'me'.toUpperCase()}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Overview);
