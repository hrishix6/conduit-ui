import Navbar from './navbar';
import Footer from './footer';
import { Outlet } from 'react-router-dom';


export function Layout() {
  return (
    <div className='overflow-x-hidden'>
      <Navbar />
      <main className="mb-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
