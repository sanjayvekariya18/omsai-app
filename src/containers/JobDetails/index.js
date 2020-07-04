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
import moment from 'moment';
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

class JobDetails extends Component {
  static PropTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    const jobData = props.navigation.state.params.jobData;
    this.state = {
      topBtn: 'now',
      isLoading: false,
      name: jobData.name,
    };
  }
  componentDidMount() {}

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
    const jobData = this.props.navigation.state.params.jobData;
    console.log('-------jobdata-----', jobData);
    return (
      <SafeAreaView style={commonStyle.container}>
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
        {isLoading && (
          <View style={[commonStyle.loaderCon]}>
            <Loader />
          </View>
        )}
        <View>
          <Header {...this.props} backArrow={true} title={'Job Details'} />
        </View>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.personalContainer}>
              <View>
                <Text style={styles.personalText}>
                  {jobData.name.toUpperCase()}
                </Text>
              </View>
              <View>
                <Octicons name={'bookmark'} size={20} color={color.bdTheme} />
              </View>
            </View>
            <View style={[commonStyle.pdB10]}>
              <View style={styles.rowBlockContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Created On'}</Text>
                  <Text style={styles.valueText}>
                    {moment(jobData.created_at).format(
                      'DD, MMMM YYYY, h:mm:ss a',
                    )}
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Updated On'}</Text>
                  <Text style={styles.valueText}>
                    {moment(jobData.updated_at).format(
                      'DD, MMMM YYYY, h:mm:ss a',
                    )}
                  </Text>
                </View>
              </View>
              <View style={styles.dividerBorder} />
              <View style={styles.rowBlockContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Name'}</Text>
                  <Text style={styles.valueText}>{jobData.name}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Type'}</Text>
                  <Text style={styles.valueText}>
                    {jobData.type ? jobData.type.name.toUpperCase() : ''}
                  </Text>
                </View>
              </View>
              <View style={styles.rowBlockContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Employee'}</Text>
                  <Text style={styles.valueText}>
                    {jobData.user ? jobData.user.name.toUpperCase() : ''}
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Status'}</Text>
                  <Text style={styles.valueText}>
                    {jobData.status ? jobData.status.name.toUpperCase() : ''}
                  </Text>
                </View>
              </View>
              <View style={styles.rowBlockContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Contact'}</Text>
                  <Text style={styles.valueText}>+91-{jobData.contact}</Text>
                </View>
              </View>
              <View style={styles.rowBlockContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Notes'}</Text>
                  <Text style={styles.valueText}>{jobData.notes}</Text>
                </View>
              </View>
              <View style={styles.rowBlockContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Notes'}</Text>
                  <Text style={styles.valueText}>{jobData.address}</Text>
                </View>
              </View>
              <View style={styles.rowBlockContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Latitude'}</Text>
                  <Text style={styles.valueText}>{jobData.lat}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Longitude'}</Text>
                  <Text style={styles.valueText}> {jobData.lng}</Text>
                </View>
              </View>
              {/* <View style={styles.dividerBorder} /> */}
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
)(JobDetails);
