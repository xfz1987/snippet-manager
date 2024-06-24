import { readAllSnippet } from '@/app/api/snippet/service';
import { SnippetSearch } from '@/app/components/SnippetSearch';
import { NextIntlClientProvider, useTranslations } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';

export default async function Home({ params }: { params: { locale: string } }) {
	const { data } = await readAllSnippet();
	const t = await getTranslations('main');
	const messages = await getMessages({
		locale: params.locale,
	});

	return (
		<NextIntlClientProvider messages={messages}>
			<SnippetSearch
				snippets={data}
				placeholder={t('searchPlaceholder', { technology: '' })}
			/>
		</NextIntlClientProvider>
	);
}
