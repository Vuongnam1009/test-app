import React, { memo } from "react";
import { StyleService, useStyleSheet, Layout } from "@ui-kitten/components";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";

interface ItemProps {
  name: string;
  value: number | string;
}

interface Props {
  type: string;
  breed: string;
  gender: "male" | "female" | string;
  sterilization: string;
  weight: number;
  birthday: string;
}
interface DataProps {
  data: Props;
  isUser?: boolean;
}

const PetInformation = memo(({ data, isUser }: DataProps) => {
  const styles = useStyleSheet(themedStyles);

  const Item = React.useCallback((item: ItemProps) => {
    return (
      <Layout style={styles.item}>
        <Text>{item.name}</Text>
        <Text capitalize>{item.value}</Text>
      </Layout>
    );
  }, []);
  return (
    <Layout style={[styles.container, { marginTop: isUser ? 0 : 48 }]}>
      <Text category="h4" marginBottom={24}>
        PetInformation
      </Text>
      <Item name="Type" value={data.type} />
      <Item name="Breed" value={data.breed} />
      <Item name="Gender" value={data.gender} />
      <Item name="Sterilization" value={data.sterilization} />
      <Item name="Weight" value={`${data.weight}lbs`} />
      <Item name="Birthday" value={data.birthday} />
    </Layout>
  );
});

export default PetInformation;

const themedStyles = StyleService.create({
  container: {
    marginLeft: 24,
  },
  item: {
    ...globalStyle.flexSpaceBetween,
    borderBottomWidth: 1,
    borderBottomColor: "background-basic-color-2",
    marginBottom: 24,
    paddingBottom: 24,
    paddingRight: 16,
  },
});
