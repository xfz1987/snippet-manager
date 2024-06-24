import { Snippet } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { readAllSnippet, createSnippet } from './service';
import { ApiResponse } from '@/app/types/index';
import { getQueryParams } from '@/app/lib/util';

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse<Snippet[]>>> {
	// { 'title' => '"b"', 'technology' => '"c"' }  需要转化成真正数组 ==> { title: '"b"', technology: '"c"' }
	const filters: Partial<Snippet> = Object.fromEntries(req.nextUrl.searchParams);
	// const filters = getQueryParams<typeof readAllSnippetSchema._type>(req);

	return NextResponse.json(await readAllSnippet(filters));
}

export async function POST(req: NextRequest) {
	const body = await req.json();
	return NextResponse.json(await createSnippet(body));
}
