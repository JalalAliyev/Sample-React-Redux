import React from 'react'
import { NavLink } from 'react-router-dom'
import PostAuthor from '../post-author/postAuthor.component'
import ReactionButtons from '../reaction-buttons/reactionButtons.component'
import { TimeAgo } from '../time-ago/timeAgo.component'
import { selectPostById } from '../../redux/posts/postsSlice'
import { useSelector } from 'react-redux'

const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId))

  return (
    <article key={post.id} className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <NavLink to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </NavLink>
    </article>
  )
}
//===

export default PostExcerpt
