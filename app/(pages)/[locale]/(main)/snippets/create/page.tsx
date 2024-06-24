'use client';

import { createSnippet } from '@/app/api/snippet/service';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { SNIPPETS_METADATA } from '@/app/constant';
import { FormSnippet, Form } from '@/app/components/FormSnippet';

export default function CreateSnippetPage() {
	const router = useRouter();

	async function save(formData: Form) {
		try {
			const { success } = await createSnippet({
				...formData,
				language: SNIPPETS_METADATA[formData.technology].language,
			});

			if (success) {
				toast.success('Snippet created successfully');
				router.push('/');
				router.refresh();
			} else {
				toast.error('Snippet created failed');
			}
		} catch (error) {
			toast.error('Server Error');
		}
	}

	return <FormSnippet save={save} />;
}
