import React, { memo } from 'react'
import { Editor } from '@tinymce/tinymce-react'

const MarkdownEditor = ({ label, value, changeValue, name, invalidFields, setInvalidFields }) => {


    return (
        <div className='flex flex-col'>
            <span className=''>{label}</span>
            <Editor
                apiKey='fl9099t4a5kd8yeo5pxp6183pssl8101qxg3p95josdeb8r3'
                initialValue={value}
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists',
                        'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',

                    ],
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | align lineheight | numlist bullist indent outdent',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif font-size:14px }'
                }}
                onChange={e => changeValue(prev => ({ ...prev, [name]: e.target.getContent() }))}
                onFocus={() => {
                    setInvalidFields && setInvalidFields([])
                }}
            />
            {invalidFields?.some(el => el.name === name) && <small className='mt-4 text-red-600 italic'>{invalidFields?.find(el => el.name === name)?.mes}</small>}
        </div>
    )
}

export default memo(MarkdownEditor)