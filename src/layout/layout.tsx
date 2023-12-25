import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

interface Props {
  children?: React.ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div>
      <Navbar />
      <main className="mb-10">{children}</main>
      <Footer />
    </div>
  );
}
