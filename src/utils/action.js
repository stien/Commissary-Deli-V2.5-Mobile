import {Linking} from 'react-native';
import NavigationServices from './navigation';
import {mainStack} from 'src/config/navigator';

function action(data) {
  console.log('DATA',data)
  console.log('action here',data)
  if (data && data.type && data.id) {
    const {type, id} = data;
    switch (type) {
      case 'link-extension':
        return Linking.openURL(id);
      case 'link-webview':
        return NavigationServices.navigate(mainStack.linking_webview, {
          url: id,
        });
      case 'explore':
        return  NavigationServices.navigate(mainStack.DeliMeat, {id, type})
      default:
        const router =
          type === 'category'
            ? mainStack.products
            : type === 'blog'
            ? mainStack.blog
            : type === 'product'
            ? mainStack.product
            : null;
        if (router) {
          return NavigationServices.navigate(router, {id, type});
        }
        return 0;
    }
  }
}


export default action;
