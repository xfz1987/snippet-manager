'use client';

import { useAuth } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { useDebouncedCallback } from 'use-debounce';

export function SearchBar(p: { onChange: (text: string) => void; placeholder: string }) {
	const router = useRouter();
	const t = useTranslations('main');
	const { userId } = useAuth();

	const changeHandler = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => p.onChange(e.target.value), 500);

	const input = (
		<div className="relative w-full">
			<input
				type="text"
				className="pl-10"
				placeholder={p.placeholder}
				onChange={changeHandler}
			/>
			<RiSearchLine className="h-5 w-5 absolute top-2 left-3 text-gray-400" />
		</div>
	);

	return (
		<div className="bg-main-900 p-6 rounded-lg flex space-x-4">
			{input}
			{userId && (
				<button
					className="min-w-max"
					onClick={() => router.push('/snippets/create')}
				>
					{t('addButton')}
				</button>
			)}
		</div>
	);
}
