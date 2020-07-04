import React, {Component} from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
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
import {Dropdown} from 'react-native-material-dropdown';
import {EmployeeEdit} from '../../actions/employeesActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
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

class EditEmployee extends Component {
  static PropTypes = {
    isBgimage: PropTypes.bool,
    imageurl: PropTypes.string,
  };

  static defaultProps = {
    isLoading: false,
    isBgimage: true,
  };
  constructor(props) {
    super(props);
    console.log(
      '---------------employee--Props---------',
      props.navigation.state.params,
    );
    const {employeeData} = props.navigation.state.params;

    this.state = {
      topBtn: 'now',
      loading: false,
      isFollowUp: false,
      empId: employeeData.id,
      empName: employeeData.name,
      empUserName: employeeData.username,
      empContact_1: employeeData.contact_1,
      empContact_2: employeeData.contact_2,
      empEmail: employeeData.email,
    };
  }
  componentDidMount() {}

  fieldRef = React.createRef();

  onSave = () => {
    const {
      empName,
      empUserName,
      empContact_1,
      empContact_2,
      empEmail,
      empId,
    } = this.state;

    this.setState({loading: true});
    if (empName == '') {
      this.setState({loading: false}, () => {
        this.dropdown.alertWithType('error', 'The name field is required.');
      });
    } else if (empUserName == '') {
      this.setState({loading: false}, () => {
        this.dropdown.alertWithType('error', 'The username field is required.');
      });
    } else {
      const EmpPayload = {
        name: empName,
        username: empUserName,
        contact_1: empContact_1,
        contact_2: empContact_2,
        email:empEmail
      };
      this.props.actions
        .EmployeeEdit(empId, EmpPayload)
        .then(result => {
          console.log('----- EditEmploeyee-result--------', result);
          if (result.status == 200) {
            this.setState({loading: false}, () => {
              this.dropdown.alertWithType('success', 'Employee Updated.');
              setTimeout(() => {
                this.props.navigation.goBack();
              }, 2000);
            });
          }
        })
        .catch(error => {
          console.log('------Edit--EMP--resultr--------', error);
          this.setState({loading: false}, () => {
            this.dropdown.alertWithType('error', error);
          });
        });
    }
  };

  render() {
    const {
      empName,
      empContact_1,
      empContact_2,
      empUserName,
      empEmail,
      loading,
      isFollowUp,
    } = this.state;
    const {employeeData} = this.props.navigation.state.params;
    return (
      <SafeAreaView style={commonStyle.container}>
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
        {loading && (
          <View style={[commonStyle.loaderCon]}>
            <Loader />
          </View>
        )}
        <View>
          <Header {...this.props} backArrow={true} title={'Edit Employee '} />
        </View>
        {/* <KeyboardAvoidingView keyboardVerticalOffset={50} behavior={'padding'}> */}
        <ScrollView>
          <View style={commonStyle.ph10}>
            <TextField
              label="Name"
              baseColor={'#000'}
              tintColor={color.bdTheme}
              ref={this.fieldRef}
              onChangeText={text => this.setState({empName: text})}
              value={empName}
            />
          </View>
          <View style={commonStyle.ph10}>
            <TextField
              label="User Name"
              baseColor={'#000'}
              tintColor={color.bdTheme}
              ref={this.fieldRef}
              onChangeText={text => this.setState({empUserName: text})}
              value={empUserName}
            />
          </View>
          <View style={styles.phoneContainer}>
            <TextField
              label="Contact - 1"
              keyboardType="phone-pad"
              formatText={this.formatText}
              baseColor={'#000'}
              tintColor={color.bdTheme}
              ref={this.fieldRef}
              onChangeText={text => this.setState({empContact_1: text})}
              value={empContact_1}
              maxLength={10}
            />
          </View>
          <View style={styles.phoneContainer}>
            <TextField
              label="Contact - 2"
              keyboardType="phone-pad"
              formatText={this.formatText}
              baseColor={'#000'}
              tintColor={color.bdTheme}
              ref={this.fieldRef}
              onChangeText={text => this.setState({empContact_2: text})}
              value={empContact_2}
              maxLength={10}
            />
          </View>
          <View style={commonStyle.ph10}>
            <TextField
              label="Email"
              baseColor={'#000'}
              tintColor={color.bdTheme}
              ref={this.fieldRef}
              onChangeText={text => this.setState({empEmail: text})}
              value={empEmail}
            />
          </View>

          <TouchableOpacity
            onPress={() => this.onSave()}
            style={styles.buttonContainer}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{'Save'}</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        {/* </KeyboardAvoidingView> */}
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        EmployeeEdit,
      },
      dispatch,
    ),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditEmployee);
