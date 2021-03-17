  // appState.timer;
import { useNavigation } from "@react-navigation/native";
import { mainStack, homeTabs } from "src/config/navigator";
import { Notifier, Easing, NotifierComponents } from "react-native-notifier";
import { clearCart } from 'src/modules/cart/actions';

  export const idletimer = (props) => {

  resetTimer = () => {
    clearInterval(this.timer);
    currSeconds = 0;
    this.timer = setInterval(startIdleTimer, 5000);
  };
  startIdleTimer = () => {
    currSeconds++;
    console.log(currSeconds);

    if (currSeconds == 3) {

      Notifier.showNotification({
        title: "Need more time, still undecided?",
        description: "[ TAP TO CONTINUE ]",
        duration: 0,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
        onHidden: () => console.log("reset timer"),
        onPress: () => resetTimer(),
        hideOnPress: true,
        Component: NotifierComponents.Alert,
         componentProps: {
            alertType: 'warn',
          },
      });
    }

    if (currSeconds > 4) {
      {
        Notifier.hideNotification();
        this.props.dispatch(clearCart());
        this.props.navigation.navigate(homeTabs.home_drawer);
        resetTimer();
      }
    }
  };


  }

  resetTimer();