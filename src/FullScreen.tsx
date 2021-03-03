import * as React from 'react';
import FSUtility from './FSUtility';

export default class FullScreen extends React.PureComponent<
  {
    onChange: (isFullScreenEnabled: boolean) => void;
    isFullScreen: boolean;
  },
  {}
> {
  private currentElement: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);
    this.currentElement = React.createRef();
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
      !FSUtility.fullscreenEnabled ||
      prevProps.isFullScreen === this.props.isFullScreen
    ) {
      return;
    }

    let isFullScreenEnabled: boolean =
      FSUtility.fullscreenElement === this.currentElement.current;

    if (this.props.isFullScreen && !isFullScreenEnabled) {
      await FSUtility.requestFullscreen(this.currentElement.current);
    } else if (isFullScreenEnabled && !this.props.isFullScreen) {
      await FSUtility.exitFullscreen();
    }
  }

  onFullScreenChange() {
    let currentState =
      FSUtility.fullscreenElement === this.currentElement.current;
    let stateChanged = currentState !== this.props.isFullScreen;

    if (stateChanged) {
      this.props.onChange(currentState);
    }
  }

  render() {
    return (
      <div
        style={
          this.props.isFullScreen
            ? { height: '100% !important', width: '100% !important' }
            : undefined
        }
        ref={this.currentElement}
      >
        {this.props.children}
      </div>
    );
  }
}
