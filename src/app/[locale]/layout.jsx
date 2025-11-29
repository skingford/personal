import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import { DebugProvider } from '@/context/DebugContext';
import DebugToggle from '@/components/Debug/DebugToggle';
import DebugLogs from '@/components/Debug/DebugLogs';

// Actually, let's stick to simple validation for now as per next-intl docs without routing config file if possible, or just validate here.

import '@/styles/global.scss';
import ClientLayout from '@/components/Layout/ClientLayout';

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

  const messages = await getMessages();
 
  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <DebugProvider>
            <DebugLogs />
            <ClientLayout>
              {children}
            </ClientLayout>
            <DebugToggle />
          </DebugProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
