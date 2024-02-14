'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const Page = () => {
  const [storedObject, setStoredObject] = useState(null)

  useEffect(() => {
    // Check if window is defined before accessing it
    if (typeof window !== 'undefined') {
      try {
        const data = window.localStorage.getItem('myData')
        // Attempt to parse the JSON data, handle parsing errors
        setStoredObject(data ? JSON.parse(data) : {})
      } catch (error) {
        console.error('Error parsing JSON:', error)
        // Handle the error gracefully, you can set a default value or take other actions
      }
    }
  }, [])

  return (
    <div className="px-10 py-4">
     
      <div className="custom-border min-h-[calc(100vh-60px)] p-8">
        {storedObject}
      </div>
      <Link href='/' className='my-8 text-blue-500 underline'>Go Back</Link>
    </div>
  )
}

export default Page
