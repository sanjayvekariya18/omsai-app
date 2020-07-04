import React, {Component} from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
import Header from '../../components/Header';
import styles from './styles';

import commonStyle from '../../appConfig/commonStyle';
import image from '../../appConfig/image';

const deviceWidth = Dimensions.get('window').width;

class Contact extends Component {
  static defaultProps = {
    isLoading: false,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  render() {
    return (
      <SafeAreaView style={commonStyle.container}>
        <View animation="fadeInDownBig" duration={1500} direction="normal">
          <Header {...this.props} hamburgMenu={true} title={'Contact'} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.personalContainer}>
              <View>
                <Text style={styles.personalText}>{'Persons'}</Text>
              </View>
              <View>
                <Octicons name={'plus'} size={20} color={color.bdTheme} />
              </View>
            </View>
            <View style={styles.contactContainer}>
              <MaterialIcons
                name={'perm-contact-calendar'}
                color={'gray'}
                size={30}
              />
              <View style={styles.rightContentContainer}>
                <Text style={styles.contactNameText}>
                  {'Pramukh Enterprise'}
                </Text>
                <Text style={styles.contactNumberText}>{'9988776655'}</Text>
              </View>
            </View>
            <View style={styles.battomContainer}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons name={'md-call'} color={'gray'} size={30} />
                <Text style={styles.callSMSText}>{'Call'}</Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <MaterialIcons name={'sms'} color={'gray'} size={30} />
                <Text style={styles.callSMSText}>{'SMS'}</Text>
              </View>
            </View>
            <View style={styles.personalContainer}>
              <View>
                <Text style={styles.personalText}>{'Organization'}</Text>
              </View>
              <View>
                <Octicons name={'plus'} size={20} color={color.bdTheme} />
              </View>
            </View>
            <View style={[commonStyle.jcaiCntr, {height: 70}]}>
              <Text style={styles.contactNumberText}>{'No Organization'}</Text>
            </View>
            <View style={styles.personalContainer}>
              <View>
                <Text style={styles.personalText}>{'Address'}</Text>
              </View>
              <View>
                <Octicons name={'plus'} size={20} color={color.bdTheme} />
              </View>
            </View>
            <View style={[styles.contactContainer, {paddingTop: 20}]}>
              <Entypo name={'location-pin'} color={'gray'} size={30} />
              <View style={styles.rightContentContainer}>
                <Text style={styles.contactNumberText}>{'Work'}</Text>
                <Text style={styles.contactNameText}>{'adress'}</Text>
              </View>
              <View>
                <MaterialIcons name={'edit'} size={25} color={'gray'} />
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
)(Contact);
