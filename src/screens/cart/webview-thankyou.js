import React, { Component } from 'react';

import { withTranslation } from 'react-i18next';
import { WebView } from 'react-native-webview';
import { StyleSheet, ActivityIndicator, View, Text, TouchableOpacity, Linking } from 'react-native';
import { ThemedView } from 'src/components';
import Button from 'src/containers/Button';
import Container from 'src/containers/Container';
import { homeTabs } from 'src/config/navigator';
import { connect } from 'react-redux';
import { clearCart } from 'src/modules/cart/actions';
import { margin } from 'src/components/config/spacing';
import { LocationSelector } from '../../modules/Locator/selector';

import RNPrint from 'react-native-print';


 

   



class WebviewThankYou extends Component {
  constructor(props, context) {
    super(props, context);
    const { route } = props;
    this.state = {
      loading: true,
      uri: route ?.params ?.uri ?? '',
      selectedPrinter: null,
    };
  }

  handleContinue = () => {
    const { navigation, dispatch } = this.props;
    console.log('Yess')
    dispatch(clearCart());
    navigation.pop();
    navigation.navigate(homeTabs.home_drawer);
  };

  handleResponse = data => {
    console.log('yes');
    // console.log(data);
  };

  selectPrinter = async () => {
    const selectedPrinter = await RNPrint.selectPrinter({ x: 100, y: 100 })
    this.setState({ selectedPrinter })
  }

  Print = async() =>{
  // await this.printPDF();      
  }


  selectPrinter = async () => {
    const selectedPrinter = await RNPrint.selectPrinter({ x: 100, y: 100 })
    this.setState({ selectedPrinter })
  }
    
  // @NOTE iOS Only
  silentPrint = async () => {
      const {Locator, passprnt_uri, htmly, navigation, dispatch } = this.props;

      fetch('https://mdbsapi.daviserve.com/tests/appOrderTickets.php?user_id='+Locator.NotiUserId)
      .then((resp)=>{ 
        return resp.text() 
      })
      .then((text)=>{ 
   // alert(text)
       Linking.openURL("starpassprnt://v1/print/nopreview?back="+'commissarydeli://'+"&html="+encodeURIComponent(text))

          setTimeout(() => {
           {
            dispatch(clearCart());
            navigation.pop();
            navigation.navigate(homeTabs.home_drawer);
          }
    }, 6000)

      })
    
  }

  customOptions = () => {
    return (
      <View>
        {this.state.selectedPrinter &&
          <View>
            <Text>{`Selected Printer Name: ${this.state.selectedPrinter.name}`}</Text>
            <Text>{`Selected Printer URI: ${this.state.selectedPrinter.url}`}</Text>
          </View>
        }
      {/* <Button onPress={this.selectPrinter} title="Select Printer" />
      <Button onPress={this.silentPrint} title="Silent Print" /> */}
    </View>

    )
  }

  render() {
    const { loading, uri } = this.state;
    const { t } = this.props;

     setTimeout(() => {
           {
            const { navigation, dispatch } = this.props;
            dispatch(clearCart());
            navigation.pop();
            navigation.navigate(homeTabs.home_drawer);
          }
    }, 90000)

    return (
      <ThemedView isFullView>
        <WebView
          source={{ uri }}
          onNavigationStateChange={data => this.handleResponse(data)}
          style={styles.webView}
          onLoadStart={() => this.setState({ loading: false })}
        />
        {loading && (
          <View style={styles.viewLoading}>
            <ActivityIndicator size="large" />
          </View>
        )}
        {Platform.OS === 'ios' && this.customOptions()}
        <Container style={[styles.footer, { flexDirection: 'row' }]}>
          {/* <Button
            title={t('cart:text_shopping')}
            onPress={this.handleContinue}
          /> */}

          <TouchableOpacity
            onPress={this.handleContinue}
            style={{ height: 50, justifyContent: 'center', alignItems: 'center', flex: 1, margin: 10, backgroundColor: '#233674', borderRadius: 5 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{t('cart:text_shopping')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
          onPress={Platform.OS === 'ios' ? this.silentPrint : () => this.Print()}
          style={{ height: 50, justifyContent: 'center', alignItems: 'center', flex: 1, margin: 10, backgroundColor: '#233674', borderRadius: 5 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Print</Text>
          </TouchableOpacity>

        </Container>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  webView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  viewLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  footer: {
    marginVertical: margin.big,
  },
});


const mapStateToProps = (state) => ({
  Locator: LocationSelector(state),
});

WebviewThankYou.propTypes = {};

export default connect(mapStateToProps)(withTranslation()(WebviewThankYou));
