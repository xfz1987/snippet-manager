'use server';

import { ApiResponse } from '@/app/types';
import { Technology } from '@prisma/client';
import { TextCortexResponse } from '@/app/types/text-cortex-ai-type';

export async function genCode(code: string): Promise<ApiResponse<{}>> {
	const prompt = `Generate code : ${code}`;

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.TEXT_CORTEX_AI_API_KEY}`,
		},
		body: `{formality":"default","max_tokens":1000,"model":"chat-sophos-1","n":1,"source_lang":"auto","target_lang":"en","temperature":null,"text":"${prompt}"}`,
	};

	try {
		const res: TextCortexResponse = await fetch('https://api.textcortex.com/v1/codes', options)
			.then(async response => {
				return await response.json();
			})
			.catch(err => {
				console.log(err);
			});

		console.log('***', res.data.outputs);

		return {
			data: {
				content: '',
			},
		};
	} catch (err) {
		console.log(err);
		return {
			data: null,
			success: false,
		};
	}
}
