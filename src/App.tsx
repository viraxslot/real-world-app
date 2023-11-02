import { useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { PageName } from './helpers/paths';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageName>(PageName.Home);
  const pages = [PageName.Home, PageName.Login, PageName.Register];

  return (
    <>
      <Header pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Footer />
    </>
  );
}
