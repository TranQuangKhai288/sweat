import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  Keyboard,
} from "react-native";
import { Search, X } from "lucide-react-native";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Tìm kiếm",
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput | null>(null);

  // Filter suggestions based on query

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const handleSubmit = () => {
    if (onSearch) {
      onSearch(query);
    }
    Keyboard.dismiss();
  };

  return (
    <View className="w-full">
      {/* Search Input */}
      <View
        className={`flex-row items-center px-4 rounded-full bg-gray-100 ${
          isFocused ? "border border-orange-500" : "border border-gray-100"
        }`}
      >
        {query.length === 0 && <Search size={20} color={"#000"} />}

        <TextInput
          ref={inputRef}
          className={`flex-1 ${
            query.length === 0 ? "ml-2" : ""
          } text-base text-gray-800`}
          placeholder={placeholder}
          value={query}
          onChangeText={setQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={handleSubmit}
        />

        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <X size={20} color="#71717A" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchBar;
