import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme";
import { debounce } from "lodash";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon, CalendarDaysIcon } from "react-native-heroicons/solid";
import { fetchLocation, fetchWeatherForecast } from "../api/weather";
import { weatherImages } from "../constants";
import { getData, storeData } from "../utils/asyncStorage";
import * as Progress from "react-native-progress";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const HomeScreen = () => {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  const handleLocation = (loc) => {
    // console.log(loc);
    setLocations([]);
    toggleSearch(false);
    setLoading(true);
    // fetch weather
    fetchWeatherForecast({
      cityName: loc.name,
      days: "7",
    }).then((data) => {
      setWeather(data);
      setLoading(false);
      storeData("city", loc.name);
      // console.log("got forcast: ", data);
    });
  };

  const handleSearch = (value) => {
    // fetch location
    if (value.length > 2) {
      fetchLocation({ cityName: value }).then((data) => {
        setLocations(data);
      });
    }
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData("city");
    let cityName = "Monrovia";
    if (myCity) cityName = myCity;
    setLoading(true);
    // fetch weather
    fetchWeatherForecast({
      cityName,
      days: "7",
    }).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);
  const { current, location } = weather;

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        blurRadius={80}
        source={require("../assets/images/bg.png")}
        className="w-full h-full absolute"
      />
      {loading ? (
        <View className="flex-1 flex-row justify-center items-center">
          <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
        </View>
      ) : (
        <SafeAreaView className="flex flex-1" style={{ top: hp(3) }}>
          {/* Search Section */}
          <View className="mx-4 relative z-50" style={{ height: "7%" }}>
            <View
              className="flex-row justify-end items-center rounded-full"
              style={{
                backgroundColor: showSearch
                  ? theme.bgWhite(0.5)
                  : "transparent",
              }}
            >
              {showSearch ? (
                <TextInput
                  onChangeText={handleTextDebounce}
                  placeholder="Search City"
                  placeholderTextColor={"lightgray"}
                  className="pl-6 h-14 flex-1 text-base text-white"
                  style={{ zIndex: 999 }}
                />
              ) : null}

              <TouchableOpacity
                onPress={() => toggleSearch(!showSearch)}
                style={{ backgroundColor: theme.bgWhite(0.3) }}
                className="rounded-full p-3 m-1"
              >
                <MagnifyingGlassIcon size="25" color="white" />
              </TouchableOpacity>
            </View>
            {locations.length > 0 && showSearch ? (
              <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
                {locations.map((loc, index) => {
                  let showBorder = index + 1 != locations.length;
                  let borderClass = showBorder
                    ? "border-b-2 border-b-gray-400"
                    : "border-0";

                  return (
                    <TouchableOpacity
                      onPress={() => handleLocation(loc)}
                      key={index}
                      className={
                        "flex-row items-center border-0 p-3 px-4 mb-1 " +
                        borderClass
                      }
                    >
                      <MapPinIcon size="20" color="gray" />
                      <Text className="text-black text-lg ml-2">
                        {loc?.name}, {loc?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 20 }}
          >
            {/* forcast section */}
            <View className="mx-4 flex justify-around flex-1 mb-4">
              {/* location */}
              <Text
                className="text-white text-center font-bold"
                style={{ top: hp(1.5), fontSize: hp(4), lineHeight: hp(4) }}
              >
                {location?.name},
                <Text
                  className="text-gray-300 font-simibold"
                  style={{ fontSize: hp(2.5), lineHeight: hp(4) }}
                >
                  {"  "}
                  {location?.country}
                </Text>
              </Text>
              {/* weather image */}
              <View className="flex-row justify-center" style={{ top: hp(4) }}>
                <Image
                  source={weatherImages[current?.condition?.text]}
                  style={{ width: hp(25), height: hp(25) }}
                />
              </View>
              {/* Daily stats */}
              <View className="space-y-2">
                <Text
                  className="text-center font-bold text-white text-6xl ml-5"
                  style={{ top: hp(7.5) }}
                >
                  {current?.temp_c}&#176;
                </Text>
                <Text
                  className="text-center font-bold tracking-widest bottom-3 text-white text-lg"
                  style={{ top: hp(7) }}
                >
                  {current?.condition?.text}
                </Text>
              </View>
              {/* other stats */}
              <View
                className="flex-row justify-between mx-4 bottom-4"
                style={{ top: hp(11.5) }}
              >
                <View className="flex-row space-x-2 items-center">
                  <Image
                    source={require("../assets/icons/wind.png")}
                    className="w-6 h-6"
                  />
                  <Text className="text-white font-semibold text-base">
                    {current?.wind_kph}km
                  </Text>
                </View>
                <View className="flex-row space-x-2 items-center">
                  <Image
                    source={require("../assets/icons/drop.png")}
                    className="w-6 h-6"
                  />
                  <Text className="text-white font-semibold text-base">
                    {current?.humidity}%
                  </Text>
                </View>
                <View className="flex-row space-x-2 items-center">
                  <Image
                    source={require("../assets/icons/sun.png")}
                    className="w-6 h-6"
                  />
                  <Text className="text-white font-semibold text-base">
                    {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                  </Text>
                </View>
              </View>
              {/* forcast for next days */}
              <View className="mb-[28%]">
                <View
                  className="flex-row items-center mx-5 space-x-2"
                  style={{ top: hp(15) }}
                >
                  <CalendarDaysIcon size="22" color="white" />
                  <Text className="text-white text-base">Daily Forecast</Text>
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingHorizontal: 15,
                  }}
                  style={{ top: hp(17.5) }}
                >
                  {weather?.forecast?.forecastday?.map((item, index) => {
                    let date = new Date(item.date);
                    let options = (options = { weekday: "long" });
                    let dayName = date.toLocaleDateString("en-US", options);
                    dayName = dayName.split(",")[0];

                    return (
                      <View
                        key={index}
                        className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                        style={{ backgroundColor: theme.bgWhite(0.15) }}
                      >
                        <Image
                          source={weatherImages[item?.day?.condition?.text]}
                          className="w-11 h-11"
                        />
                        <Text className="text-white">{dayName}</Text>
                        <Text className="text-white text-xl font-semibold">
                          {item?.day?.avgtemp_c}&#176;
                        </Text>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
};

export default HomeScreen;
