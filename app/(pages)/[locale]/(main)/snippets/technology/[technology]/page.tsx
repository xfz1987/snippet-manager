import { readAllSnippet } from '@/app/api/snippet/service';
import { SnippetSearch } from '@/app/components/SnippetSearch';
import { Technology } from '@prisma/client';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';

export default async function TechnologyPage(p: { params: { technology: Technology; locale: string } }) {
	const { data } = await readAllSnippet({
		technology: p.params.technology,
	});

	const messages = await getMessages({
		locale: p.params.locale,
	});
	const t = await getTranslations('main');

	return (
		<div>
			<NextIntlClientProvider messages={messages}>
				<SnippetSearch
					snippets={data}
					placeholder={t('searchPlaceholder', { technology: p.params.technology })}
				/>
			</NextIntlClientProvider>
		</div>
	);
}
