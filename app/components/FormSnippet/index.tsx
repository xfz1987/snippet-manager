'use client';

import { Snippet, Technology } from '@prisma/client';
import { SNIPPETS_METADATA } from '@/app/constant';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldError } from '@/app/components/FieldError';

const FormSchema = z.object({
	title: z.string().min(5, { message: 'This field should be at least 5 characters long' }),
	content: z.string().min(10, { message: 'This field should be at least 10 characters long' }),
	technology: z.nativeEnum(Technology, {
		invalid_type_error: 'This is not a valid technology',
	}),
});

export type Form = typeof FormSchema._type;

const SNIPPETS_KEYS = Object.keys(SNIPPETS_METADATA);

const DefaultValues = {
	title: '',
	content: '',
	technology: SNIPPETS_METADATA[SNIPPETS_KEYS[0]].technology,
};

export function FormSnippet(p: { snippet?: Snippet; save: (formData: Form) => Promise<void> }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Form>({
		resolver: zodResolver(FormSchema),
		defaultValues: p.snippet || DefaultValues,
	});

	function submit(formData: Form) {
		p.save(formData);
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
				{SNIPPETS_KEYS.map(techno => {
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
