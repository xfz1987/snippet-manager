# Enviroment Prepare

## clerk (Authentication Service)

- [注册 clerk -> Create Application -> Follow by Doc](https://clerk.com/)
- bun add @clerk/nextjs
- if you need clerk theme, you can "bun add @clerk/themes"

## DataBase

- Cloud Database，here I select [supabase](https://supabase.com/)

In this project, I am supposed to use "prisma" to manipulate Database postgres

- bun add prisma -D
- bun add @prisma/client
- bunx prisma init
- configure .env and prisma/schema.prisma
- bunx prisma migrate dev ==> That will created table in cloud database

## Form

### react-hook-form

```tsx
import { useForm } from 'react-hook-form';
export default function App() {
	const { register, handleSubmit, formState } = useForm({
		defaultValues: {
			name: 'xfz',
			age: 20,
		},
	});

	function submit(data) {
		//
	}

	// Use register instead of the atttibute "name" of form element
	return (
		<form onSubmit={handleSubmit(submit)}>
			<input
				{...register('name', {
					required: 'This field is required',
					minLength: { value: 3, messsage: 'This is too short' },
					validate: value => {
						if (value === 'f*ck') {
							return 'No bad words please';
						}
					},
				})}
			/>
			<span>{formState.errors.name.message}</span>
			<input
				type="number"
				{...register('age', { required: 'This field is required' })}
			/>
			<span>{formState.errors.age.message}</span>
		</form>
	);
}
```

Code above, it's too troublesome, even code is not enough tidy, it looks like a piece of shit.
We should make code clean, especially html section tidy to make us realize the structure of html

#### react-hook-form + zod + @hookform/resolvers + @hookform/error-message

- Zod can be used for form validating not only in Client but aslo in server.
- In client, zod need @hookform/resolvers to connext react-hook-form

```tsx
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const FormSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'This is too short' })
		.refine(value => value !== 'f*ck', { message: 'No bad words please' })
	age: z.number(),
});

export default function App() {
	const { register, handleSubmit, formState } = useForm({
		// Here load the schema
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: 'xfz',
			age: 20,
		},
	});

	function submit(data) {
		//
	}

	// Use register instead of the atttibute "name" of form element
	return (
		<form onSubmit={handleSubmit(submit)}>
			<input {...register('name')} />
			<span>{formState.errors.name.message}</span>
			<input
				type="number"
				{...register('age')}
			/>
			<span>{formState.errors.age.message}</span>
		</form>
	);
}
```
