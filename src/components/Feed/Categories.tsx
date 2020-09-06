import {GlobalState} from '@redux/types';
import {Colors} from '@styles/colors';
import {common} from '@styles/common.styles';
import {isNullOrEmpty} from '@utils/Lang';
import {get} from 'lodash';
import React, {PureComponent} from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect, ConnectedProps} from 'react-redux';

const {width} = Dimensions.get('window');
const mapStateToProps = (state: GlobalState) => state.categories;
const connector = connect(mapStateToProps, null, null, {forwardRef: true});

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class Categories extends PureComponent<Props> {
  renderItem: ListRenderItem<Category> = ({item}) => {
    const image = get(item, 'image', '');
    const name = get(item, 'name', '');
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.item}>
        <FastImage
          style={styles.image}
          source={{uri: image}}
          resizeMode={'contain'}
        />
        <Text numberOfLines={2} style={styles.text}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  };

  renderSeparator = () => <View style={styles.separator} />;

  keyExtractor = (item: Category, index: number) => item.id + '-' + index;

  render() {
    const {data} = this.props;
    if (isNullOrEmpty(data)) {
      return null;
    }
    return (
      <View style={styles.flatList}>
        <Text style={styles.headerText}>Danh mục sản phẩm</Text>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={this.keyExtractor}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          numColumns={5}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flatList: {
    width,
    marginBottom: 8,
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: 'white'
  },
  separator: {
    height: 16
  },
  item: {
    width: (width - 16) / 5,
    alignItems: 'center'
  },
  image: {
    width: (width - 96) / 5,
    height: (width - 96) / 5,
    backgroundColor: 'white',
    marginBottom: 8,
    borderRadius: 24
  },
  text: {
    ...common.textSmall,
    textAlign: 'center',
    maxWidth: '90%'
  },
  headerText: {
    width,
    ...common.label,
    paddingBottom: 16,
    paddingHorizontal: 6
  },
  empty: {
    height: 16,
    backgroundColor: Colors.gray
  }
});
const ComposedCategories = connector(Categories);
export {Categories, ComposedCategories};
