declare module 'react-responsive-masonry' {
  import { ReactNode } from 'react';

  export interface ResponsiveMasonryProps {
    columnsCountBreakpoints?: { [key: number]: number };
    children: ReactNode;
  }

  export interface MasonryProps {
    columnsCount?: number;
    gutter?: string;
    children: ReactNode;
  }

  export function ResponsiveMasonry(props: ResponsiveMasonryProps): JSX.Element;
  export default function Masonry(props: MasonryProps): JSX.Element;
}
