import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';

// Actually, let's stick to simple validation for now as per next-intl docs without routing config file if possible, or just validate here.

import '../../styles/global.scss';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';

export const metadata = {
  title: 'My Portfolio',
  description: 'Personal portfolio website',
};

export default async function LocaleLayout({children, params}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!['en', 'zh-CN', 'zh-TW'].includes(locale)) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
 
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="app">
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ScrollToTop />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
