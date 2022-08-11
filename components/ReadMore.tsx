import React from "react";
import { LayoutChangeEvent, StyleSheet, View, ViewStyle } from "react-native";
import Text from "components/Text";
import useLayout from "hooks/useLayout";

interface ReadMoreProps {
  children: string;
  more?: string;
  less?: string;
  style?: ViewStyle;
  numberOfLines?: number;
  status?: string;
  category?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "b1"
    | "b2-p"
    | "b2-m"
    | "b2-s"
    | "b3"
    | "c1"
    | "c2"
    | "c3"
    | "c4"
    | "d1"
    | undefined;
}

const ReadMore = ({
  children,
  more = "Show More",
  less = "Show Less",
  style,
  status,
  numberOfLines = 3,
  category = "c4",
}: ReadMoreProps) => {
  const { width } = useLayout();
  const [fullTextSlice, setFullTextSlice] = React.useState(0);
  const [isShowFullText, setShowFullText] = React.useState(false);
  const [layout, setLayout] = React.useState(0);

  const onShowMore = () => {
    setShowFullText(!isShowFullText);
  };
  const onLayout = React.useCallback((event: LayoutChangeEvent) => {
    setLayout(event.nativeEvent.layout.width);
  }, []);
  React.useEffect(() => {
    if (isShowFullText) {
      setFullTextSlice(children.length);
    } else {
      setFullTextSlice(layout / (children.length / layout + numberOfLines / 2));
    }
  }, [isShowFullText, layout]);
  return (
    <View style={style}>
      <Text
        category={category}
        status={status}
        numberOfLines={isShowFullText ? undefined : numberOfLines}
        lineHeight={20}
        onLayout={onLayout}
      >
        {children.slice(0, fullTextSlice)}
        {isShowFullText ? " " : "... "}
        <Text
          style={styles.buttonShowMore}
          onPress={onShowMore}
          status="info"
          category="b3"
          lineHeight={20}
        >
          {isShowFullText ? less : more}
        </Text>
      </Text>
    </View>
  );
};

export default ReadMore;
const styles = StyleSheet.create({
  invisible: {
    position: "absolute",
    opacity: 0,
  },
  buttonShowMore: {
    marginTop: 16,
  },
});
