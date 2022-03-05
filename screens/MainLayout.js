import React, { useRef, useEffect } from "react";
import { View, Text, Animated } from "react-native";
import { COLORS, SIZES, icons } from "../constants";
import IconTextButton from "../components/IconTextButton";
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';


const MainLayout = ({ children }) => {
  const [isTradeModalVisible, setIsTradeModalVisible] = useRecoilState(modalState);
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  //初始化modalAnimatedValue 通过useEffec设定变化条件变化值和时间 
  //modalAnimatedValue直接给opacity 线性函数传导到定位top的modalY
  useEffect(() => {
    if (isTradeModalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isTradeModalVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 240],
  });

  return (
    <View style={{ flex: 1 }}>
      {children}

      {/* dim Background */}

      {isTradeModalVisible && (
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            backgroundColor: COLORS.transparentBlack,
          }}
          opacity={modalAnimatedValue}
        />
      )}

      {/* model */}
      <Animated.View
        style={{
          position: "absolute",
          height: 500,
          left: 0,
          top: modalY,
          width: "100%",
          padding: SIZES.padding,
          // backgroundColor: COLORS.primary,
          backgroundColor: COLORS.transparentBlack,
        }}
      >
        <IconTextButton
          label="transfer"
          icon={icons.send}
          onPress={() => console.log("transfer")}
        />
        <IconTextButton
          label="withdraw"
          icon={icons.withdraw}
          containerStyle={{ marginTop: SIZES.base }}
          onPress={() => console.log("Withdraw")}
        />
      </Animated.View>
    </View>
  );
};

export default MainLayout;

