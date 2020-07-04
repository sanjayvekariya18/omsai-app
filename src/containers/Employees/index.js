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
  Alert,
} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import DropdownAlert from 'react-native-dropdownalert';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
import moment from 'moment';
import {GetEmployees, EmployeeDelete} from '../../actions/employeesActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';
import _ from 'underscore';
import commonStyle from '../../appConfig/commonStyle';
import fonts from '../../appConfig/font';
import color from '../../appConfig/color';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import styles from './styles';

class Employees extends Component {
  static PropTypes = {};
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      topBtn: 'now',
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({}, () => {
      this.initialData();
    });
  }

  initialData = () => {
    this.setState({loading: true});
    const {} = this.state;
    this.props.actions
      .GetEmployees()
      .then(result => {
        console.log('------EMPList--result--------', result);
        if (result.status == 200) {
          this.setState({loading: false});
        }
      })
      .catch(error => {
        console.log('------EMPList--Error--------', error);
        this.setState({loading: false}, () => {
          this.dropdown.alertWithType('error', error);
        });
      });
  };
  confirmation = (id, name) => {
    console.log('-----Delete-ID--------', id);
    Alert.alert(
      '',
      'Are you sure you want to delete ' + name,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.deleteEmployee(id)},
      ],
      {cancelable: false},
    );
  };

  deleteEmployee = id => {
    console.log('-----Delete-ID--------', id);
    this.setState({loading: true});
    this.props.actions
      .EmployeeDelete(id)
      .then(result => {
        console.log('------Delete--result--------', result);
        if (result.status == 200) {
          this.setState({loading: false}, () => {
            this.dropdown.alertWithType(
              'success',
              'Employee delete successfully..!',
            );
            this.initialData();
          });
        }
      })
      .catch(error => {
        console.log('------EMPList--Error--------', error);
        this.setState({loading: false}, () => {
          this.dropdown.alertWithType('error', error);
        });
      });
  };

  renderItem = ({item}) => {
    return (
      <View>
        <View style={styles.itemCotainer}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('EmployeeDetails', {
                employeeData: item,
              })
            }
            style={[commonStyle.flex1, commonStyle.fdRow]}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name={'user-tie'} size={30} />
            </View>
            <View />
            <View style={[commonStyle.mrL10, {flex: 1}]}>
              <Text
                style={{fontSize: 18, fontWeight: '500'}}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {item.name}
              </Text>
              <Text
                style={styles.renderText}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {moment(item.updated_at).format('DD, MMMM YYYY, h:mm:ss a')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('EditEmployee', {
                employeeData: item,
              })
            }
            activeOpacity={0.5}
            style={styles.editContainer}>
            <Feather name={'edit'} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.confirmation(item.id, item.name)}
            activeOpacity={0.5}
            style={styles.editContainer}>
            <AntDesign name={'delete'} size={25} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const {leadData, loading} = this.state;
    const {EmployeesList} = this.props;

    return (
      <SafeAreaView style={commonStyle.container}>
        <NavigationEvents onDidFocus={() => this.initialData()} />
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
        {loading && (
          <View style={[commonStyle.loaderCon]}>
            <Loader />
          </View>
        )}
        <View>
          <Header {...this.props} hamburgMenu={true} title={'Employee'} />
        </View>
        <View style={styles.container}>
          <View style={[commonStyle.mrB10]}>
            <FlatList
              data={EmployeesList}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.props.navigation.navigate('AddEmployee')}
          style={styles.TouchableOpacityStyle}>
          <Entypo
            name={'circle-with-plus'}
            size={52}
            color={color.themeBlueColor}
          />
        </TouchableOpacity>
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
        GetEmployees,
        EmployeeDelete,
      },
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Employees);
