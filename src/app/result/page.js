'use client'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'

const CopyToClipboardButton = ({ content }) => {
  const textAreaRef = useRef(null)
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    textAreaRef.current.select()
    document.execCommand('copy')
    setIsCopied(true)

    // Reset the "Copied" state after a short delay
    setTimeout(() => {
      setIsCopied(false)
    }, 1500)
  }

  return (
    <div className="flex items-center">
      <textarea
        ref={textAreaRef}
        value={content}
        style={{ position: 'absolute', left: '-9999px' }}
        readOnly
      />
      <button
        onClick={handleCopy}
        className="bg-blue-500 text-sm text-white px-3 py-2 rounded-md focus:outline-none"
      >
        {isCopied ? 'Copied!' : 'Copy to Content'}
      </button>
    </div>
  )
}

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
      <div className="custom-border p-4">
        <div className="flex justify-between items-center gap-5">
          <Link
            href="/"
            className="bg-blue-500 text-sm text-white px-3 py-2 rounded-md focus:outline-none"
          >
            Go Back
          </Link>
          <CopyToClipboardButton content={JSON.stringify(storedObject)} />
        </div>
        <div className="mt-4">{storedObject}</div>
      </div>
    </div>
  )
}

export default Page
