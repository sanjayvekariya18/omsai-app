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
import {EmployeeAdd} from '../../actions/employeesActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Octicons from 'react-native-vector-icons/Octicons';
import _ from 'underscore';
import commonStyle from '../../appConfig/commonStyle';
import fonts from '../../appConfig/font';
import color from '../../appConfig/color';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import styles from './styles';

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isFollowUp: false,
      empId: '',
      empName: '',
      empUserName: '',
      password: '',
      password_confirmation: '',
      empContact_1: '',
      empContact_2: '',
      empEmail: '',
    };
  }
  componentDidMount() {}

  fieldRef = React.createRef();

  onSave = () => {
    const {
      empName,
      empUserName,
      password,
      password_confirmation,
      empContact_1,
      empContact_2,
      empEmail,
      loading,
    } = this.state;
    console.log('------------------check-password-----------', password);
    console.log(
      '------------------password_confirmation-----------',
      password_confirmation,
    );
    this.setState({loading: true});
    if (empName == '') {
      this.setState({loading: false}, () => {
        this.dropdown.alertWithType('error', 'The name field is required.');
      });
    } else if (empUserName == '') {
      this.setState({loading: false}, () => {
        this.dropdown.alertWithType('error', 'The username field is required.');
      });
    } else if (password == '') {
      this.setState({loading: false}, () => {
        this.dropdown.alertWithType('error', 'The password field is required.');
      });
    } else if (password.length < 8) {
      this.setState({loading: false}, () => {
        this.dropdown.alertWithType(
          'error',
          'The password must be at least 8 characters.',
        );
      });
    } else if (password_confirmation == '') {
      this.setState({loading: false}, () => {
        this.dropdown.alertWithType(
          'error',
          'The password confirmation does not match..',
        );
      });
    } else if (password !== password_confirmation) {
      this.setState({loading: false}, () => {
        this.dropdown.alertWithType(
          'error',
          'The password confirmation does not match..',
        );
      });
    } else {
      const payload = {
        name: empName,
        username: empUserName,
        password: password,
        password_confirmation: password_confirmation,
        contact_1: empContact_1,
        contact_2: empContact_2,
      };
      this.props.actions
        .EmployeeAdd(payload)
        .then(result => {
          if (result.status == 201) {
            this.setState({loading: false}, () => {
              this.props.navigation.goBack();
            });
          }
        })
        .catch(error => {
          this.setState({loading: false}, () => {
            this.dropdown.alertWithType('error', error);
          });
        });
    }
  };

  render() {
    const {
      empName,
      empUserName,
      password,
      password_confirmation,
      empContact_1,
      empContact_2,
      empEmail,
      loading,
    } = this.state;
    return (
      <SafeAreaView style={commonStyle.container}>
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
        {loading && (
          <View style={[commonStyle.loaderCon]}>
            <Loader />
          </View>
        )}
        <View>
          <Header {...this.props} backArrow={true} title={'Add Employee '} />
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
          <View style={commonStyle.ph10}>
            <TextField
              label="Password"
              baseColor={'#000'}
              tintColor={color.bdTheme}
              ref={this.fieldRef}
              onChangeText={text => this.setState({password: text})}
              value={password}
              secureTextEntry={true}
            />
          </View>
          <View style={commonStyle.ph10}>
            <TextField
              label="Confirmation Password "
              baseColor={'#000'}
              tintColor={color.bdTheme}
              ref={this.fieldRef}
              onChangeText={text =>
                this.setState({password_confirmation: text})
              }
              value={password_confirmation}
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
        EmployeeAdd,
      },
      dispatch,
    ),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddEmployee);
