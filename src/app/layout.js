import './globals.css';
import Header from './_components/Header';
import Sidebar from './_components/Sidebar';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background overflow-x-hidden">
        <Header />
        <Sidebar />
        <main className='min-[800px]:m-25 min-[1080px]:ml-90'>{children}</main>
      </body>
    </html>
  );
};
