import {SearchBar} from '@components/Elements/SearchBar';
import {Banners} from '@components/Feed/Banners';
import {ComposedCategories} from '@components/Feed/Categories';
import {FlashSale} from '@components/Feed/FlashSale';
import {HomePolicy} from '@components/Feed/Policy';
import {TextLink} from '@components/Feed/TextLink';
import {loadCategoriesAction} from '@redux/Feed/categories.actions';
import React, {PureComponent} from 'react';
import {ListRenderItem, StyleSheet, VirtualizedList} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {connect, ConnectedProps} from 'react-redux';

const mapDispatchToProps = {
  loadCategories: loadCategoriesAction.request
};
const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class Feed extends PureComponent<Props> {
  componentDidMount() {
    // this.props.loadCate();
    this.props.loadCategories();
  }

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
          data={[]}
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
        return <TextLink key={'text-link'} />;
      }
      case 1: {
        return (
          <Banners bannerLocation={1} bannerRatio={0.5} key={'banner-top'} />
        );
      }
      case 2: {
        return <HomePolicy key={'policy'} />;
      }
      case 3: {
        return <ComposedCategories key={'categories'} />;
      }
      case 4: {
        return <FlashSale key={'flash-sale'} />;
      }
      case 5: {
        return (
          <Banners bannerLocation={1} bannerRatio={0.25} key={'banner-2'} />
        );
      }
      default:
        break;
    }
  };

  getVirtualizedItemCount = () => 9;

  renderVirtualizedItem: ListRenderItem<any> = ({item}) => item;

  virtualizedKeyExtractor = (item: any, index: number) => index.toString();
}

export default connector(Feed);

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  searchBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  }
});
