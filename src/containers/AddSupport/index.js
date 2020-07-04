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

let data = [
  {
    value: '9924599245',
  },
  {
    value: '8825088250',
  },
  {
    value: '7728899256',
  },
  {
    value: '9988556633',
  },
];
let statusData = [
  {
    value: 'Open',
  },
  {
    value: 'Close',
  },
  {
    value: 'Pandding',
  },
  {
    value: 'Other',
  },
];
let typeData = [
  {
    value: 'Computer Repairing',
  },
  {
    value: 'AC Reparing',
  },
  {
    value: 'Phone Repairing',
  },
  {
    value: 'TV Repairing',
  },
];

class AddSupport extends Component {
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
      isFollowUp: false,
    };
  }
  componentDidMount() {}

  fieldRef = React.createRef();

  //   onSubmit = () => {
  //     let {current: field} = this.fieldRef;

  //     console.log('------------Field----------------', field.value());
  //   };

  render() {
    const {isLoading, isFollowUp} = this.state;

    return (
      <SafeAreaView style={commonStyle.container}>
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
        {isLoading && (
          <View style={[commonStyle.loaderCon]}>
            <Loader />
          </View>
        )}
        <View>
          <Header {...this.props} backArrow={true} title={'Add Support'} />
        </View>
        {/* <KeyboardAvoidingView keyboardVerticalOffset={50} behavior={'padding'}> */}
        <ScrollView>
          <View style={commonStyle.ph10}>
            <TextField
              label="Person"
              formatText={this.formatText}
              baseColor={'#000'}
              tintColor={color.bdTheme}
              ref={this.fieldRef}
            />
          </View>
          <View style={styles.phoneContainer}>
            <View style={{flex: 2, marginRight: 5}}>
              <TextField
                label="Phone"
                keyboardType="phone-pad"
                formatText={this.formatText}
                baseColor={'#000'}
                tintColor={color.bdTheme}
                ref={this.fieldRef}
                maxLength={15}
              />
            </View>
            <View style={{flex: 1, paddingHorizontal: 5}}>
              <Dropdown label="Mobile" dropdownPosition={-4} data={data} />
            </View>
          </View>
          <View style={[commonStyle.ph10]}>
            <Dropdown label="Status" dropdownPosition={-4} data={statusData} />
          </View>
          <View style={[commonStyle.ph10]}>
            <Dropdown label="Type" dropdownPosition={-4} data={typeData} />
          </View>
          <View style={[commonStyle.ph10]}>
            <TextField
              label="Product"
              formatText={this.formatText}
              baseColor={'#000'}
              tintColor={color.bdTheme}
              ref={this.fieldRef}
            />
          </View>
          <View style={[commonStyle.ph10]}>
            <TextField
              label="Assing To"
              formatText={this.formatText}
              baseColor={'#000'}
              tintColor={color.bdTheme}
              ref={this.fieldRef}
            />
          </View>
          <View style={[commonStyle.ph10]}>
            <TextField
              label="Note"
              formatText={this.formatText}
              baseColor={'#000'}
              tintColor={color.bdTheme}
              ref={this.fieldRef}
            />
          </View>
          <View style={[commonStyle.ph10]}>
            <TextField
              label="Street"
              formatText={this.formatText}
              baseColor={'#000'}
              tintColor={color.bdTheme}
              ref={this.fieldRef}
            />
          </View>
          <View style={[commonStyle.ph10]}>
            <TextField
              label="Title"
              formatText={this.formatText}
              baseColor={'#000'}
              tintColor={color.bdTheme}
              ref={this.fieldRef}
            />
          </View>
          <View
            style={{
              marginHorizontal: 10,
              flexDirection: 'row',
              paddingVertical: 30,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => this.setState({isFollowUp: !isFollowUp})}
              activeOpacity={0.4}>
              <Fontisto
                name={isFollowUp ? 'checkbox-active' : 'checkbox-passive'}
                size={18}
                color={'#000'}
              />
            </TouchableOpacity>
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: 16, fontWeight: '600'}}>
                {'Add Followup And Activity'}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.buttonContainer}>
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
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddSupport);
