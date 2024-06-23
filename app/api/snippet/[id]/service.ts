'use server';

import { Language, Snippet, Technology } from '@prisma/client';
import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { DB } from '@/app/lib/db';

const updateSnippetSchema = z
	.object({
		title: z.string().optional(),
		content: z.string().optional(),
		language: z.nativeEnum(Language).optional(),
		technology: z.nativeEnum(Technology).optional(),
	})
	.refine(data => Object.keys(data).length > 0, {
		message: 'At least one value must be provided',
	});

export async function updateSnippet(id: number, body: Partial<Omit<Snippet, 'id'>>) {
	if (!auth().userId) {
		return {
			success: false,
			status: 401,
			message: 'You have not signed in',
		};
	}

	try {
		const validatedFields = updateSnippetSchema.safeParse(body);
		if (!validatedFields.success) {
			return {
				success: false,
				status: 500,
				message: validatedFields.error.flatten().fieldErrors,
			};
		}

		const result = await DB.snippet.update({
			data: validatedFields.data,
			where: { id },
		});
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

const deleteSnippetSchema = z.number();
export async function deleteSnippet(id: number) {
	if (!auth().userId) {
		return {
			success: true,
			status: 401,
			message: 'You have not signed in',
		};
	}

	try {
		deleteSnippetSchema.parse(id);
		const result = await DB.snippet.delete({
			where: { id },
		});
		return { data: result, success: true };
	} catch (err) {
		return {
			success: false,
			status: 500,
			message: 'Something went wrong deleting the snippet ' + (err as Error).message,
		};
	}
}

const readSnippetSchema = z.number();
export async function readSnippet(id: number) {
	const { userId } = auth();
	if (!userId) {
		return {
			success: false,
			status: 401,
			message: 'You have not signed in',
		};
	}

	try {
		readSnippetSchema.parse(id);

		const data = await DB.snippet.findUnique({
			where: { id, userId },
		});
		return { data, success: true };
	} catch (err) {
		return {
			data: null,
			success: false,
			status: 500,
			message: 'Something went wrong deleting the snippet ' + (err as Error).message,
		};
	}
}
