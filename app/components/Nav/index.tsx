import Link from 'next/link';
import Image from 'next/image';
import { SNIPPETS_METADATA, SnippetMetadata } from '@/app/constant';

export function Nav() {
	const renderLinkItem = (item: SnippetMetadata) => (
		<li
			key={item.technology}
			className="transition transform hover:scale-125"
		>
			<Link
				href={`/snippets/technology/${item.technology}`}
				className="flex items-center gap-4 font-semibold"
			>
				<Image
					src={item.src}
					alt={`Icon for ${item.label}`}
					width={30}
					height={30}
					className="w-auto h-auto"
				/>
				{item.label}
			</Link>
		</li>
	);

	return (
		<div className="text-white bg-main-900 py-8 px-6 text-sm rounded-lg overflow-y-auto ">
			<ul className="space-y-4">{Object.values(SNIPPETS_METADATA).map(renderLinkItem)}</ul>
		</div>
	);
}
