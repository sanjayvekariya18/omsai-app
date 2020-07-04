import React, {PureComponent} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
  Platform,
  TextInput,
} from 'react-native';
import PropsTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import image from '../appConfig/image';
import font from '../appConfig/font';
import color from '../appConfig/color';
import Menu from './Menu';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import commonStyle from '../appConfig/commonStyle';

class Header extends PureComponent {
  static navigationOptions = {
    tabBarVisible: false,
  };

  static PropsTypes = {
    title: PropsTypes.string,
    hamburgMenu: PropsTypes.bool,
    searchIcon: PropsTypes.bool,
    backArrow: PropsTypes.bool,
    handleSearch: PropsTypes.func,
  };

  static defaultProps = {
    title: 'crm',
    hamburgMenu: false,
    backArrow: false,
    searchIcon: false,
    handleSearch: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      isSearch: false,
    };
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  navigate() {
    this.props.navigation.goBack();
  }

  _hamburgClick() {
    this.setModalVisible(!this.state.modalVisible);
  }

  _LogoClick() {
    this.props.navigation.navigate('Home');
  }

  _isFontSize() {
    this.props.fontViewShow();
  }

  render() {
    const {
      hamburgMenu,
      backArrow,
      title,
      handleSearch,
      searchIcon,
    } = this.props;
    const {isSearchc} = this.state;
    return (
      <SafeAreaView style={[styles.topHead]}>
        {isSearchc ? (
          <View style={[styles.mainView, commonStyle.fdRow, commonStyle.pv10]}>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Search..."
              placeholderTextColor="#d1d1d1"
              autoCapitalize="none"
              // autoFocus={true}
              onChangeText={text => handleSearch(text)}
            />
            <TouchableOpacity
              onPress={() => this.setState({isSearchc: false})}
              style={styles.closehContainer}>
              <AntDesign name={'close'} color={color.white} size={30} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.mainView}>
            {hamburgMenu && (
              <TouchableOpacity onPress={() => this._hamburgClick()}>
                <AntDesign name={'menu-fold'} color={color.white} size={23} />
              </TouchableOpacity>
            )}
            {backArrow && (
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <AntDesign name={'left'} color={color.white} size={23} />
              </TouchableOpacity>
            )}
            <View style={styles.titleContainer}>
              <Text style={styles.headerText}>{title}</Text>
            </View>
            {searchIcon && (
              <TouchableOpacity
                onPress={() => this.setState({isSearchc: true})}
                style={styles.searchContainer}>
                <FontAwesome name={'search'} color={color.white} size={23} />
              </TouchableOpacity>
            )}
          </View>
        )}

        <Modal
          transparent={true}
          // animationType="slide"
          visible={this.state.modalVisible}
          onRequestClose={() => {
            //alert('Modal has been closed.');
          }}>
          <Menu {...this.props} closeModal={this.setModalVisible} />
        </Modal>
      </SafeAreaView>
    );
  }
}

export default Header;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.themeBlueColor,
    paddingHorizontal: 10,
  },
  titleContainer: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
  },
  headerText: {
    ...font.fs18b,
    color: color.white,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  searchContainer: {
    flex: 1,
    height: 50,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closehContainer: {
    flex: 1,
    height: 40,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFF',
    marginLeft: 5,
    borderRadius: 3,
  },
  input: {
    paddingHorizontal: 10,
    height: 40,
    width: '86%',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 3,
    marginRight: 2,
    color: '#FFF',
    fontSize: 18,
  },
  topHead: {
    ...ifIphoneX(
      {
        paddingTop: 30,
      },
      {
        paddingTop: Platform.OS === 'android' ? 0 : 20,
      },
    ),
  },
});
