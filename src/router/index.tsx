import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import Auth from "../pages/auth";
import Posts from "../pages/posts";
import CurrentPost from "../pages/current-post";
import UserProfile from "../pages/user-profile";
import Followers from "../pages/followers";
import Following from "../pages/following";

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Posts />
      },
      {
        path: 'posts/:id',
        element: <CurrentPost />
      },
      {
        path: 'users/:id',
        element: <UserProfile />
      },
      {
        path: 'followers',
        element: <Followers />
      },
      {
        path: 'following',
        element: <Following />
      }
    ]
  }
])