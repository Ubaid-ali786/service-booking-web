"use client";

import React from "react";
import { SnackbarProvider } from "notistack";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.Fragment>
      <SnackbarProvider>{children}</SnackbarProvider>
    </React.Fragment>
  );
}
