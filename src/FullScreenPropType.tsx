export default interface FullScreenPropType {
  onChange: (isFullScreenEnabled: boolean) => void;
  isFullScreen: boolean;
  children?: React.ReactNode;
}
