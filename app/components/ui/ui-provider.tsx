import { OverlayProvider } from '@react-aria/overlays';
import { RouterProvider } from '@react-aria/utils';

import { useNavigate } from '@remix-run/react';
import type { ReactNode } from 'react';

export function Provider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  return (
    <OverlayProvider>
      <RouterProvider navigate={navigate}>{children}</RouterProvider>
    </OverlayProvider>
  );
}
