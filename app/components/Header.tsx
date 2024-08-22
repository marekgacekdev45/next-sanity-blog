import Link from 'next/link';
import React from 'react'

interface Props {
  title: string;
  tags?: boolean
}

const Header = ({ title = "",tags=false }: Props) => {
  return (
    <header className='py-14 px-4 mb-12 text-center border-b border-purple-900'>
        <h2 className='uppercase text-2xl mx-auto max-w-2xl font-bold'>{title}</h2>
        {tags && <div className='mt-5'>
          <Link href='/tag' className='inline-block bg-purple-600 text-white text-xs px-2 py-1 rounded-full mr-2'>
            All tags
          </Link>
        </div>}
    </header>
  )
}

export default Header