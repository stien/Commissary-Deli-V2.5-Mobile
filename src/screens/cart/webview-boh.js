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

class WebviewBoh extends Component {
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
    navigation.navigate(homeTabs.me);
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
      const {Locator, passprnt_uri, htmly} = this.props;

      fetch('https://mdbsapi.daviserve.com/tests/appOrderTickets.php?user_id='+Locator.NotiUserId)
      .then((resp)=>{ 
        return resp.text() 
      })
      .then((text)=>{ 
   
       Linking.openURL("starpassprnt://v1/print/nopreview?back="+'commissarydeli://'+"&html="+encodeURIComponent(text))

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
{/* alert({uri})
     setTimeout(() => {
           {
            const { navigation, dispatch } = this.props;
            dispatch(clearCart());
            navigation.pop();
            navigation.navigate(homeTabs.home_drawer);
          }
    }, 10000)
*/}
    return (
      <ThemedView isFullView>
        <WebView
          source={{ url: 'https://mdbsapi.daviserve.com/BOH/'}}
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
          <Button
            title={'< RETURN TO ADMIN'}
            onPress={this.handleContinue}
          /> 
{/* 
          <TouchableOpacity
            onPress={this.handleContinue}
            style={{ height: 50, justifyContent: 'center', alignItems: 'center', flex: 1, margin: 10, backgroundColor: '#233674', borderRadius: 5 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{t('cart:text_shopping')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
          onPress={Platform.OS === 'ios' ? this.silentPrint : () => this.Print(), this.handleContinue}
          style={{ height: 50, justifyContent: 'center', alignItems: 'center', flex: 1, margin: 10, backgroundColor: '#233674', borderRadius: 5 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Print</Text>
          </TouchableOpacity>*/}  

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
    margin: margin.small,
    padding: 0,
    height: 45,
  },
});


const mapStateToProps = (state) => ({
  Locator: LocationSelector(state),
});

WebviewBoh.propTypes = {};

export default connect(mapStateToProps)(withTranslation()(WebviewBoh));
