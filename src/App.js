import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Navbar from './components/navbar/Navbar'

import PostsList from './components/posts-list/posts-list.component'
import AddPostForm from './components/addPost-form/addPostForm.component'
import EditPost from './components/editPost-form/editPost.component'
import SinglePostPage from './components/singlePost-page/singlePostPage.component'
import UsersList from './components/users-list/usersList.component'
import UserPage from './components/user-page/userPage.component'
import NotificationsList from './components/notifications-list/notificationsList.component'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <AddPostForm />
                <PostsList />
              </React.Fragment>
            )}
          />
          <Route exact path="/posts/:postId" component={SinglePostPage} />
          <Route exact path="/editPost/:postId" component={EditPost} />
          <Route exact path="/users" component={UsersList} />
          <Route exact path="/users/:userId" component={UserPage} />
          <Route exact path="/notifications" component={NotificationsList} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
