import React from 'react';
import { View, Text } from 'react-native';
import { shape, string, number, bool, func } from 'prop-types';

import Card from '../card/';
import Subscribe from '../subscribe/';
import Columns from '../columns/';
import DateFormat from '../dateformat/';

const CollectionItem = ({ collection, dispatch_toggleSubscribeCollections }) => {
  return (
    <Card>
      <Columns>
        <View style={{ flex: 3 }}>
          <Text style={{ fontSize: 18 }}>
            {collection.name}
          </Text>
          <DateFormat date={collection.updated_at} />
        </View>
        <Subscribe
          is_subscribed={collection.is_subscribed}
          onPress={
            () => {
              dispatch_toggleSubscribeCollections(collection.id);
            }
          }
        />
      </Columns>
    </Card>
  );
};

CollectionItem.propTypes = {
  collection: shape({
    name: string.isRequired,
    updated_at: string.isRequired,
    is_subscribed: bool.isRequired,
    id: number.isRequired,
  }).isRequired,
  dispatch_toggleSubscribeCollections: func.isRequired,
};

export default CollectionItem;
