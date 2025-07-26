/* eslint-disable @typescript-eslint/no-empty-object-type */
import 'styled-components';
import { theme } from './theme';

type AppTheme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
