import Link from 'next/link'
import React from 'react'
import { Lilita_One, VT323 } from 'next/font/google'
import { Post } from '../utils/Interface'

const font = Lilita_One({ weight: '400', subsets: ['latin'] })
const dateFont = VT323({ weight: '400', subsets: ['latin'] })

const PostComponent = ({ post }: { post: Post }) => {
	return (
		<div className={cardStyle} key={post?._id}>
			<Link href={`/posts/${post.slug.current}`}>
				<h2 className={`${font.className} text-2xl dark:text-slate-300`}>{post?.title}</h2>
				<p className={`${dateFont.className} my-2 text-purple-600`}>
					{new Date(post?.publishedAt).toLocaleDateString('pl-PL')}
				</p>
				<p className='dark:text-gray-400 mb-4 line-clamp-2'>{post?.excerpt}</p>
			</Link>

			<div>
				{post?.tags?.map(tag => (
					<Link href={`/tag/${tag.slug.current}`} key={tag?._id} className='inline-block bg-purple-600 text-white text-xs px-2 py-1 rounded-full mr-2'>
						{tag.name}
					</Link>
				))}
			</div>
		</div>
	)
}

export default PostComponent

const cardStyle = `mb-8 p-4 border border-gray-900 rounded-md shadow-sm shadow-purple-950 hover:shadow-md hover:bg-purple-500 hover:text-white hover:dark:bg-gray-950 duration-500`
