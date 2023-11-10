import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon, CalendarDaysIcon } from "react-native-heroicons/solid";

const HomeScreen = () => {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);
  const handleLocation = (loc) => {
    console.log(loc);
  };

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        blurRadius={80}
        source={require("../assets/images/bg.png")}
        className="w-full h-full absolute"
      />
      <SafeAreaView className="flex flex-1 top-8">
        {/* Search Section */}
        <View className="mx-4 relative z-50" style={{ height: "7%" }}>
          <View
            className="flex-row justify-end items-center rounded-full"
            style={{
              backgroundColor: showSearch ? theme.bgWhite(0.2) : "transparent",
            }}
          >
            {showSearch ? (
              <TextInput
                placeholder="Search City"
                placeholderTextColor={"lightgray"}
                className="pl-6 h-14 flex-1 text-base text-white"
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
                      Monrovia, Liberia
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>

        {/* forcast section */}
        <View className="mx-4 flex justify-around flex-1 mb-2">
          {/* location */}
          <Text className="text-white text-3xl text-center font-bold">
            Monrovia,
            <Text className="text-lg text-gray-300 font-simibold">
              {"  "}
              Liberia
            </Text>
          </Text>
          {/* weather image */}
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/images/partlycloudy.png")}
              className="w-52 h-52"
            />
          </View>
          {/* Daily stats */}
          <View className="space-y-2">
            <Text className="text-center font-bold text-white text-6xl ml-5">
              23&#176;
            </Text>
            <Text className="text-center font-bold tracking-widest bottom-3 text-white text-lg">
              Partly Cloudy
            </Text>
          </View>
          {/* other stats */}
          <View className="flex-row justify-between mx-4 bottom-4">
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icons/wind.png")}
                className="w-6 h-6"
              />
              <Text className="text-white font-semibold text-base">22km</Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icons/drop.png")}
                className="w-6 h-6"
              />
              <Text className="text-white font-semibold text-base">23%</Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icons/sun.png")}
                className="w-6 h-6"
              />
              <Text className="text-white font-semibold text-base">
                5:45 AM
              </Text>
            </View>
          </View>
          {/* forcast for next days */}
          <View className="mb-2 space-y-3">
            <View className="flex-row items-center mx-5 space-x-2 bottom-3">
              <CalendarDaysIcon size="22" color="white" />
              <Text className="text-white text-base">Daily Forecast</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 15,
              }}
              className="bottom-3"
            >
              <View
                className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image
                  source={require("../assets/images/heavyrain.png")}
                  className="w-11 h-11"
                />
                <Text className="text-white">Monday</Text>
                <Text className="text-white text-xl font-semibold">
                  13&#176;
                </Text>
              </View>
              <View
                className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image
                  source={require("../assets/images/heavyrain.png")}
                  className="w-11 h-11"
                />
                <Text className="text-white">Monday</Text>
                <Text className="text-white text-xl font-semibold">
                  13&#176;
                </Text>
              </View>
              <View
                className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image
                  source={require("../assets/images/heavyrain.png")}
                  className="w-11 h-11"
                />
                <Text className="text-white">Monday</Text>
                <Text className="text-white text-xl font-semibold">
                  13&#176;
                </Text>
              </View>
              <View
                className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image
                  source={require("../assets/images/heavyrain.png")}
                  className="w-11 h-11"
                />
                <Text className="text-white">Monday</Text>
                <Text className="text-white text-xl font-semibold">
                  13&#176;
                </Text>
              </View>
              <View
                className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image
                  source={require("../assets/images/heavyrain.png")}
                  className="w-11 h-11"
                />
                <Text className="text-white">Monday</Text>
                <Text className="text-white text-xl font-semibold">
                  13&#176;
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
