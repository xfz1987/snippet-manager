import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors } from 'react-hook-form';

export function FieldError(p: { name: string; errors: FieldErrors }) {
	return (
		<div className="text-red-500">
			<ErrorMessage
				errors={p.errors}
				name={p.name}
			/>
		</div>
	);
}
