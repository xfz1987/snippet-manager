'use client';

import { updateSnippet } from '@/app/api/snippet/[id]/service';
import { FormSnippet } from '@/app/components/FormSnippet';
import type { Form } from '@/app/components/FormSnippet';
import { SNIPPETS_METADATA } from '@/app/constant';
import { Snippet } from '@prisma/client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function ClientPage(p: { id: number; snippet: Snippet }) {
	const { id, snippet } = p;
	const router = useRouter();

	async function save(formData: Form) {
		try {
			const { success } = await updateSnippet(id, {
				...formData,
				language: SNIPPETS_METADATA[formData.technology].language,
			});

			// const { success } = await fetch(`/api/snippet/${id}`, {
			// 	method: 'PATCH',
			// 	body: JSON.stringify({
			// 		...formData,
			// 		language: SNIPPETS_METADATA[formData.technology].language,
			// 	}),
			// });

			if (success) {
				toast.success('Snippet updated successfully');
				router.push('/');
				router.refresh();
			} else {
				toast.error('Snippet updated failed');
			}
		} catch (error) {
			toast.error('Server Error');
		}
	}

	return (
		<FormSnippet
			snippet={snippet}
			save={save}
		/>
	);
}
