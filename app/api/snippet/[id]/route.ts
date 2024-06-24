import { NextRequest, NextResponse } from 'next/server';
import { deleteSnippet, updateSnippet } from './service';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
	const body = await req.json();
	return NextResponse.json(await updateSnippet(Number(params.id), body));
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
	return NextResponse.json(await deleteSnippet(Number(params.id)));
}
