import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, NavLink } from 'react-router-dom'

import PostAuthor from '../post-author/postAuthor.component'
import ReactionButtons from '../reaction-buttons/reactionButtons.component'
import { TimeAgo } from '../time-ago/timeAgo.component'
import { selectPostById } from '../../redux/posts/postsSlice'

const SinglePostPage = () => {
  const { postId } = useParams()

  const post = useSelector((state) => selectPostById(state, postId))

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <NavLink to={`/editPost/${post.id}`} className="button muted-button">
          Edit Post
        </NavLink>
      </article>
    </section>
  )
}

export default SinglePostPage
