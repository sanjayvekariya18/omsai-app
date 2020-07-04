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
  KeyboardAvoidingView,
} from 'react-native';
import Modal from 'react-native-modal';
import {NavigationEvents} from 'react-navigation';
import DropdownAlert from 'react-native-dropdownalert';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
import moment from 'moment';
import {
  GetTypes,
  TypesAdd,
  TypesEdit,
  TypeDelete,
} from '../../actions/typesActions';
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

class Types extends Component {
  static PropTypes = {};
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      typesAddOREdit: false,
      loading: false,
      isModalVisible: false,
      typeName: '',
      typeId: '',
    };
  }

  componentDidMount() {
    this.setState({}, () => {
      this.initialData();
    });
  }

  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      typesAddOREdit: false,
      typeName: '',
      typeId: '',
    });
  };

  initialData = () => {
    this.setState({loading: true});
    const {} = this.state;
    this.props.actions
      .GetTypes()
      .then(result => {
        console.log('-----Types---result--------', result);
        if (result.status == 200) {
          this.setState({loading: false});
        }
      })
      .catch(error => {
        console.log('---------List--Error--------', error);
        this.setState({loading: false}, () => {
          this.dropdown.alertWithType('error', error);
        });
      });
  };

  onSave = () => {
    const {typeName} = this.state;
    if (typeName == '') {
      this.setState({loading: false}, () => {
        this.dropdown.alertWithType('error', 'The type field is required.');
      });
    } else if (typeName.indexOf(' ') >= 0) {
      this.dropdown.alertWithType(
        'error',
        'The name may only contain letters.',
      );
    } else {
      const payload = {
        name: typeName,
      };
      this.props.actions
        .TypesAdd(payload)
        .then(result => {
          console.log('-----Type----ADD--result--------', result.data);
          if (result.status == 200 && result.data.status == false) {
            this.dropdown.alertWithType('error', result.data.message.name[0]);
          }
          if (result.status == 201) {
            this.setState({isModalVisible: false}, () => {
              this.dropdown.alertWithType(
                'success',
                'Status added successfully..!',
              );
              this.initialData();
            });
          }
        })
        .catch(error => {
          console.log('-----Type----ADD--Error--------', error);
          this.setState({loading: false}, () => {
            this.dropdown.alertWithType('error', error);
          });
        });
    }
  };

  editTypeSave = () => {
    const {typeName, typeId} = this.state;
    const id = typeId;
    if (typeName == '') {
      this.setState({loading: false}, () => {
        this.dropdown.alertWithType('error', 'The type field is required.');
      });
    } else if (typeName.indexOf(' ') >= 0) {
      this.dropdown.alertWithType(
        'error',
        'The name may only contain letters.',
      );
    } else {
      const payload = {
        name: typeName,
      };
      this.props.actions
        .TypesEdit(id, payload)
        .then(result => {
          console.log('-----EditType----Edit--result--------', result);
          if (result.status == 200) {
            this.setState({isModalVisible: false}, () => {
              this.dropdown.alertWithType(
                'success',
                'Status Updated successfully..!',
              );
              this.initialData();
            });
          }
        })
        .catch(error => {
          console.log('-----EditType----Edit--Error--------', error);
          this.setState({loading: false}, () => {
            this.dropdown.alertWithType('error', error);
          });
        });
    }
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
        {text: 'OK', onPress: () => this.deleteType(id)},
      ],
      {cancelable: false},
    );
  };

  deleteType = id => {
    console.log('-----Delete-ID--------', id);
    this.setState({loading: true});
    this.props.actions
      .TypeDelete(id)
      .then(result => {
        console.log('------Delete--result--------', result);
        if (result.status == 200) {
          this.setState({loading: false}, () => {
            this.dropdown.alertWithType(
              'success',
              'Type delete successfully..!',
            );
            this.initialData();
          });
        }
      })
      .catch(error => {
        console.log('------Type--Error--------', error);
        this.setState({loading: false}, () => {
          this.dropdown.alertWithType('error', error);
        });
      });
  };

  renderItem = ({item}) => {
    return (
      <View>
        <View style={styles.itemCotainer}>
          <View style={[commonStyle.flex1, commonStyle.fdRow]}>
            <View style={styles.iconContainer}>
              <Feather name={'type'} size={30} />
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
          </View>
          <TouchableOpacity
            onPress={() =>
              this.setState({
                typeId: item.id,
                typeName: item.name,
                typesAddOREdit: true,
                isModalVisible: true,
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
    const {leadData, loading, typeName, typesAddOREdit} = this.state;
    const {TypesList} = this.props;

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
          <Header {...this.props} hamburgMenu={true} title={'Types'} />
        </View>
        <View style={styles.container}>
          {TypesList.length > 0 ? (
            <View style={[commonStyle.mrB10]}>
              <FlatList
                data={TypesList}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : (
            <View style={[commonStyle.flex1, commonStyle.jcaiCntr]}>
              <Text style={{fontSize: 22, fontWeight: 'bold', color: 'gray'}}>
                {'No Types'}
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this.toggleModal}
          style={styles.TouchableOpacityStyle}>
          <Entypo
            name={'circle-with-plus'}
            size={52}
            color={color.themeBlueColor}
          />
        </TouchableOpacity>
        {/* -----------------------# Add Status #---------------- */}
        <Modal
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.setState({isModalVisible: false})}
          useNativeDriver={true}>
          <DropdownAlert ref={ref => (this.dropdown = ref)} />
          <View style={styles.modalContainer}>
            <View style={styles.modalHeaderContainer}>
              <View style={styles.modalTitleContainer}>
                <Text style={styles.AddText}>
                  {typesAddOREdit ? 'Edit Types' : 'Add Types'}
                </Text>
              </View>
              <TouchableOpacity
                onPress={this.toggleModal}
                style={{padding: 15}}>
                <AntDesign name={'close'} size={25} />
              </TouchableOpacity>
            </View>
            <View style={commonStyle.ph10}>
              <TextField
                label="Type Name"
                baseColor={'#000'}
                tintColor={color.bdTheme}
                ref={this.fieldRef}
                onChangeText={text => this.setState({typeName: text})}
                value={typeName}
              />
            </View>

            <TouchableOpacity
              onPress={() =>
                typesAddOREdit ? this.editTypeSave() : this.onSave()
              }
              style={styles.buttonContainer}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>{'Save'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    TypesList: state.types.TypesList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        GetTypes,
        TypesAdd,
        TypesEdit,
        TypeDelete,
      },
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Types);
