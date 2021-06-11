import * as React from 'react';
import FSUtility from './FSUtility';
// import './FullScreen.css';
import FullScreenPropType from './FullScreenPropType';

export default class DocumentFullScreen extends React.PureComponent<
  FullScreenPropType,
  {}
> {
  private docElement = FSUtility.documentElement;

  constructor(props: FullScreenPropType) {
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

  async componentDidUpdate(prevProps: FullScreenPropType) {
    if (
      !this.docElement ||
      !FSUtility.fullscreenEnabled ||
      prevProps.isFullScreen === this.props.isFullScreen
    ) {
      return;
    }

    let isFullScreenEnabled: boolean =
      FSUtility.fullscreenElement === this.docElement;

    if (this.props.isFullScreen && !isFullScreenEnabled) {
      await FSUtility.requestFullscreen(this.docElement);
    } else if (isFullScreenEnabled && !this.props.isFullScreen) {
      await FSUtility.exitFullscreen();
    }
  }

  onFullScreenChange() {
    let currentState = FSUtility.fullscreenElement === this.docElement;
    let stateChanged = currentState !== this.props.isFullScreen;

    if (stateChanged) {
      this.props.onChange(currentState);
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}
