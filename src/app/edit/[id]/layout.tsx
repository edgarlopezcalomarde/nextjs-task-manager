import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="p-4 h-screen">
      {children}
    </section>
  );
}

export default Layout;
