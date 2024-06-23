import { Snippet } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { readAllSnippet, createSnippet } from './service';

export async function GET(req: NextRequest) {
	// { 'title' => '"b"', 'technology' => '"c"' }  需要转化成真正数组 ==> { title: '"b"', technology: '"c"' }
	const filters: Partial<Snippet> = Object.fromEntries(req.nextUrl.searchParams);
	return NextResponse.json(await readAllSnippet(filters));
}

export async function POST(req: NextRequest) {
	const body = await req.json();
	return NextResponse.json(await createSnippet(body));
}
