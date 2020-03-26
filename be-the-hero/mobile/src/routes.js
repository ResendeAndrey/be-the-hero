import React from 'react'; 
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Incidents from './pages/incidents';
import Detail from './pages/detail'

const appStack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <appStack.Navigator screenOptions={{ headerShown: false}}>
                <appStack.Screen name="Incidents" component ={Incidents} />
                <appStack.Screen name="Detail" component ={Detail} />
            </appStack.Navigator>

        </NavigationContainer>
    )
}