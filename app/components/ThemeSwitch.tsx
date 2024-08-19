'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const ThemeSwitch = () => {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	useEffect(() => setMounted(true), [])

	if (!mounted) return null

	return (
		<button
			className='border border-transparent hover:border-purple-500 p-1 rounded-xl hover:bg-purple-500 hover:bg-opacity-10 duration-500'
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
			{theme === 'dark' ? '🌞' : '🌙'}
		</button>
	)
}

export default ThemeSwitch
