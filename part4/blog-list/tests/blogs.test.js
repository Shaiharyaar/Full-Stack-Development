const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

describe('blogs tests', () => {
  describe('total likes', () => {
    test('of empty list is zero', () => {
      const result = listHelper.totalLikes(testHelper.emptyList)
      expect(result).toBe(0)
    })
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(testHelper.listWithOneBlog)
      expect(result).toBe(7)
    })
    test('of a bigger list is calculated right', () => {
      const result = listHelper.totalLikes(testHelper.blogs)
      expect(result).toBe(36)
    })
  })
  describe('favorite blog', () => {
    test('blog with most likes', () => {
      const result = listHelper.favoriteBlog(testHelper.blogs)
      expect(result).toEqual({
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12,
      })
    })
    test('author with most blogs', () => {
      const result = listHelper.mostBlogs(testHelper.blogs)
      expect(result).toEqual({
        author: 'Robert C. Martin',
        blogs: 3,
      })
    })
    test('author with most likes', () => {
      const result = listHelper.mostLikes(testHelper.blogs)
      expect(result).toEqual({
        author: 'Edsger W. Dijkstra',
        likes: 17,
      })
    })
  })
})
