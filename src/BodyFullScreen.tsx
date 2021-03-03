import * as React from 'react';
import FSUtility from './FSUtility';

export default class BodyFullScreen extends React.PureComponent<
  {
    onChange: (isFullScreenEnabled: boolean) => void;
    isFullScreen: boolean;
  },
  {}
> {
  private bodyElement = document.querySelector('body');

  constructor(props) {
    super(props);
    this.onFullScreenChange = this.onFullScreenChange.bind(this);
  }

  componentDidMount() {
    if (FSUtility.fullscreenchange) {
      document.addEventListener(
        FSUtility.fullscreenchange,
        this.onFullScreenChange
      );
    }
  }

  componentWillUnmount() {
    if (FSUtility.fullscreenchange) {
      document.removeEventListener(
        FSUtility.fullscreenchange,
        this.onFullScreenChange
      );
    }
  }

  async componentDidUpdate(prevProps: { isFullScreen: boolean }) {
    if (
      !this.bodyElement ||
      !FSUtility.fullscreenEnabled ||
      prevProps.isFullScreen === this.props.isFullScreen
    ) {
      return;
    }

    let isFullScreenEnabled: boolean =
      FSUtility.fullscreenElement === this.bodyElement;

    if (this.props.isFullScreen && !isFullScreenEnabled) {
      await FSUtility.requestFullscreen(this.bodyElement);
      this.bodyElement.style.overflow = 'auto';
    } else if (isFullScreenEnabled && !this.props.isFullScreen) {
      await FSUtility.exitFullscreen();
      this.bodyElement.style.overflow = 'initial';
    }
  }

  onFullScreenChange() {
    let currentState = FSUtility.fullscreenElement === this.bodyElement;
    let stateChanged = currentState !== this.props.isFullScreen;

    if (stateChanged) {
      this.props.onChange(currentState);
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}
