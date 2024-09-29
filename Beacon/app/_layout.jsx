import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Map from "../components/Map";
import Report from "../components/Report";

const Tab = createBottomTabNavigator()

export default function AppLayout() {
  return (
    <Tab.Navigator
      independent={true}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'index') {
            iconName = 'map-outline';
          } else if (route.name === 'report') {
            iconName = 'report-outline';
          }
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="index" component={Map} />
      <Tab.Screen name="report" component={Report} />
    </Tab.Navigator>
  );
}
