import React from 'react'
import { client } from '@/sanity/lib/client'
import { Tag } from '@/app/utils/Interface'

import Header from '@/app/components/Header'
import Link from 'next/link'

async function getAllTags() {
	const query = `
    *[_type == "tag"]{
        name,
        slug,
        _id,
        "postCount":count( *[_type == "post" && references("tags", ^._id)])
      }`

      const tags = await client.fetch(query)
      return tags
}

export const reavalidate = 60

const page = async () => {
    const tags: Tag[] = await getAllTags()
	return <div>
        <Header title='Tags' />
        
        {tags?.length && tags?.map(tag => <Link href={`tag/${tag.slug.current}`} key={tag._id}>#{tag.name}({tag.postCount})</Link>)}</div>
}

export default page
