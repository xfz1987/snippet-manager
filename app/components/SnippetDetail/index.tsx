'use client';

import { Snippet } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { SNIPPETS_METADATA } from '@/app/constant';
import { Prism as SynthaxHighlighter } from 'react-syntax-highlighter';
import { atomDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { MouseEvent, useState, useRef, ReactNode } from 'react';
import { toast } from 'sonner';
import { RxCopy } from 'react-icons/rx';
import { MdEdit, MdDelete } from 'react-icons/md';
import { deleteSnippet } from '@/app/api/snippet/[id]/service';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export function SnippetDetail(p: { snippet: Snippet }) {
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const dialog = useRef<ReactNode>(null);
	const router = useRouter();
	const { userId } = useAuth();

	const snippetMetadata = SNIPPETS_METADATA[p.snippet.technology];

	const copyCodeIntoClipboard = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		navigator.clipboard.writeText(p.snippet.content);
		toast.info('Code copied into clipboard');
	};

	const codeHighLighter = (
		<SynthaxHighlighter
			showLineNumbers
			style={theme}
			language={p.snippet.language}
		>
			{p.snippet.content}
		</SynthaxHighlighter>
	);

	const actionButtons = (
		<div className="flex justify-end space-x-4">
			{userId && (
				<>
					<Link
						href={`/snippets/update/${p.snippet.id}`}
						className="icon-box flex flex-col"
					>
						<MdEdit />
						Edit
					</Link>
					<div
						className="icon-box flex flex-col"
						onClick={() => setShowDeleteDialog(true)}
					>
						<MdDelete />
						Delete
					</div>
				</>
			)}
			<div
				className="icon-box flex flex-col"
				onClick={copyCodeIntoClipboard}
			>
				<RxCopy />
				Copy
			</div>
		</div>
	);

	const handleDeleteSnippet = async () => {
		// 方式一：通过 http 请求
		// const res = (await fetch(`/api/snippet/${p.snippet.id}`, { method: 'DELETE' })).json();

		// 方式二：使用 action，按钮套form的方式

		// 方式三：直接调用服务器 service，但会报错，auth() and currentUser() are only supported in App Router (/app directory)
		// What's wrong? I do use AppRouter，so you can mark the service file as "use server"

		const { success } = await deleteSnippet(p.snippet.id);
		if (success) {
			toast.success('Snippet deleted successfully');
			router.push('/');
			router.refresh();
		}
	};

	const createDeleteDialog = () => {
		if (dialog.current) return dialog.current;
		return (
			<div className="top-0 left-0 fixed h-screen w-screen bg-main-600/50">
				<div className="p-8 rounded-lg flex shadow-xl flex-col items-center justify-center absolute top-72 h-56 left-[40%] bg-white">
					<div className="text-xl font-bold mb-4">Delete snippet</div>
					<div>Are you sure you want to delete the snippet ?</div>
					<div className="space-x-20 mt-14">
						<button
							className="bg-main-400 hover:bg-main-400/80"
							onClick={() => setShowDeleteDialog(false)}
						>
							Cancel
						</button>
						<button
							className="bg-red-400 hover:bg-red-400/80"
							onClick={handleDeleteSnippet}
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div>
			<div className="flex space-x-4">
				<Image
					width={40}
					src={snippetMetadata.src}
					alt="Programming language image"
					className="w-auto h-auto"
				/>
				<h1>{p.snippet.title}</h1>
			</div>
			<div className="mt-10">
				{actionButtons}
				{codeHighLighter}
			</div>
			{showDeleteDialog && createDeleteDialog()}
		</div>
	);
}
