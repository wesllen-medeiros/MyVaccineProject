import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

const AppStack = createStackNavigator();


import Main from './pages/Main';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Allergy from './pages/Allergy';
import Applied from './pages/Applied';
import HealthUnities from './pages/HealthUnities';
import Schedule from './pages/Schedule';



export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>                
                <AppStack.Screen name="Login" component={ Login } />
                <AppStack.Screen name="Main" component={ Main } />
                <AppStack.Screen name="Profile" component={ Profile } />
                <AppStack.Screen name="Register" component={ Register } />
                <AppStack.Screen name="Allergy" component={ Allergy } />
                <AppStack.Screen name="Applied" component={ Applied } />
                <AppStack.Screen name="HealthUnities" component={ HealthUnities } />
                <AppStack.Screen name="Schedule" component={ Schedule } />
            </AppStack.Navigator>
        </NavigationContainer>

    );
}