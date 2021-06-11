import DocumentFullScreen from './DocumentFullScreen';
import FullScreen from './FullScreen';

function styleInject() {
  let css = 'body:-ms-fullscreen {overflow: auto;}';

  if (typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  head.appendChild(style);
  style.appendChild(document.createTextNode(css));
}

styleInject();

export { FullScreen, DocumentFullScreen };
