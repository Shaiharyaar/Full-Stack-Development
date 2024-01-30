const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const sumOfLikes = blogs.reduce((acc, b) => {
    return acc + b.likes
  }, 0)

  return sumOfLikes
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes)
  const maxLike = Math.max(...likes)
  const favBlog = blogs.find((blog) => blog.likes === maxLike)
  return {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes,
  }
}

const mostBlogs = (blogs) => {
  const arr = blogs.map((blog) => blog.author)

  const numbers = arr.reduce((acc, obj) => {
    acc[obj] ??= 0
    acc[obj]++
    return acc
  }, {})

  const numberArr = Object.values(numbers)
  const max = Math.max(...numberArr)

  var getValue = []

  for (const property in numbers) {
    if (numbers[property] === max) {
      getValue.push({ author: property, blogs: numbers[property] })
    }
  }

  const maxIndex = numberArr.indexOf(max)
  const mostBlogsData = {
    author: Object.keys(numbers)[maxIndex],
    blogs: Object.values(numbers)[maxIndex],
  }

  return mostBlogsData
}
const mostLikes = (blogs) => {
  const arr = blogs.map((blog) => ({ author: blog.author, likes: blog.likes }))

  const numbers = arr.reduce((acc, obj) => {
    acc[obj.author] ??= 0
    acc[obj.author] += obj.likes
    return acc
  }, {})

  const numberArr = Object.values(numbers)
  const max = Math.max(...numberArr)

  var getValue = []

  for (const property in numbers) {
    if (numbers[property] === max) {
      getValue.push({ author: property, likes: numbers[property] })
    }
  }

  const maxIndex = numberArr.indexOf(max)

  const mostLikesData = {
    author: Object.keys(numbers)[maxIndex],
    likes: Object.values(numbers)[maxIndex],
  }

  return mostLikesData
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
