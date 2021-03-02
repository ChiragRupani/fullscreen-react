export default class FSUtility {
  public static readonly fullscreenElement: Element =
    document.fullscreenElement ||
    document['msFullscreenElement'] ||
    document['webkitFullscreenElement'] ||
    document['mozFullScreenElement'];

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

  public static readonly fullscreenEnabled: boolean =
    document.fullscreenEnabled ||
    document['msFullscreenEnabled'] ||
    document['webkitFullscreenEnabled'] ||
    document['mozFullScreenEnabled'];

  public static readonly requestFullscreen: (
    element: Element | null,
    options?: FullscreenOptions
  ) => Promise<void> = (
    element: Element | null,
    options?: FullscreenOptions
  ) => {
    if (!element) {
      return;
    }

    if (element.requestFullscreen) {
      return element.requestFullscreen();
    }

    if (element['msRequestFullscreen']) {
      return element['msRequestFullscreen'](options);
    }

    if (element['webkitRequestFullscreen']) {
      return element['webkitRequestFullscreen'](options);
    }

    if (element['mozRequestFullScreen']) {
      return element['mozRequestFullScreen'](options);
    }

    return;
  };

  public static readonly exitFullscreen: () => Promise<any> = () =>
    (document.exitFullscreen ? document.exitFullscreen() : null) ||
    (document['msExitFullscreen'] ? document['msExitFullscreen']() : null) ||
    (document['webkitExitFullscreen']
      ? document['webkitExitFullscreen']()
      : null) ||
    (document['mozCancelFullScreen']
      ? document['mozCancelFullScreen']()
      : null);
}
