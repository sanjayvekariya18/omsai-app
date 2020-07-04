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
  PermissionsAndroid,
} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import DropdownAlert from 'react-native-dropdownalert';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
import moment from 'moment';
import {GetJobs, JobDelete} from '../../actions/jobsActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';
import _ from 'underscore';
import commonStyle from '../../appConfig/commonStyle';
import ListComponent from '../../components/ListComponent';
import fonts from '../../appConfig/font';
import color from '../../appConfig/color';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import styles from './styles';

class Jobs extends Component {
  static PropTypes = {};
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      topBtn: 'now',
      loading: false,
      filterData: [],
    };
  }

  componentDidMount() {
    this.requestLocationPermission();
    this.setState({}, () => {
      this.initialData();
    });
  }
  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        alert('You can use the location');
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  initialData = () => {
    this.setState({loading: true});
    const {} = this.state;
    this.props.actions
      .GetJobs()
      .then(result => {
        console.log('------Jobs----List--result--------', result);
        if (result.status == 200) {
          this.setState({loading: false});
        }
      })
      .catch(error => {
        console.log('------Jobs---List--Error--------', error);
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
        {text: 'OK', onPress: () => this.deleteJob(id)},
      ],
      {cancelable: false},
    );
  };

  deleteJob = id => {
    console.log('-----Delete-ID--------', id);
    this.setState({loading: true});
    this.props.actions
      .JobDelete(id)
      .then(result => {
        console.log('------Delete--result--------', result);
        if (result.status == 200) {
          this.setState({loading: false}, () => {
            this.dropdown.alertWithType(
              'success',
              'Job delete successfully..!',
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
    let statusColor = '#3f51b5';
    if (item.status && item.status.name.toUpperCase() == 'open'.toUpperCase()) {
      statusColor = '#008000';
    } else if (
      item.status &&
      item.status.name.toUpperCase() == 'Panding'.toUpperCase()
    ) {
      statusColor = '#CD7300';
    } else if (
      item.status &&
      item.status.name.toUpperCase() == 'solve'.toUpperCase()
    ) {
      statusColor = '#E42217';
    }
    return (
      <View>
        <View style={styles.itemCotainer}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('JobDetails', {
                jobData: item,
              })
            }
            style={[commonStyle.flex1, commonStyle.fdRow]}>
            <View style={styles.iconContainer}>
              <FontAwesome name={'briefcase'} size={25} />
            </View>
            <View />
            <View style={styles.nameContainer}>
              <View>
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
                  {item.type.name.toUpperCase()}
                </Text>
              </View>
              <View style={commonStyle.jcaiCntr}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: statusColor,
                    marginTop: 5,
                  }}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}>
                  {item.status.name.toUpperCase()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('EditJob', {
                jobData: item,
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

  search = text => {
    const {JobsList} = this.props;
    let arr = [];
    text = text.toUpperCase();
    JobsList.length > 0 &&
      JobsList.map(item => {
        if (
          item.name.toUpperCase().indexOf(text) > -1 ||
          item.status.name.toUpperCase().indexOf(text) > -1 ||
          item.type.name.toUpperCase().indexOf(text) > -1
        ) {
          arr.push(item);
        }
      });
    this.setState({filterData: arr});
  };

  render() {
    const {leadData, loading, filterData} = this.state;
    const {JobsList, fi} = this.props;

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
          <Header
            {...this.props}
            hamburgMenu={true}
            searchIcon={true}
            title={'Jobs'}
            handleSearch={text => this.search(text)}
          />
        </View>
        <View style={styles.container}>
          {filterData.length ? (
            <View style={[commonStyle.mrB10]}>
              <FlatList
                data={filterData}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : JobsList.length ? (
            <View style={[commonStyle.mrB10]}>
              <FlatList
                data={JobsList}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : (
            <View style={[commonStyle.flex1, commonStyle.jcaiCntr]}>
              <Text style={{fontSize: 22, fontWeight: 'bold', color: 'gray'}}>
                {'No jobs'}
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.props.navigation.navigate('AddJob')}
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
    JobsList: state.jobs.JobsList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        GetJobs,
        JobDelete,
      },
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Jobs);
