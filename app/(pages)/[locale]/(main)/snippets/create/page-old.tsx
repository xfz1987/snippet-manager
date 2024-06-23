'use client';

import { Technology } from '@prisma/client';
import { createSnippet } from '@/app/api/snippet/service';
import { SNIPPETS_METADATA } from '@/app/constant';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldError } from '@/app/components/FieldError';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
	title: z.string().min(5, { message: 'This field should be at least 5 characters long' }),
	content: z.string().min(10, { message: 'This field should be at least 10 characters long' }),
	technology: z.nativeEnum(Technology, {
		invalid_type_error: 'This is not a valid technology',
	}),
});

type Form = typeof FormSchema._type;

export default function CreateSnippetPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Form>({
		resolver: zodResolver(FormSchema),
	});

	const router = useRouter();

	async function submit(formData: Form) {
		const { success } = await createSnippet({
			...formData,
			language: SNIPPETS_METADATA[formData.technology].language,
		});
		if (success) {
			toast.success('Snippet created successfully');
			router.push('/');
			router.refresh();
		}
	}

	const inputTitle = (
		<div className="space-y-3 w-72">
			<label htmlFor="title">Title</label>
			<input
				id="title"
				{...register('title')}
			/>
			<FieldError
				name="title"
				errors={errors}
			/>
		</div>
	);

	const technoSelect = (
		<div className="space-y-3 w-80">
			<label htmlFor="technology">Framework / Technology / Language</label>
			<select
				{...register('technology')}
				id="technology"
			>
				{Object.keys(SNIPPETS_METADATA).map(techno => {
					const { technology: value, label } = SNIPPETS_METADATA[techno];
					return (
						<option
							key={value}
							value={value}
						>
							{label}
						</option>
					);
				})}
			</select>
			<FieldError
				errors={errors}
				name="technology"
			/>
		</div>
	);

	const textareaContent = (
		<div className="space-y-3">
			<label htmlFor="content">Content</label>
			<textarea
				{...register('content')}
				id="content"
				className="h-96 w-full"
			/>
			<FieldError
				errors={errors}
				name="content"
			/>
		</div>
	);

	return (
		<form
			onSubmit={handleSubmit(submit)}
			className="space-y-9 w-[50rem]"
		>
			<div className="space-y-6">
				<h1>New Snippet</h1>
				{inputTitle}
				{technoSelect}
				{textareaContent}
			</div>
			<div className="flex justify-end">
				<button type="submit">Save</button>
			</div>
		</form>
	);
}
