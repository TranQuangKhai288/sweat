import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
// import { Image as ImageUtil } from 'react-native-image-crop-picker'; // Thêm thư viện này nếu chưa có

const CreateNewPost: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [caption, setCaption] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageRatios, setImageRatios] = useState<Record<string, number>>({});
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Công khai");
  const [optionPosition, setOptionPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>(
    {}
  );
  const privacyButtonRef = useRef<View>(null);
  const screenWidth = Dimensions.get("window").width - 32; // Trừ đi padding 16px ở mỗi bên

  const { state } = useAuth();
  const { user } = state;

  // Privacy options with their corresponding icons
  const privacyOptions: {
    id: string;
    label: string;
    icon: "public" | "group" | "lock";
  }[] = [
    { id: "public", label: "Công khai", icon: "public" },
    { id: "friends", label: "Bạn bè", icon: "group" },
    { id: "private", label: "Chỉ mình tôi", icon: "lock" },
  ];

  // Hàm lấy kích thước hình ảnh và tính tỷ lệ
  const getImageDimensions = (uri: string) => {
    setLoadingImages((prev) => ({ ...prev, [uri]: true }));

    Image.getSize(
      uri,
      (width, height) => {
        const aspectRatio = height / width;
        setImageRatios((prev) => ({ ...prev, [uri]: aspectRatio }));
        setLoadingImages((prev) => ({ ...prev, [uri]: false }));
      },
      (error) => {
        console.error("Không thể lấy kích thước hình ảnh:", error);
        setLoadingImages((prev) => ({ ...prev, [uri]: false }));
        // Đặt tỷ lệ mặc định nếu không thể lấy kích thước
        setImageRatios((prev) => ({ ...prev, [uri]: 3 / 4 }));
      }
    );
  };

  // Cập nhật kích thước mỗi khi có hình ảnh mới
  useEffect(() => {
    imageUrls.forEach((uri) => {
      if (!imageRatios[uri]) {
        getImageDimensions(uri);
      }
    });
  }, [imageUrls]);

  const handlePost = () => {
    if (!caption.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập nội dung bài viết!");
      return;
    }
    // Ở đây bạn có thể gọi API để đăng bài
    Alert.alert("Thành công", "Bài viết đã được đăng!");
    setCaption("");
    setImageUrls([]);
    setImageRatios({});
    navigation.goBack();
  };

  const handleSelectImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newImageUrls = result.assets.map((image: any) => image.uri);
      setImageUrls((prevUrls) => [...prevUrls, ...newImageUrls]);
    }
  };

  const requestPermission = async () => {
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaLibraryStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (cameraStatus !== "granted" || mediaLibraryStatus !== "granted") {
      Alert.alert("Lỗi", "Bạn cần cấp quyền truy cập camera và album ảnh.");
      return false;
    }
    return true;
  };

  const toggleOptions = () => {
    if (!showOptions && privacyButtonRef.current) {
      privacyButtonRef.current.measure((x, y, width, height, pageX, pageY) => {
        setOptionPosition({
          top: pageY + height,
          left: pageX,
          width: width,
        });
        setShowOptions(true);
      });
    } else {
      setShowOptions(false);
    }
  };

  const selectOption = (option: { id?: string; label: any; icon?: string }) => {
    setSelectedOption(option.label);
    setShowOptions(false);
  };

  const handleTakePhoto = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newImageUrls = result.assets.map(
        (image: ImagePicker.ImagePickerAsset) => image.uri
      );
      setImageUrls((prevUrls) => [...prevUrls, ...newImageUrls]);
    }
  };

  return (
    <View className="flex-1 bg-white pt-10">
      {/* Header */}
      <View
        className="flex-row justify-between items-center py-2 border-b"
        style={{ borderBottomColor: "#E0E0E0", borderBottomWidth: 1 }}
      >
        <View className="flex-row justify-between items-center p-2 px-4 bg-white w-full max-h-17 min-h-12 z-10">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="pl-2"
          >
            <MaterialIcons name="arrow-back-ios" size={18} color="black" />
          </TouchableOpacity>

          <Text className="text-xl font-bold text-[#424242] ml-16">
            TẠO BÀI VIẾT
          </Text>

          <TouchableOpacity onPress={handlePost}>
            <LinearGradient
              colors={["#F96D40", "#FF965D"]}
              className="py-2 px-6"
              style={{ borderRadius: 50 }}
            >
              <Text className="text-white text-center font-semibold">Đăng</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <View className="px-4 py-3">
          <View className="flex-row items-center mb-3">
            <Image
              source={{ uri: user?.avatar }}
              className="w-14 h-14 mr-2 rounded-full bg-slate-500"
            />
            <View className="flex-col w-full items-start justify-center ml-2">
              <Text className="text-black font-semibold text-lg mb-2 ">
                {user?.name || "Người dùng"}
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-row"
              >
                <View className="flex-row items-center">
                  <TouchableOpacity
                    ref={privacyButtonRef}
                    className="flex-row items-center mr-2 bg-[#F4F7FF]"
                    style={{ borderRadius: 6, padding: 8 }}
                    onPress={toggleOptions}
                  >
                    <MaterialIcons
                      name={
                        privacyOptions.find(
                          (option) => option.label === selectedOption
                        )?.icon || "public"
                      }
                      size={20}
                      color="#295BDB"
                    />
                    <Text className="text-[#295BDB] text-base font-semibold ml-2">
                      {selectedOption}
                    </Text>
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={20}
                      color="#295BDB"
                      style={{ marginLeft: 5 }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex-row items-center mr-2 bg-[#F4F7FF] "
                    style={{ borderRadius: 6, padding: 8 }}
                    onPress={handleTakePhoto}
                  >
                    <FontAwesome name="camera" size={16} color="#295BDB" />
                    <Text className="text-[#295BDB] text-base font-semibold ml-2">
                      Chụp ảnh
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex-row items-center mr-2 bg-[#F4F7FF] "
                    style={{ borderRadius: 6, padding: 8 }}
                    onPress={handleSelectImage}
                  >
                    <FontAwesome name="image" size={16} color="#295BDB" />
                    <Text className="text-[#295BDB] text-base font-semibold ml-2">
                      Ảnh
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>

              {/* Privacy options popup */}
              {showOptions && (
                <View
                  className="absolute bg-white rounded-lg shadow-lg z-50"
                  style={{
                    top: 70,
                    left: 0,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    width: 170,
                  }}
                >
                  {privacyOptions.map((option) => (
                    <TouchableOpacity
                      key={option.id}
                      className="flex-row items-center p-3 border-b"
                      style={{ borderBottomColor: "#E0E0E0" }}
                      onPress={() => selectOption(option)}
                    >
                      <MaterialIcons
                        name={option.icon}
                        size={16}
                        color="#295BDB"
                      />
                      <Text className="text-gray-800 font-medium ml-3">
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
          <TextInput
            className="rounded-lg text-sm text-black min-h-[50px] my-2"
            style={{ fontSize: 18 }}
            placeholder="Bạn có điều gì muốn chia sẻ?"
            multiline
            value={caption}
            onChangeText={setCaption}
            textAlignVertical="top"
          />
        </View>

        {/* Image Preview */}
        <View className="px-4 py-3">
          {imageUrls.length > 0 && (
            <View>
              {imageUrls.map((url, index) => (
                <View
                  key={index}
                  className="relative mb-4"
                  style={{
                    width: screenWidth,
                    height: imageRatios[url]
                      ? screenWidth * imageRatios[url]
                      : undefined,
                  }}
                >
                  {loadingImages[url] ? (
                    <View className="flex-1 justify-center items-center bg-gray-100 rounded-lg">
                      <ActivityIndicator size="large" color="#295BDB" />
                    </View>
                  ) : (
                    <Image
                      source={{ uri: url }}
                      className="rounded-lg"
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      const newImageUrls = imageUrls.filter(
                        (_, i) => i !== index
                      );
                      setImageUrls(newImageUrls);

                      // Xóa tỷ lệ của ảnh đã xóa
                      const newImageRatios = { ...imageRatios };
                      delete newImageRatios[url];
                      setImageRatios(newImageRatios);
                    }}
                    className="absolute top-2 right-2 bg-gray-800 p-1 rounded-full"
                  >
                    <Feather name="x" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateNewPost;
