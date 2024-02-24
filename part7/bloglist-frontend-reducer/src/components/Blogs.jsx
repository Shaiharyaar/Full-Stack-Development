import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../context/Notification'
import blogService from '../services/blogs'
import Blog from './Blog'
import { getBlogs, updateBlog } from '../requests/blogs'
const Blogs = ({ user }) => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const blogs = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    retry: false
  })

  const updateBlogMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: newBlog => {
      console.log({ newBlog })
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: `You liked blog "${newBlog.title} by ${newBlog.author}"`,
          color: 'green'
        }
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 3000)
    },
    onError: res => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { message: res.response.data.error, color: 'red' }
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 3000)
    }
  })
  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: res => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { message: res.response.data.error, color: 'red' }
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 3000)
    }
  })

  const onLikePress = blog => async () => {
    try {
      const payload = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes + 1,
        url: blog.url,
        user: blog.user.id
      }
      updateBlogMutation.mutate({ id: blog.id, ...payload })
    } catch (error) {
      console.log({ error: error.message })
    }
  }

  const onRemovePress = blog => async () => {
    try {
      if (blog.user.username === user?.username) {
        const isConfirm = window.confirm(
          `Remove blog ${blog.title} by ${blog.author}`
        )
        if (isConfirm) {
          removeBlogMutation.mutate(blog.id)
        }
      } else {
        alert('You cannot update/delete this blog')
      }
    } catch (error) {
      console.log({ error: error.message })
    }
  }
  return (
    <>
      {blogs?.data &&
        [...blogs.data]
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <div key={blog.id}>
              <Blog
                blog={blog}
                user={user}
                onLikePress={onLikePress(blog)}
                onRemovePress={onRemovePress(blog)}
              />
            </div>
          ))}
    </>
  )
}

export default Blogs
