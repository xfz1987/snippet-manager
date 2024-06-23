import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const LOCALES = ['en', 'fr', 'cn'] as const;
export const DEFAULT_LOCALE = 'en';
export type LOCALES_TYPE = (typeof LOCALES)[number];

export default getRequestConfig(async ({ locale }) => {
	// Validate that the incoming `locale` parameter is valid
	if (!LOCALES.includes(locale as any)) notFound();

	return {
		messages: (await import(`./messages/${locale}.json`)).default,
	};
});
