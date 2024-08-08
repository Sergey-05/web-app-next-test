import NavLinks from "./ui/nav-links";
import '@/app/ui/global.css';
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: 'Test Web App',
  description: 'Generated for testing by Next.js',
};
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
          <Script src='https://telegram.org/js/telegram-web-app.js' strategy="beforeInteractive"/>
        </head>
      <body className="h-screen m-0">
        <div className="flex h-full flex-col">
          <div className="flex-grow">{children}</div>
          <div className="p-2 fixed bottom-0 left-0 right-0 flex h-16 justify-between bg-white shadow-md gap-2">
            <NavLinks/>
          </div>
        </div>
      </body>
    </html>
    
  );
}
  