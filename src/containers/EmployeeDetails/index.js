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
import moment from 'moment';
import {GetEmployeeDetails} from '../../actions/employeesActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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

class EmployeeDetails extends Component {
  static PropTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      topBtn: 'now',
      loading: false,
      empDetails: props.navigation.state.params.employeeData,
    };
  }

  componentDidMount() {
    // this.setState({loading: true}, () => {
    //   this.initialData();
    // });
  }

  initialData = () => {
    this.setState({loading: true});
    const {empId} = this.props.navigation.state.params;

    this.props.actions
      .GetEmployeeDetails(empId)
      .then(result => {
        console.log('------EmployeeDetails-result--------', result);
        if (result.status == 200) {
          this.setState({
            empDetails: result.data.data,
            loading: false,
          });
        }
      })
      .catch(error => {
        console.log('-------------------EMP-error---------------------', error);
        this.setState({loading: false}, () => {
          this.dropdown.alertWithType('error', error);
        });
      });
  };

  render() {
    const {empDetails, loading} = this.state;
    return (
      <SafeAreaView style={commonStyle.container}>
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
        {loading && (
          <View style={[commonStyle.loaderCon]}>
            <Loader />
          </View>
        )}
        <View>
          <Header {...this.props} backArrow={true} title={'Employee Details'} />
        </View>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.personalContainer}>
              <View>
                <Text style={styles.personalText}>{empDetails.name}</Text>
              </View>
              <View>
                <FontAwesome5
                  name={'user-tie'}
                  size={20}
                  color={color.bdTheme}
                />
              </View>
            </View>
            <View style={[commonStyle.pdB10]}>
              <View style={styles.rowBlockContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Created On'}</Text>
                  <Text style={styles.valueText}>
                    {moment(empDetails.created_at).format(
                      'DD, MMMM YYYY, h:mm:ss a',
                    )}
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Updated On'}</Text>
                  <Text style={styles.valueText}>
                    {moment(empDetails.updated_at).format(
                      'DD, MMMM YYYY, h:mm:ss a',
                    )}
                  </Text>
                </View>
              </View>
              <View style={styles.dividerBorder} />
              <View style={styles.rowBlockContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Contact-1'}</Text>
                  <Text style={styles.valueText}>{empDetails.contact_1}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Contact-2'}</Text>
                  <Text style={styles.valueText}>
                    {empDetails.contact_2 ? empDetails.contact_2 : ''}
                  </Text>
                </View>
              </View>
              <View style={styles.rowBlockContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Usen Name'}</Text>
                  <Text style={styles.valueText}>{empDetails.username}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Email'}</Text>
                  <Text style={styles.valueText}>
                    {empDetails.email ? empDetails.email : ''}
                  </Text>
                </View>
              </View>
              {/* <View style={styles.rowBlockContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.lableText}>{'Expected ClosingOn'}</Text>
                  <Text style={styles.valueText}>{'03 Mar 2020'}</Text>
                </View>
              </View> */}
              {/* <View style={styles.dividerBorder} /> */}
            </View>
            {/* ------------------------# STATISTICS # -------------------------------*/}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    EmployeesList: state.employees.EmployeesList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        GetEmployeeDetails,
      },
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeeDetails);
