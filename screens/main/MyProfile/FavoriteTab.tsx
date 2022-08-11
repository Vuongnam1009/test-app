import React, { memo } from "react";
import FavoriteItem from "./Component/FavoriteItem";
import { PetResultItem } from "../NewsFeed/NewsFeedSearch/AboutResults";
import LoadingIndicator from "components/LoadingIndicator";
import { FlatList } from "react-native";
import keyExtractor from "utils/keyExtractor";

interface Props {
  data: PetResultItem[];
  disable?: boolean;
}

const FavoriteTab = memo(({ data, disable }: Props) => {
  const scrollRef = React.useRef(null);
  const renderItem = React.useCallback(({ item }) => {
    return <FavoriteItem item={item} simultaneousHandlers={scrollRef} />;
  }, []);
  return (
    <FlatList
      ref={scrollRef}
      ListEmptyComponent={<LoadingIndicator size={"giant"} flexOne />}
      data={data}
      renderItem={renderItem}
      onEndReached={() => {}}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={keyExtractor}
    />
  );
});

export default FavoriteTab;
