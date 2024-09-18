const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const accumulator = (sum, blog) => {
    return sum + Number(blog['likes'])
  }
  return blogs.reduce(accumulator, 0)
}

const favoriteBlog = (blogs) => {
  let mostLikes = 0
  let favoriteIdx = null

  for (let i=0; i<blogs.length; i++){
    if (blogs[i]['likes'] >= mostLikes){
      mostLikes = blogs[i]['likes']
      favoriteIdx = i
    }
  }

  return blogs.length === 0
    ? 'No blogs to review'
    :  {
      'title': blogs[favoriteIdx]['title'],
      'author': blogs[favoriteIdx]['author'],
      'likes': blogs[favoriteIdx]['likes']
    }
}

const mostBlogs = (blogs) => {
  const aggregatedPosts = blogs.reduce((acc, { author }) => {
    if (!acc[author]){
      acc[author] = 0
    }
    acc[author] += 1
    return acc
  }, {})

  const authorWithMostBlogs = Object.entries(aggregatedPosts).reduce(
    ([maxAuthor, maxCount], [author, count]) => {
      if (count > maxCount) {
        return [author, count]
      }
      return [maxAuthor, maxCount]
    }, ['', 0]
  )

  return blogs.length === 0
    ? 'No blogs to review'
    : { author: authorWithMostBlogs[0], blogs: authorWithMostBlogs[1] }
}

const mostLikes = (blogs) => {
  const aggregatedLikes = blogs.reduce((acc, curr) => {
    if(!acc[curr.author]) {
      acc[curr.author] = 0
    }
    acc[curr.author] += curr.likes
    return acc
  }, {})

  const authorWithMostLikes = Object.entries(aggregatedLikes).reduce(
    ([maxAuthor, maxCount], [author, count]) => {
      if (count >= maxCount) {
        return [author, count]
      }
      return [maxAuthor, maxCount]
    }, ['', 0]
  )

  return blogs.length === 0
    ? 'No blogs to review'
    :  { author: authorWithMostLikes[0], likes: authorWithMostLikes[1] }
}

const uniqueBlogIds = (blogs) => {
  const aggregatedBlogIds = blogs.reduce((acc, curr) => {
    if(!acc[curr.id]){
      acc[curr.id] = 0
    }
    acc[curr.id] += 1
    return acc
  }, {})

  const maxBlogIds = Object.entries(aggregatedBlogIds).reduce(
    ([maxId, maxCount], [id, count]) => {
      if(count >= maxCount){
        return [id, count]
      }
      return[maxId, maxCount]
    }, ['', 0]
  )
  return maxBlogIds[1] > 1
    ? 'some blogs have the same id'
    : 'every blog has a unique id'
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  uniqueBlogIds,
}

