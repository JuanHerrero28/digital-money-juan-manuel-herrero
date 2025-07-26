/* eslint-disable @typescript-eslint/no-empty-interface */
import 'styled-components';
import { theme } from './theme';

type AppTheme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
