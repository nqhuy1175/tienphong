import {Colors} from '@styles/colors';
import {label, subText, textBold} from '@styles/common.styles';
import {chunk} from 'lodash';
import React, {PureComponent} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Bolt from 'assets/icons/bolt.svg';

const data = [
  '0345.12.1221',
  '0345.121.221',
  '0345.12.1221',
  '0345.12.12.21',
  '0345.12.1221',
  '0345.12.1221',
  '0345.12.1221',
  '0345.12.1221',
  '0345.12.1221',
  '0345.12.1221',
  '0345.12.1221',
  '0345.12.1221',
  '0345.12.1221',
  '0345.12.1221',
  '0345.12.1221',
  '0345.12.1221',
  '0345.12.1221',
  '0345.12.1221',
  '0345.12.12.21'
];

class FlashSale extends PureComponent {
  render() {
    const list = chunk(data, 3);
    console.log(list);
    return (
      <View style={styles.wrapper}>
        <Text style={styles.header}>flash sale</Text>
        <FlatList
          data={list}
          renderItem={this.renderItem}
          keyExtractor={this.getItemKey}
          horizontal={true}
          contentContainerStyle={styles.list}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  renderItem = ({item, index}: any) => {
    return (
      <View style={styles.block} key={index.toString()}>
        <TouchableOpacity style={styles.sim}>
          <Text style={styles.phoneNumber}>
            <Bolt width={12} height={12} /> {item[0]}
          </Text>
          <View style={styles.row}>
            <Text style={styles.pricePromotion}>2.000.000đ</Text>
            <View style={styles.discount}>
              <Text style={styles.discountPercent}>-25%</Text>
            </View>
          </View>
          <Text style={styles.price}>1.500.000đ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sim}>
          <Text style={styles.phoneNumber}>
            <Bolt width={12} height={12} /> {item[0]}
          </Text>
          <View style={styles.row}>
            <Text style={styles.pricePromotion}>2.000.000đ</Text>
            <View style={styles.discount}>
              <Text style={styles.discountPercent}>-25%</Text>
            </View>
          </View>
          <Text style={styles.price}>1.500.000đ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sim}>
          <Text style={styles.phoneNumber}>
            <Bolt width={12} height={12} /> {item[0]}
          </Text>
          <View style={styles.row}>
            <Text style={styles.pricePromotion}>2.000.000đ</Text>
            <View style={styles.discount}>
              <Text style={styles.discountPercent}>-25%</Text>
            </View>
          </View>
          <Text style={styles.price}>1.500.000đ</Text>
        </TouchableOpacity>
      </View>
    );
  };

  getItemKey = (item: string[], index: number) => index.toString();
}

export {FlashSale};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff'
  },
  header: {
    ...label,
    paddingTop: 16,
    paddingHorizontal: 16
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8
  },
  block: {
    marginRight: 8
  },
  sim: {
    width: 144,
    height: 88,
    padding: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 6,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 2
  },
  phoneNumber: {
    ...label
  },
  row: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  price: {
    marginTop: 4,
    ...textBold,
    color: Colors.salmon
  },
  discount: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.salmon,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 20,
    marginLeft: 4
  },
  discountPercent: {
    ...subText,
    textDecorationLine: 'none',
    color: '#fff'
  },
  pricePromotion: {
    ...subText,
    textDecorationLine: 'line-through',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
