import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import { addNewPost } from '../../redux/posts/postsSlice'
import { selectAllUsers } from '../../redux/users/usersSlice'

import './addPostForm.style.css'

const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewPost({ title, content, user: userId })
        )
        unwrapResult(resultAction)
        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const usersOptions = users.map(({ id, name }) => (
    <option key={id} value={id}>
      {name}
    </option>
  ))

  return (
    <section className="post_add">
      <h2>Add a New Post</h2>
      <form className="post_add-form">
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
          className="post_add-form--input"
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          value={userId}
          id="postAuthor"
          onChange={onAuthorChanged}
          className="post_add-form--input"
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          name="postContent"
          id="postContent"
          value={content}
          onChange={onContentChanged}
          className="post_add-form--input"
        />
        <button
          type="button"
          onClick={onSavePostClicked}
          disabled={!canSave}
          className="button post_add-form--button"
        >
          Save Post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
