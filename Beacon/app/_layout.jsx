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
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#1E1E1E',
          borderTopColor: 'transparent',
          height: 70,
          borderRadius: 10,
          left: .1,
          right: .1,
          bottom: 0,
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="index" component={Map} options={{
        headerShown: false,
        tabBarLabel: "Map",
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        }
      }} />
      <Tab.Screen name="report" component={Report} options={{
        headerShown: false,
        tabBarLabel: "Report",
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        }
      }} />
    </Tab.Navigator>
  );
}
