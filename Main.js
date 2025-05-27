// Main.js - Improved Navigation
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import DirectoryScreen from './DirectoryScreen';
import BatchListScreen from './BatchListScreen';
import App from './App'; // Your flashcard screen

const Stack = createStackNavigator();

export default function Main() {
  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: '#4287f5',
          background: '#161a23',
          card: '#23283a',
          text: '#ffffff',
          border: 'rgba(255,255,255,0.1)',
          notification: '#fc5252',
        },
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#161a23" />
      
      <Stack.Navigator
        initialRouteName="Directory"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#161a23' },
          gestureEnabled: true,
          animationEnabled: true,
        }}
      >
        <Stack.Screen 
          name="Directory" 
          component={DirectoryScreen} 
        />
        
        <Stack.Screen 
          name="BatchList" 
          component={BatchListScreen} 
          options={({ route }) => ({
            title: `${route.params.groupKey} Batches`,
          })}
        />
        
        <Stack.Screen 
          name="Flashcards" 
          component={App} 
          options={{
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}