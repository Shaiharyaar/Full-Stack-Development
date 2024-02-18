import React, { forwardRef, useImperativeHandle, useState } from 'react'

const BlogTogglable = forwardRef(({ label, ...props }, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <>
      <div style={hideWhenVisible}>
        <div>
          {label} <button onClick={toggleVisibility}>{'view'}</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div>
          {label} <button onClick={toggleVisibility}>{'hide'}</button>
        </div>
        {props.children}
      </div>
    </>
  )
})

BlogTogglable.displayName = 'BlogTogglable'

export default BlogTogglable
