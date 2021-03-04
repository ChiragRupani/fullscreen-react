export default class FSUtility {
  public static get documentElement(): HTMLElement {
    return document.fullscreenElement !== undefined
      ? document.documentElement
      : document['msFullscreenElement'] !== undefined
      ? document.body
      : document.documentElement;
  }

  public static get fullscreenElement(): Element {
    return (
      document.fullscreenElement ||
      document['msFullscreenElement'] ||
      document['webkitFullscreenElement'] ||
      document['mozFullScreenElement']
    );
  }

  public static readonly fullscreenchange: string | null =
    (document.onfullscreenchange !== undefined ? 'fullscreenchange' : null) ||
    (document['onmsfullscreenChange'] !== undefined
      ? 'msfullscreenChange'
      : null) ||
    (document['onwebkitfullscreenchange'] !== undefined
      ? 'webkitfullscreenchange'
      : null) ||
    (document['onmozfullscreenchange'] !== undefined
      ? 'mozfullscreenchange'
      : null);

  public static get fullscreenEnabled(): boolean {
    return (
      document.fullscreenEnabled ||
      document['msFullscreenEnabled'] ||
      document['webkitFullscreenEnabled'] ||
      document['mozFullScreenEnabled']
    );
  }

  public static readonly requestFullscreen: (
    element: Element | null
  ) => Promise<void> = (element: Element | null) => {
    if (!element) {
      return;
    }

    if (element.requestFullscreen) {
      return element.requestFullscreen();
    }

    if (element['msRequestFullscreen']) {
      return element['msRequestFullscreen']();
    }

    if (element['webkitRequestFullscreen']) {
      return element['webkitRequestFullscreen']();
    }

    if (element['mozRequestFullScreen']) {
      return element['mozRequestFullScreen']();
    }
  };

  public static readonly exitFullscreen: () => Promise<void> = () => {
    if (document.exitFullscreen) {
      return document.exitFullscreen();
    }

    if (document['webkitExitFullscreen']) {
      return document['webkitExitFullscreen']();
    }

    if (document['msExitFullscreen']) {
      return document['msExitFullscreen']();
    }

    if (document['mozCancelFullScreen']) {
      return document['mozCancelFullScreen']();
    }
  };
}
