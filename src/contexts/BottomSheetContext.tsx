import React, {
  createContext,
  useState,
  useContext,
  useRef,
  ReactNode,
  useMemo,
} from "react";
import { View } from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

interface BottomSheetContextProps {
  openBottomSheet: (
    content: ReactNode,
    snapPoints?: (string | number)[]
  ) => void;
  closeBottomSheet: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextProps>({
  openBottomSheet: () => {},
  closeBottomSheet: () => {},
});

export const useBottomSheet = () => useContext(BottomSheetContext);

export const BottomSheetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [content, setContent] = useState<ReactNode>(null);
  //   const [isOpen, setIsOpen] = useState(false);
  const [snapPoints, setSnapPoints] = useState<(string | number)[]>(["50%"]);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const openBottomSheet = (
    newContent: ReactNode,
    newSnapPoints: (string | number)[] = ["60%"]
  ) => {
    setContent(newContent);
    setSnapPoints(newSnapPoints);
    // setIsOpen(true);
    bottomSheetRef.current?.expand();
  };

  const closeBottomSheet = () => {
    // setIsOpen(false);
    bottomSheetRef.current?.close();
  };

  const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

  return (
    <BottomSheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
      <View style={{ flex: 1 }}>
        {children}

        {/* Đây là BottomSheet thông thường */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1} // start đóng
          snapPoints={memoizedSnapPoints}
          enablePanDownToClose
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
            />
          )}
          onClose={() => {
            setContent(null);
            // setIsOpen(false);
          }}
        >
          <BottomSheetView style={{ flex: 1, padding: 20 }}>
            {content}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </BottomSheetContext.Provider>
  );
};
