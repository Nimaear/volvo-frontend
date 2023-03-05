import 'vcc-ui';
declare module 'vcc-ui' {
  export interface CurrentTheme {
    breakpoint: {
      size: {
        large: number;
        medium: number;
        small: number;
      }
    }
  }
}