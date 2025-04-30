import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, Text, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { MaterialIcons } from "@expo/vector-icons";
import useDebounce from "../../hooks/useDebounce";

import SearchBar from "../../components/SearchBar";
import RecentSearchItem from "../../components/RecentSearchItem";
import SearchResult from "../../components/SearchResult"; // Uncomment if you have this component
// import { Image as ImageUtil } from 'react-native-image-crop-picker'; // Thêm thư viện này nếu chưa có

const friendsData = [
  {
    id: "1",
    name: "Tên User",
    mutualFriends: 10,
    avatar: "https://i.pravatar.cc/100?img=1",
    status: "Kết bạn",
  },
  {
    id: "2",
    name: "Tên User",
    mutualFriends: 10,
    avatar: "https://i.pravatar.cc/100?img=2",
    status: "Bạn bè",
  },
  {
    id: "3",
    name: "Tên User",
    mutualFriends: 10,
    avatar: "https://i.pravatar.cc/100?img=3",
    status: "Huỷ kết bạn",
  },
  {
    id: "4",
    name: "Tên User",
    mutualFriends: 0,
    avatar: "https://i.pravatar.cc/100?img=4",
    status: "Chấp nhận",
  },
  {
    id: "11",
    name: "Tên User",
    mutualFriends: 10,
    avatar: "https://i.pravatar.cc/100?img=1",
    status: "Kết bạn",
  },
  {
    id: "12",
    name: "Tên User",
    mutualFriends: 10,
    avatar: "https://i.pravatar.cc/100?img=2",
    status: "Bạn bè",
  },
  {
    id: "13",
    name: "Tên User",
    mutualFriends: 10,
    avatar: "https://i.pravatar.cc/100?img=3",
    status: "Huỷ kết bạn",
  },
  {
    id: "14",
    name: "Tên User",
    mutualFriends: 0,
    avatar: "https://i.pravatar.cc/100?img=4",
    status: "Chấp nhận",
  },
  {
    id: "21",
    name: "Tên User",
    mutualFriends: 10,
    avatar: "https://i.pravatar.cc/100?img=1",
    status: "Kết bạn",
  },
  {
    id: "22",
    name: "Tên User",
    mutualFriends: 10,
    avatar: "https://i.pravatar.cc/100?img=2",
    status: "Bạn bè",
  },
  {
    id: "23",
    name: "Tên User",
    mutualFriends: 10,
    avatar: "https://i.pravatar.cc/100?img=3",
    status: "Huỷ kết bạn",
  },
  {
    id: "24",
    name: "Tên User",
    mutualFriends: 0,
    avatar: "https://i.pravatar.cc/100?img=4",
    status: "Chấp nhận",
  },
  {
    id: "31",
    name: "Tên User",
    mutualFriends: 10,
    avatar: "https://i.pravatar.cc/100?img=1",
    status: "Kết bạn",
  },
  {
    id: "32",
    name: "Tên User3",
    mutualFriends: 10,
    avatar: "https://i.pravatar.cc/100?img=2",
    status: "Bạn bè",
  },
  {
    id: "33",
    name: "Tên User2",
    mutualFriends: 10,
    avatar: "https://i.pravatar.cc/100?img=3",
    status: "Huỷ kết bạn",
  },
  {
    id: "34",
    name: "Tên User1",
    mutualFriends: 0,
    avatar: "https://i.pravatar.cc/100?img=4",
    status: "Chấp nhận",
  },
];

const postsData = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1",
    content: "Pickleball đấu tuần với John",
    username: "Username",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-2",
    content: "Giải Pickleball lần thứ 21",
    username: "Username",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-3",
    content: "Mới học chơi Pickleball",
    username: "Username",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-4",
    content: "Mới sắm em vợt",
    username: "Username",
  },
  {
    id: "11",
    image: "https://images.unsplash.com/photo-1",
    content: "Pickleball đấu tuần với John",
    username: "Username",
  },
  {
    id: "12",
    image: "https://images.unsplash.com/photo-2",
    content: "Giải Pickleball lần thứ 21",
    username: "Username",
  },
  {
    id: "13",
    image: "https://images.unsplash.com/photo-3",
    content: "Mới học chơi Pickleball",
    username: "Username",
  },
  {
    id: "14",
    image: "https://images.unsplash.com/photo-4",
    content: "Mới sắm em vợt",
    username: "Username",
  },
];

const SearchScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]); // Placeholder for search results
  const [recentSearches, setRecentSearches] = useState<any[]>([
    {
      name: "Tên User",
      infoCount: 3,
      avatarUrl: "https://i.pravatar.cc/100?img=3",
    },
    {
      name: "Tên User",
      infoCount: 3,
      avatarUrl: "https://i.pravatar.cc/100?img=4",
    },
    {
      name: "Tên User",
      infoCount: 3,
      avatarUrl: "https://i.pravatar.cc/100?img=5",
    },
  ]); // Recent searches, you can modify this to fetch from a server
  const debouncedSearchText = useDebounce(searchText, 100); // Use debouncing with a 500ms delay
  // Privacy options with their corresponding icons

  const handleSearch = (query: string) => {
    setSearchText(query);
  };

  useEffect(() => {
    console.log("Debounced search text:", debouncedSearchText);
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
      <View className="flex-1 px-4">
        {searchText.trim() === "" ? (
          <Text className="text-[#424242] text-lg font-bold mb-1">Gần đây</Text>
        ) : (
          <View></View>
        )}

        {/* Show recent searches or search results */}
        {searchText.trim() === "" ? (
          <FlatList
            data={searchText.trim() === "" ? recentSearches : searchResults}
            // keyExtractor={(item) => item.name} // <-- Sửa ở đây
            renderItem={({ item }) => (
              <RecentSearchItem
                name={item.name}
                infoCount={item.infoCount}
                avatarUrl={item.avatarUrl}
                onRemove={() => console.log(`Remove ${item.name}`)}
              />
            )}
          />
        ) : (
          <SearchResult friendsData={friendsData} postsData={postsData} />
        )}
      </View>
    </View>
  );
};

export default SearchScreen;
