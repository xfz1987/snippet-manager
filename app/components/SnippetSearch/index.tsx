'use client';

import { useState, useCallback } from 'react';
import { Snippet } from '@prisma/client';
import { SearchBar } from '@/app/components/SearchBar';
import { SnippetList } from '@/app/components/SnippetList';

export function SnippetSearch(p: { placeholder: string; snippets: Snippet[] }) {
	const [currSearchQuery, setCurrSearchQuery] = useState('');

	const fitlered = p.snippets.filter(snippet => {
		return [snippet.title, snippet.technology, snippet.language, snippet.content].some(item =>
			item.toLowerCase().includes(currSearchQuery.toLowerCase())
		);
	});

	const changeHandler = useCallback((value: string) => setCurrSearchQuery(value), []);

	return (
		<div>
			<SearchBar
				placeholder={p.placeholder}
				onChange={changeHandler}
			/>
			<div className="overflow-y-auto h-[80vh] pb-20">
				<SnippetList snippets={fitlered} />
			</div>
		</div>
	);
}
