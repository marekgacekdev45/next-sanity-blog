import React from 'react'
import { client } from '@/sanity/lib/client'
import Header from '@/app/components/Header'
import { Post } from '@/app/utils/Interface'

import { VT323 } from 'next/font/google'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { notFound } from 'next/navigation'

const dateFont = VT323({ weight: '400', subsets: ['latin'] })

interface Params {
	params: {
		slug: string
	}
}

async function getPost(slug: string) {
	const query = `
    *[_type == "post" && slug.current == "${slug}"][0]{
        title,
        slug,
        publishedAt,
        body,
        tags[]->{_id,name, slug},
      }`
	const data = await client.fetch(query)
	return data
}

export const revalidate = 60

const page = async ({ params }: Params) => {
	const post: Post = await getPost(params?.slug)

if(!post) {
	notFound()
}

	return (
		<div>
			<Header title={post?.title} />
			<div className='text-center'>
				<span className={`${dateFont.className} text-purple-600`}>
					{new Date(post?.publishedAt).toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' })}
				</span>
				<div className='mt-5'>
					{post?.tags?.map(tag => (
						<Link
							href={`/tag/${tag.slug.current}`}
							key={tag?._id}
							className='inline-block bg-purple-600 text-white text-xs px-2 py-1 rounded-full mr-2'>
							{tag.name}
						</Link>
					))}
				</div>
				<div className={richTextStyles}>
					<PortableText value={post?.body} components={myPortableTextComponents} />
				</div>
			</div>
		</div>
	)
}

const richTextStyles = `mt-14 text-justify max-w-2xl m-auto prose-headings:my-5 prose-headings:text-2xl prose-p:mb-5 prose-p:leading-7 prose-li:list-disc prose-li:leading-7 prose-li:ml-4`

export default page

const myPortableTextComponents = {
	types: {
		image: ({ value }: any) => <Image src={urlForImage(value).url()} alt='post' width={700} height={700} />,
        code: ({ value }: any) => (
            
            <SyntaxHighlighter language="javascript" style={solarizedlight}>
            {value.code}
          </SyntaxHighlighter>
          ),
	},
}
