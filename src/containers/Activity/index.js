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
} from 'react-native';
import {connect} from 'react-redux';
import _ from 'underscore';
import {bindActionCreators} from 'redux';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
import Header from '../../components/Header';
import styles from './styles';

import commonStyle from '../../appConfig/commonStyle';
import image from '../../appConfig/image';

class Activity extends Component {
  static defaultProps = {
    isLoading: false,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  mostPlayedArt = () => {};

  render() {
    const {soundList} = this.state;

    return (
      <SafeAreaView style={commonStyle.container}>
        <View animation="fadeInDownBig" duration={1500} direction="normal">
          <Header {...this.props} hamburgMenu={true} title={'Activity'} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={[commonStyle.pv10]}>
              <Text>{'Activity'}</Text>
            </View>
          </View>
        </ScrollView>
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
)(Activity);
