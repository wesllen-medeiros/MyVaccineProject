import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

const AppStack = createStackNavigator();


import Main from './pages/Main';
import Login from './pages/Login';
import Profile from './pages/Profile';



export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>                
                <AppStack.Screen name="Login" component={ Login } />
                <AppStack.Screen name="Main" component={ Main } />
                <AppStack.Screen name="Profile" component={ Profile } />
            </AppStack.Navigator>
        </NavigationContainer>

    );
}