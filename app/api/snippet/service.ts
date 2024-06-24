'use server';

import { auth } from '@clerk/nextjs/server';
import { Snippet, Language, Technology } from '@prisma/client';
import { z } from 'zod';
import { DB } from '@/app/lib/db';

// Validate inputs schema
const readAllSnippetSchema = z
	.object({
		title: z.string().optional(), // optional 表示可选
		content: z.string().optional(),
		language: z.nativeEnum(Language).optional(),
		technology: z.nativeEnum(Technology).optional(),
	})
	.optional();

export async function readAllSnippet(filters?: Partial<Snippet>) {
	const { userId } = auth();

	// if (!userId) {
	// 	return {
	// 		data: [],
	// 		success: false,
	// 		status: 401,
	// 		message: 'You have not signed in',
	// 	};
	// }

	try {
		readAllSnippetSchema.parse(filters);

		const data = await DB.snippet.findMany({
			where: userId
				? {
						...filters,
						userId,
				  }
				: { ...filters },
		});

		return { data, success: true };
	} catch (error) {
		console.log('bb', error);
		return {
			data: [],
			success: false,
			status: 500,
			message: 'Something went wrong fetching the snippets ' + (error as Error).message,
		};
	}
}

const createSnippetSchema = z.object({
	title: z.string(),
	content: z.string(),
	language: z.nativeEnum(Language),
	technology: z.nativeEnum(Technology),
	// userId: z.string(),
});

export async function createSnippet(body: typeof createSnippetSchema._type) {
	const { userId } = auth();
	if (!userId) {
		return {
			success: false,
			status: 401,
			message: 'You have not signed in',
		};
	}

	try {
		createSnippetSchema.parse(body);
		const result = await DB.snippet.create({ data: { ...body, userId } });
		return { data: result, success: true };
	} catch (error) {
		return {
			data: null,
			success: false,
			status: 500,
			message: 'Something went wrong creating the snippet ' + (error as Error).message,
		};
	}
}
