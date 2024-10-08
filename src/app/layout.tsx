import type { Metadata } from "next";

import CssBaseline from "@mui/material/CssBaseline";
import AppDrawer from "@/components/common/app-drawer";
import Providers from "@/providers";

export const metadata: Metadata = {
  title: "Sevenfold",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body>
          <CssBaseline />
          <AppDrawer>{children}</AppDrawer>
        </body>
      </Providers>
    </html>
  );
}
