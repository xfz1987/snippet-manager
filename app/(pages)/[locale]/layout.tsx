import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { Toaster } from 'sonner';
import { frFR, enUS, zhCN } from '@clerk/localizations';
import type { LOCALES_TYPE } from '@/i18n';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Snippet',
	description: 'The one place for all your code snippets',
};

const clerkI18n = {
	fr: frFR,
	en: enUS,
	cn: zhCN,
};

export default function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: { locale: LOCALES_TYPE };
}>) {
	return (
		<ClerkProvider
			localization={clerkI18n[params.locale]}
			appearance={{
				baseTheme: dark,
				variables: { colorPrimary: '#d44700' },
				elements: { card: 'bg-main-700 shadow-none' },
			}}
		>
			<html lang={params.locale}>
				<body className={inter.className}>
					<Toaster
						expand
						richColors
						theme="dark"
						visibleToasts={2}
					/>
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
