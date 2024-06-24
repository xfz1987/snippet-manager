import { readSnippet, updateSnippet } from '@/app/api/snippet/[id]/service';
import ClientPage from './client-page';
import { notFound } from 'next/navigation';

export default async function UpdateSnippetPage(p: { params: { id: string } }) {
	const { data } = await readSnippet(Number(p.params.id));

	if (!data) {
		notFound();
	}

	return (
		<ClientPage
			snippet={data}
			id={Number(p.params.id)}
		/>
	);
}
