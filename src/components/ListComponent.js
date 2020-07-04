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
  StyleSheet,
} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import DropdownAlert from 'react-native-dropdownalert';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';
import _ from 'underscore';
import commonStyle from '../appConfig/commonStyle';
import color from '../appConfig/color';
import Header from '../components/Header';
import Loader from '../components/Loader';

class ListComponent extends Component {
  static PropTypes = {
    listData: PropTypes.array,
    detailsFunc: PropTypes.func,
    editFunc: PropTypes.func,
    deleteFunc: PropTypes.func,
    iconName: PropTypes.string,
  };
  static defaultProps = {
    listData: [],
    detailsFunc: () => {},
    editFunc: () => {},
    deleteFunc: () => {},
    iconName: 'briefcase',
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({}, () => {});
  }

  renderItem = ({item}) => {
    const {iconName, editFunc, deleteFunc, detailsFunc} = this.props;
    return (
      <View>
        <View style={styles.itemCotainer}>
          <TouchableOpacity
            onPress={() => detailsFunc(item)}
            style={[commonStyle.flex1, commonStyle.fdRow]}>
            <View style={styles.iconContainer}>
              <FontAwesome name={'briefcase'} size={25} />
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
                {item.status.name.toUpperCase()}
                {/* {moment(item.updated_at).format('DD, MMMM YYYY, h:mm:ss a')} */}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => editFunc(item)}
            activeOpacity={0.5}
            style={styles.editContainer}>
            <Feather name={'edit'} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteFunc(item.id)}
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
    const {listData} = this.props;
    return (
      <SafeAreaView style={commonStyle.container}>
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
        {loading && (
          <View style={[commonStyle.loaderCon]}>
            <Loader />
          </View>
        )}
        <View style={styles.container}>
          <View style={[commonStyle.mrB10]}>
            <FlatList
              data={listData}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default ListComponent;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.themeBlueColor,
    paddingHorizontal: 10,
  },
  titleContainer: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
  },
  headerText: {
    ...font.fs18b,
    color: color.white,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});
