import { notFound } from 'next/navigation';
import { readSnippet } from '@/app/api/snippet/[id]/service';
import { SnippetDetail } from '@/app/components/SnippetDetail';

export default async function SnippetDetailPage(p: { params: { id: string } }) {
	const { data } = await readSnippet(Number(p.params.id));

	if (!data) {
		notFound();
	}

	return <SnippetDetail snippet={data} />;
}
