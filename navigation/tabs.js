import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import CoinChart from "../screens/CoinChart";
import Market from "../screens/Market";
import Profile from "../screens/Profile";
import { COLORS, icons } from "../constants";
import TabIcon from "../components/TabIcon";
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const [isTradeModalVisible, setTradeModalVisibility] = useRecoilState(modalState);

  function tradeTabButtonOnClickHandler() {
    setTradeModalVisibility(!isTradeModalVisible);
  }

  const TabBarCustomButton = ({ children, onPress }) => {
    return (
      <TouchableOpacity
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 80,
          backgroundColor: "black",
          // borderTopColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon focused={focused} icon={icons.home} label="Home" />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="CoinChart"
        component={CoinChart}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon focused={focused} icon={icons.briefcase} label="CoinChart" />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault()
            }
          }
        }}
      />
      <Tab.Screen
        name="Trade"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                focused={focused}
                icon={isTradeModalVisible ? icons.close : icons.trade}
                label="Trade"
                isTrade={true}
              />
            );
          },
          tabBarButton: (props) => (//有这个不切换到home 但是需要component={Home}
            <TabBarCustomButton
              {...props}
              onPress={() => tradeTabButtonOnClickHandler()}
            />
          ),
        }}

      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {//不显示但是可以点击进行路由
              return (
                <TabIcon focused={focused} icon={icons.market} label="Market" />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault()
            }
          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon
                  focused={focused}
                  icon={icons.profile}
                  label="Profile"
                />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault()
            }
          }
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

