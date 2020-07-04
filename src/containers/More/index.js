import React, {Component} from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'rn-fetch-blob';
import _ from 'underscore';
import commonStyle from '../../appConfig/commonStyle';
import fonts from '../../appConfig/font';
import color from '../../appConfig/color';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import styles from './styles';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class More extends Component {
  static defaultProps = {
    isLoading: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      favoriyeData: [],
      downloadArticleList: [],
      activeTab: 'MyFavorites',
      isLoading: false,
    };
  }
  componentWillMount() {}

  componentWillReceiveProps() {}

  render() {
    const {
      favoriyeData,
      downloadArticleList,
      activeTab,
      isLoading,
    } = this.state;

    return (
      <SafeAreaView style={commonStyle.container}>
        <View testID={'More'}>
          <Header {...this.props} title={'More'} hamburgMenu={true} />
        </View>
        <View style={[commonStyle.flex1, {paddingHorizontal: 15}]}>
          <Text>More</Text>
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
)(More);
