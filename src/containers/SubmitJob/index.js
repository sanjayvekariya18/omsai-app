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
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import DropdownAlert from 'react-native-dropdownalert';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';

import * as JobEdit from '../../actions/jobsActions';
import * as GetStatuses from '../../actions/statusesActions';
import * as GetTypes from '../../actions/typesActions';
import * as GetEmployees from '../../actions/employeesActions';

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

class SubmitJob extends Component {
  constructor(props) {
    super(props);
    const jobData = props.navigation.state.params.jobData;
    console.log('-------jobdata-----', jobData);
    this.state = {
      loading: false,
      isFollowUp: false,
      jonId: jobData.id,
      name: jobData.name,
      statusId: jobData.status ? jobData.status.id : undefined,
      typeId: jobData.type ? jobData.type.id : undefined,
      employeeId: jobData.user ? jobData.user.id : undefined,
      statusName: jobData.status ? jobData.status.name : '',
      typeName: jobData.type ? jobData.type.name : '',
      employeeName: jobData.user ? jobData.user.name : '',
      status: [],
      types: [],
      employees: [],
      notes: jobData.notes ? jobData.notes : '',
      address: jobData.address ? jobData.address : '',
      contact: jobData.contact ? jobData.contact : '',
      currentLongitude: jobData.lng ? jobData.lng : '',
      currentLatitude: jobData.lat ? jobData.lat : '',
    };
  }

  componentDidMount = () => {
    var that = this;
    that.initialDat();
    //Checking for the permission just after component loaded
    if (Platform.OS === 'ios') {
      this.callLocation(that);
    } else {
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            that.callLocation(that);
          } else {
            alert('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
      requestLocationPermission();
    }
  };

  callLocation(that) {
    //alert("callLocation Called");
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        that.setState({currentLongitude: currentLongitude});
        //Setting state Longitude to re re-render the Longitude Text
        that.setState({currentLatitude: currentLatitude});
        //Setting state Latitude to re re-render the Longitude Text
      },
      error => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }
  componentWillUnmount = () => {
    Geolocation.clearWatch(this.watchID);
  };

  initialDat = () => {
    this.statusInitialData(),
      this.typeInitialData(),
      this.employeeInitialData();
  };

  statusInitialData = () => {
    const {} = this.state;
    let statusData = [];
    this.props.statusActions
      .GetStatuses()
      .then(result => {
        if (result.status == 200) {
          result.data.data.map((item, index) => {
            statusData.push({id: item.id, value: item.name});
          });
          this.setState({loading: false, status: statusData});
        }
      })
      .catch(error => {
        // console.log('------Status---List--Error--------', error);
        this.setState({loading: false}, () => {
          this.dropdown.alertWithType('error', error);
        });
      });
  };

  typeInitialData = () => {
    const {} = this.state;
    let typesData = [];

    this.props.typeActions
      .GetTypes()
      .then(result => {
        // console.log('-----Types---result--------', result);
        if (result.status == 200) {
          result.data.data.map((item, index) => {
            typesData.push({id: item.id, value: item.name});
          });
          this.setState({loading: false, types: typesData});
        }
      })
      .catch(error => {
        // console.log('---------List--Error--------', error);
        this.setState({loading: false}, () => {
          this.dropdown.alertWithType('error', error);
        });
      });
  };

  employeeInitialData = () => {
    const {} = this.state;
    let empData = [];
    this.props.employeeActions
      .GetEmployees()
      .then(result => {
        // console.log('------EMPList--result--------', result);
        if (result.status == 200) {
          result.data.data.map((item, index) => {
            empData.push({id: item.id, value: item.name});
          });
          this.setState({loading: false, employees: empData});
        }
      })
      .catch(error => {
        // console.log('------EMPList--Error--------', error);
        this.setState({loading: false}, () => {
          this.dropdown.alertWithType('error', error);
        });
      });
  };

  fieldRef = React.createRef();

  onSave = () => {
    const {
      jonId,
      name,
      contact,
      statusId,
      typeId,
      employeeId,
      notes,
      address,
      currentLatitude,
      currentLongitude,
      loading,
    } = this.state;
    const id = jonId;

    this.setState({loading: true});
    if (name == '') {
      this.setState({loading: false}, () => {
        this.dropdown.alertWithType('error', 'The name is required.');
      });
    } else if (contact == '') {
      this.setState({loading: false}, () => {
        this.dropdown.alertWithType('error', 'The contact is required.');
      });
    } else if (statusId == undefined) {
      this.setState({loading: false}, () => {
        this.dropdown.alertWithType('error', 'The status is required.');
      });
    } else if (typeId == undefined) {
      this.setState({loading: false}, () => {
        this.dropdown.alertWithType('error', 'The type is required.');
      });
    } else if (employeeId == undefined) {
      this.setState({loading: false}, () => {
        this.dropdown.alertWithType('error', 'The employee is required.');
      });
    } else if (notes == '') {
      this.setState({loading: false}, () => {
        this.dropdown.alertWithType('error', 'The notes is required.');
      });
    } else {
      const payload = {
        name: name,
        contact: contact,
        status_id: statusId,
        type_id: typeId,
        user_id: employeeId,
        notes: notes,
        address: address,
        lat: currentLatitude,
        lng: currentLongitude,
      };
      this.props.actions
        .JobEdit(id, payload)
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

  ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
  }

  render() {
    const {
      name,
      typeId,
      statusId,
      status,
      types,
      employees,
      notes,
      address,
      contact,
      statusName,
      typeName,
      employeeName,
      loading,
      currentLongitude,
      currentLatitude,
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
          <Header {...this.props} backArrow={true} title={'Submit Job'} />
        </View>
        <ScrollView>
          <View style={commonStyle.ph10}>
            <TextField
              disabled
              label="Name"
              baseColor={'#000'}
              tintColor={color.bdTheme}
              ref={this.fieldRef}
              onChangeText={text => this.setState({name: text})}
              value={name}
            />
          </View>
          <View style={styles.phoneContainer}>
            <TextField
              disabled
              label="Contact"
              keyboardType="phone-pad"
              formatText={this.formatText}
              baseColor={'#000'}
              tintColor={color.bdTheme}
              ref={this.fieldRef}
              onChangeText={text => this.setState({contact: text})}
              value={contact}
              maxLength={10}
            />
          </View>
          <View style={commonStyle.ph10}>
            <Dropdown
              label="Status"
              dropdownPosition={-4}
              data={status.reverse()}
              value={statusName}
              onChangeText={(statusName, i, j) => {
                this.setState({statusName, statusId: j[i].id});
              }}
            />
          </View>
          {/* <View style={commonStyle.ph10}>
            <Dropdown
              label="Types"
              dropdownPosition={-4}
              data={types.reverse()}
              value={typeName}
              onChangeText={(typeName, i, j) => {
                this.setState({typeName, typeId: j[i].id});
              }}
            />
          </View> */}
          {/* <View style={commonStyle.ph10}>
            <Dropdown
              label="Employee"
              data={employees.reverse()}
              value={employeeName}
              onChangeText={(employeeName, i, j) => {
                this.setState({employeeName, employeeId: j[i].id});
              }}
            />
          </View> */}
          <View style={[commonStyle.ph10]}>
            <View style={[commonStyle.mrB15, commonStyle.mrT20]}>
              <Text>{'Notes'}</Text>
            </View>
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Notes"
              placeholderTextColor="grey"
              numberOfLines={5}
              multiline={true}
              onChangeText={text => this.setState({notes: text})}
              value={notes}
            />
          </View>
          <View style={[commonStyle.ph10]}>
            <View style={[commonStyle.mrB15, commonStyle.mrT20]}>
              <Text>{'Rating'}</Text>
            </View>
            <View style={{borderWidth: 0.5}}>
              <Rating
                showRating
                onFinishRating={this.ratingCompleted}
                style={{paddingVertical: 10}}
                ratingTextColor={'#C35817'}
              />
            </View>
          </View>
          {/* <View style={[commonStyle.ph10]}>
            <View style={[commonStyle.mrB15, commonStyle.mrT25]}>
              <Text>{'Address'}</Text>
            </View>
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Address"
              placeholderTextColor="grey"
              numberOfLines={5}
              multiline={true}
              onChangeText={text => this.setState({address: text})}
              value={address}
            />
          </View>

          <View style={styles.phoneContainer}>
            <TextField
              label="Latitude"
              keyboardType="phone-pad"
              formatText={this.formatText}
              baseColor={'#000'}
              tintColor={color.bdTheme}
              ref={this.fieldRef}
              onChangeText={text => this.setState({currentLatitude: text})}
              value={this.state.currentLatitude}
            />
          </View>
          <View style={styles.phoneContainer}>
            <TextField
              label="Longitude"
              keyboardType="phone-pad"
              formatText={this.formatText}
              baseColor={'#000'}
              tintColor={color.bdTheme}
              ref={this.fieldRef}
              onChangeText={text => this.setState({currentLongitude: text})}
              value={this.state.currentLongitude}
            />
          </View> */}
          <TouchableOpacity
            // onPress={() => this.onSave()}
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
  return {
    StatusList: state.statuses.StatusList,
    TypesList: state.types.TypesList,
  };
}

function mapDispatchToProps(dispatch) {
  //   console.log('--Actions---dispatch------------', dispatch);
  return {
    actions: bindActionCreators(JobEdit, dispatch),
    statusActions: bindActionCreators(GetStatuses, dispatch),
    typeActions: bindActionCreators(GetTypes, dispatch),
    employeeActions: bindActionCreators(GetEmployees, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitJob);
