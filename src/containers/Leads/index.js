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

class Leads extends Component {
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
    this.state = {
      topBtn: 'now',
      isLoading: false,
      leadData: [
        {
          title: 'Total Inquiry',
          total: 151,
        },
        {
          title: 'Visit Done',
          total: 50,
        },
        {
          title: 'New',
          total: 50,
        },
        {
          title: 'Payment Pending',
          total: 50,
        },
        {
          title: 'Telecomunicated',
          total: 90,
        },
      ],
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

  renderItem = ({item}) => {
    return (
      <View>
        <TouchableOpacity activeOpacity={0.6} style={styles.itemCotainer}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.totalCountText}>{item.total}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const {leadData, isLoading} = this.state;
    return (
      <SafeAreaView style={commonStyle.container}>
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
        {isLoading && (
          <View style={[commonStyle.loaderCon]}>
            <Loader />
          </View>
        )}
        <View>
          <Header {...this.props} hamburgMenu={true} title={'Leads'} />
        </View>
        <View style={styles.container}>
          <View style={[commonStyle.mrB10]}>
            <FlatList
              numColumns={2}
              data={leadData}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
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
)(Leads);
