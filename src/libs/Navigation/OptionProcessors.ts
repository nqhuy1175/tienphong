import {
  Navigation,
  NavigationButtonPressedEvent,
  OptionsTopBar
} from 'react-native-navigation/lib/dist';

export default function addOptionsProcessors() {
  addDismissModalProcessor();
}

const addDismissModalProcessor = () => {
  Navigation.addOptionProcessor<OptionsTopBar>(
    'topBar',
    (topBar: OptionsTopBar, commandName: string): OptionsTopBar => {
      if (commandName === 'showModal') {
        // TODO: add modal open process
      }
      return topBar;
    }
  );

  Navigation.events().registerNavigationButtonPressedListener(
    (event: NavigationButtonPressedEvent) => {
      if (event.buttonId === '_GOBACK') {
        Navigation.pop(event.componentId);
      }
    }
  );
};
