import React from 'react'
import Link from 'next/link'

const CMSNavbar = () => {
	return (
		<div className='flex justify-between items-center py-1 px-5'>
            <Link href="/" className='text-white dark:text-black'>back</Link>
		
		</div>
	)
}

export default CMSNavbar
