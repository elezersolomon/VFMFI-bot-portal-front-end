// src/components/Layout.tsx
import React from "react";

interface LayoutProps {
  links: { to: string; text: string }[];
  role: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ links, role, children }) => {
  // Layout implementation
  return (
    <div>
      {/* Render links and content based on role */}
      {children}
    </div>
  );
};

export default Layout;
