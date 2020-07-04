import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import DefualtScreen from './DefualtScreen';
import Login from './containers/Login';
import Leads from './containers/Leads';
import Statuses from './containers/Statuses';
import Types from './containers/Types';
import Jobs from './containers/Jobs';
import JobDetails from './containers/JobDetails';
import AddJob from './containers/AddJob';
import EditJob from './containers/EditJob';
import EmployeeJobs from './containers/EmployeeJobs';
import SubmitJob from './containers/SubmitJob';
import Employees from './containers/Employees';
import EmployeeDetails from './containers/EmployeeDetails';
import EditEmployee from './containers/EditEmployee';
import AddEmployee from './containers/AddEmployee';
import ForgotPass from './containers/ForgotPass';
import Overview from './containers/Overview';
import Contact from './containers/Contact';
import Activity from './containers/Activity';
import More from './containers/More';
import Profile from './containers/Profile';
import AddSupport from './containers/AddSupport';
import HomeTabs from './HomeTabs';

const StackNavigatorOptions = {
  initialRouteName: 'DefualtScreen',
  headerMode: 'none',
  cardStyle: {
    backgroundColor: 'white',
  },
};

const LeadsNavigator = createStackNavigator(
  {
    Leads: {screen: Leads},
  },
  {
    initialRouteName: 'Leads',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'white',
    },
  },
);

LeadsNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible = false;
  if (navigation.state.index === 0) {
    tabBarVisible = true;
  }
  return {
    tabBarVisible,
  };
};

const OverviewNavigator = createStackNavigator(
  {
    Overview: {screen: Overview},
  },
  {
    initialRouteName: 'Overview',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'white',
    },
  },
);

OverviewNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible = false;
  if (navigation.state.index === 0) {
    tabBarVisible = true;
  }
  return {
    tabBarVisible,
  };
};

const ActivityNavigator = createStackNavigator(
  {
    Activity: {screen: Activity},
  },
  {
    initialRouteName: 'Activity',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'white',
    },
  },
);

ActivityNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible = false;
  if (navigation.state.index === 0 || navigation.state.index === 1) {
    tabBarVisible = true;
  }
  return {
    tabBarVisible,
  };
};

const MoreNavigator = createStackNavigator(
  {
    More: {screen: More},
  },
  {
    initialRouteName: 'More',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'white',
    },
  },
);

MoreNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible = false;
  if (navigation.state.index === 0) {
    tabBarVisible = true;
  }
  return {
    tabBarVisible,
  };
};

const ProfileNavigator = createStackNavigator(
  {
    Profile: {screen: Profile},
  },
  {
    initialRouteName: 'Profile',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'white',
    },
  },
);

ProfileNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible = false;
  if (navigation.state.index === 0) {
    tabBarVisible = true;
  }
  return {
    tabBarVisible,
  };
};

const HomeTab = createBottomTabNavigator(
  {
    LeadswScreen: {screen: LeadsNavigator},
    Overview: {screen: OverviewNavigator},
    Activity: {screen: ActivityNavigator},
    More: {screen: MoreNavigator},
  },
  {
    animationEnabled: true,
    tabBarComponent: HomeTabs,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    lazy: true,
  },
);

const AppNavigator = createStackNavigator(
  {
    DefualtScreen: {
      screen: DefualtScreen,
    },
    Home: {
      screen: HomeTab,
    },
    Employees: {
      screen: Employees,
    },
    EmployeeDetails: {
      screen: EmployeeDetails,
    },
    EditEmployee: {
      screen: EditEmployee,
    },
    EmployeeJobs: {
      screen: EmployeeJobs,
    },
    AddEmployee: {
      screen: AddEmployee,
    },
    Jobs: {
      screen: Jobs,
    },
    SubmitJob: {
      screen: SubmitJob,
    },
    JobDetails: {
      screen: JobDetails,
    },
    AddJob: {
      screen: AddJob,
    },
    EditJob: {
      screen: EditJob,
    },
    Statuses: {
      screen: Statuses,
    },
    Types: {
      screen: Types,
    },
    AddSupport: {
      screen: AddSupport,
    },
    Login: {
      screen: Login,
    },
    ForgotPass: {
      screen: ForgotPass,
    },
  },
  StackNavigatorOptions,
);

export default createAppContainer(AppNavigator);
