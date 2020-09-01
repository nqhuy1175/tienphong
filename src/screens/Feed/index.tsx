import {SearchBar} from '@components/Elements/SearchBar';
import React, {Component} from 'react';
import {ListRenderItem, StyleSheet, View, VirtualizedList} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

class Feed extends Component<any, any> {
  render() {
    return (
      <SafeAreaProvider>
        <SearchBar searchText={''} backIcon={false} autoFocus={false} />
        <VirtualizedList
          style={styles.list}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={'interactive'}
          keyboardShouldPersistTaps={'always'}
          data={Array(5)}
          getItem={this.getVirtualizedItem}
          getItemCount={this.getVirtualizedItemCount}
          keyExtractor={this.virtualizedKeyExtractor}
          renderItem={this.renderVirtualizedItem}
        />
      </SafeAreaProvider>
    );
  }

  getVirtualizedItem = (data: any, index: number) => {
    switch (index) {
      case 0: {
        return (
          <View
            style={{
              height: 300,
              backgroundColor: `rgba(${Math.random()}, 255,${Math.random()}, 1)`
            }}
          />
        );
      }
      case 1: {
        return (
          <View
            style={{
              height: 100,
              backgroundColor: `rgba(${Math.random()}, ${Math.random()},${Math.random()}, 1)`
            }}
          />
        );
      }
      case 2: {
        return (
          <View
            style={{
              height: 500,
              backgroundColor: `rgba(255, ${Math.random()},${Math.random()}, 1)`
            }}
          />
        );
      }
      case 3: {
        return (
          <View
            style={{
              height: 300,
              backgroundColor: `rgba(${Math.random()}, ${Math.random()},255, 1)`
            }}
          />
        );
      }
      case 4: {
        return (
          <View
            style={{
              height: 100,
              backgroundColor: `rgba(${Math.random()}, 125,${Math.random()}, 1)`
            }}
          />
        );
      }
      case 5: {
        return (
          <View
            style={{
              height: 500,
              backgroundColor: `rgba(109, ${Math.random()},${Math.random()}, 1)`
            }}
          />
        );
      }
      default:
        break;
    }
  };

  getVirtualizedItemCount = () => 5;

  renderVirtualizedItem: ListRenderItem<any> = ({item}) => item;

  virtualizedKeyExtractor = (item: any, index: number) => index.toString();
}

export default Feed;

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
  searchBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  }
});
