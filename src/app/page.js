'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { useRouter } from 'next/navigation'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const ContentForm = () => {
  const router = useRouter()
  const [content, setContent] = useState([])
  const handleChange = (value) => {
    setContent(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Store the value in localStorage
    window.localStorage.setItem('myData', JSON.stringify(content))
    router.push('/result')
  }

  return (
    <form onSubmit={handleSubmit} className="w-11/12 m-auto p-10 h-screen">
      <div className="mb-4">
        <label
          htmlFor="editor"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Editor:
        </label>
        <ReactQuill
          id="editor"
          value={content}
          onChange={handleChange}
          placeholder="Write something..."
          className="bg-white p-4 rounded-md border border-gray-300 w-11/12"
          modules={{
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ header: 1 }, { header: 2 }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ direction: 'rtl' }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ['clean'],
            ],
          }}
          formats={[
            'header',
            'font',
            'size',
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
            'list',
            'bullet',
            'script',
            'indent',
            'color',
            'background',
            'align',
            'clean',
          ]}
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default ContentForm
