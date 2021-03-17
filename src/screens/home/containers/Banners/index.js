import React,{Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import {StyleSheet, Dimensions} from 'react-native';
import Container from 'src/containers/Container';
import Heading from 'src/containers/Heading';
import Gird from './Gird';
import Scroll from './Scroll';
import Empty from './Empty';

import {languageSelector} from 'src/modules/common/selectors';

import {padding} from 'src/components/config/spacing';

import {colBanner, typeViewBanner} from './config';
import {mainStack} from '../../../../../src/config/navigator';
import action from 'src/utils/action';
import { LocationSelector } from '../../../../modules/Locator/selector';

const {width} = Dimensions.get('window');

const initHeader = {
  style: {},
};

class Banners extends Component {

    OnPress = (data) => {

      // console.log('Data',data)
      // if(data.id == '999'){
      //   this.props.navigation.navigate(mainStack.DeliMeat)
      // }
    const {Locator} = this.props;
    if(Locator.selectedLocation.name == ''){
      alert('Please Select Location')
    }
    else{
      action(data)
      // console.log('this.props.fields:::', this.props.fields)
    }

  }

  render() {
    const {layout, fields, widthComponent, language, t} = this.props;

    if (
      !fields ||
      typeof fields !== 'object' ||
      Object.keys(fields).length < 1
    ) {
      return null;
    }
    const heading = fields.text_heading ? fields.text_heading : initHeader;
    const valueBox = fields.boxed;

    const widthValue =
      fields.width && parseInt(fields.width, 10)
        ? parseInt(fields.width, 10)
        : 370;
    const heightValue =
      fields.height && parseInt(fields.height, 10)
        ? parseInt(fields.height, 10)
        : 395;
    const radius =
      fields.radius && parseInt(fields.radius, 10)
        ? parseInt(fields.radius, 10)
        : 0;
    const pad =
      fields.pad && parseInt(fields.pad, 10) ? parseInt(fields.pad, 10) : 0;

    const images = fields.images || [];

    const widthView = valueBox
      ? widthComponent - 2 * padding.large
      : widthComponent;

    const headingDisable = !fields.boxed ? 'all' : 'none';
    const contentDisable = !fields.boxed
      ? 'all'
      : typeViewBanner[layout] === 'scroll'
      ? 'right'
      : 'none';

    const Component = typeViewBanner[layout] === 'scroll' ? Scroll : Gird;

    return (
      <>
        {fields.disable_heading && (
          <Container disable={headingDisable}>
            <Heading
              title={
                heading.text && heading.text[language]
                  ? heading.text[language]
                  : t('common:text_blogs')
              }
              style={heading.style}
              containerStyle={styles.header}
            />
          </Container>
        )}
        <Container disable={contentDisable}>
          {images.length < 1 ? (
            <Empty
              widthView={widthView}
              width={widthValue}
              height={heightValue}
              radius={radius}
            />
          ) : (
            <Component
              images={images}
              col={colBanner(layout, images.length)}
              widthImage={40}
              heightImage={30}
              widthView={widthView}
              radius={radius}
              box={valueBox}
              pad={pad}
              clickBanner={(data) => this.OnPress(data)}
              language={language}
            />
          )}
        </Container>
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 0,
  },
});

const mapStateToProps = (state) => ({
  language: languageSelector(state),
   Locator: LocationSelector(state),
});

Banners.defaultProps = {
  widthComponent: width,
};

export default compose(withTranslation(), connect(mapStateToProps))(Banners);
