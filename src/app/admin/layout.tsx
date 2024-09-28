import React from "react";

export default function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }