import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, Text, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { MaterialIcons } from "@expo/vector-icons";
import useDebounce from "../../hooks/useDebounce";

import SearchBar from "../../components/SearchBar";
// import { Image as ImageUtil } from 'react-native-image-crop-picker'; // Thêm thư viện này nếu chưa có

const SearchScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]); // Placeholder for search results
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Pickleball",
    "Basketball",
    "Football",
  ]); // Recent searches, you can modify this to fetch from a server
  const debouncedSearchText = useDebounce(searchText, 500); // Use debouncing with a 500ms delay
  // Privacy options with their corresponding icons

  const handleSearch = (query: string) => {
    setSearchText(query);
  };

  useEffect(() => {
    if (debouncedSearchText.trim() === "") {
      setSearchResults([]); // Clear search results when the search is empty
    } else {
      performSearch(debouncedSearchText);
    }
  }, [debouncedSearchText]);

  const performSearch = (query: string) => {
    console.log("Searching for:", query);
    // Simulate an API search request
    setSearchResults([query, `${query} 2`, `${query} 3`]); // Example results
  };

  return (
    <View className="flex-1 bg-white pt-10">
      {/* Header */}
      <View
        className="flex-row justify-between items-center p-2 px-4 py-3  bg-white w-full z-10"
        // style={{ borderBottomColor: "#E0E0E0", borderBottomWidth: 1 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} className="pl-2">
          <MaterialIcons name="arrow-back-ios" size={18} color="black" />
        </TouchableOpacity>
        <View className="flex-1 ml-2">
          <SearchBar placeholder="Tìm kiếm" onSearch={handleSearch} />
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-4 py-3">
        {searchText.trim() === "" ? (
          <Text className="text-gray-600">Kết quả gần đây</Text>
        ) : (
          <Text className="text-gray-600">
            Kết quả tìm kiếm cho "{searchText}"
          </Text>
        )}

        {/* Show recent searches or search results */}
        <FlatList
          data={searchText.trim() === "" ? recentSearches : searchResults}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View className="flex-row items-center p-2 border-b border-gray-200">
              <Text className="text-base">{item}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default SearchScreen;
