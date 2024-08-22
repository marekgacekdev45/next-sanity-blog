import { init } from "next/dist/compiled/webpack/webpack";
import { title } from "process";
import { Rule, validation } from "sanity";

export const post = {
	name: 'post',
	title: 'Post',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule:Rule) => Rule.required().error('Pole wymagane'),
		},
		{
			name: 'slug',
			title: 'slug',
			type: 'slug',
			options: {
				source: 'title',
			},
			validation: (Rule:Rule) => Rule.required().error('Pole wymagane'),
		},
		{
			name: 'publishedAt',
			title: 'publishedAt',
			type: 'datetime',
			initialValue: () => new Date().toISOString(),
		},
		{
			name: 'excerpt',
			title: 'Excerpt',
			type: 'text',
			validation: (Rule:Rule) => Rule.max(200).error('Maksymalnie 200 znaków'),
		},
		{
			name: 'body',
			title: 'Body',
			type: 'array',
			of: [{ type: 'block' }, { type: 'image',fields:[{
				type:'text',name:'alt',title:"Alt"
			}] },{ type: 'code' },],
		},
		{
			name: 'tags',
			title: 'Tags',
			type: 'array',
			of: [{ type: 'reference', to: {type: 'tag'} }],
		}
	],
}
