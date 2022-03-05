import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import MainLayout from "./MainLayout";
import { COLORS, FONTS, icons, constants, SIZES } from "../constants";

const Market = () => {
  const [coins, setCoins] = useState([]);

  useEffect(async () => {
    const exploreData = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h").
      then((res) => res.json());

    setCoins(exploreData);
  }, []);

  return (
    <MainLayout>
      <View style={{ backgroundColor: 'black', flex: 1 }}>
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h1,
            padding: 30
          }}>Market</Text>
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h3,
            padding: 30
          }}>Top Currency</Text>

        <FlatList
          data={coins}
          keyExtractor={(item) => item.id}
          containerStyle={{
            marginTop: 30,
          }}
          renderItem={({ item }) => {
            let priceColor = "black"
            return (
              <TouchableOpacity
                style={{
                  height: 66,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: SIZES.padding,
                }}
              >
                {/* logo */}
                <View
                  style={{
                    width: 35,
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                </View>
                {/* name */}
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.h3,
                    }}
                  >
                    {item.id}
                  </Text>
                </View>

                {/* figures  */}
                <View>
                  <Text
                    style={{
                      color: COLORS.white,
                      textAlign: "right",
                      ...FONTS.h4,
                    }}
                  >
                    ${item.current_price}
                  </Text>
                  <Text
                    style={{
                      color: item.price_change_percentage_24h > 0 ? "green" : "red",
                      textAlign: "right",
                      ...FONTS.h5,
                      paddingBottom: 10
                    }}
                  >
                    24h      ${item.price_change_percentage_24h}
                  </Text>

                  {/* price_change_percentage_24h */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </MainLayout>
  )
}
export default Market

const styles = StyleSheet.create({})



