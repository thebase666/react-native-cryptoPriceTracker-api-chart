import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import MainLayout from "./MainLayout";
import { LineChart } from 'react-native-wagmi-charts';
import IconTextButton from "../components/IconTextButton";
import BalanceInfo from "../components/BalanceInfo";
import { SIZES, COLORS, FONTS, dummyData, icons } from "../constants";

const CoinChart = () => {
  const [coin, setCoin] = useState([]);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [currentPrice, setCurrentPrice] = useState();
  const [priceChange, setPriceChange] = useState(0);

  useEffect(async () => {
    const exploreData = await fetch(`https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=usd&days=1`).
      then((res) => res.json());
    setCoin(exploreData.prices);
    console.log("first")
  }, [selectedCoin]);

  useEffect(async () => {
    const exploreData2 = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h").
      then((res) => res.json());
    setCoins(exploreData2);
  }, []);

  const dataChart = coin.map(([timestamp, value]) => ({ timestamp, value }))

  return (
    <MainLayout>
      <View style={{ flex: 1, backgroundColor: 'black' }}>

        <View
          style={{
            paddingHorizontal: SIZES.padding,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            backgroundColor: COLORS.gray,
          }}
        >
          <BalanceInfo
            title={selectedCoin}
            displayAmount={currentPrice}
            changePct={priceChange}
            containerStyle={{
              marginTop: 30,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              marginBottom: -15,
              paddingHorizontal: SIZES.radius,
            }}
          >
            <IconTextButton
              label="Transfer"
              icon={icons.send}
              containerStyle={{
                flex: 1,
                height: 40,
                marginRight: SIZES.radius,
              }}
              onPress={() => console.log("transfer")}
            />
            <IconTextButton
              label="Withdraw"
              icon={icons.withdraw}
              containerStyle={{
                flex: 1,
                height: 40,
              }}
              onPress={() => console.log("Withdraw")}
            />
          </View>
        </View>

        <LineChart.Provider data={dataChart}>
          <LineChart>
            <LineChart.Path color={"green"} />
          </LineChart>
        </LineChart.Provider>


        <FlatList
          data={coins}
          keyExtractor={(item) => item.id}
          containerStyle={{
            marginTop: 30,
          }}
          renderItem={({ item }) => {
            // console.log(item)
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
                onPress={() => {
                  setSelectedCoin(item.id);
                  setCurrentPrice(item.current_price);
                  setPriceChange(item.price_change_percentage_24h);
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

export default CoinChart

const styles = StyleSheet.create({})