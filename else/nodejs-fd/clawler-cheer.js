var http = require('http')
var cheerio = require('cheerio')
var url = 'http://www.jon23.top/'

function filterChpters(html) {
  var $ = cheerio.load(html)
  var articles = $('.fusion-post-medium')

  var blogData = []

  articles.each(function(item) {
    var article = $(this)
    var articleTitle = article.find('.entry-title a').text()
    var auther = article.find('.fn a').text()
    var articleData = {
      articleTitle: articleTitle,
      auther: auther
    }
    blogData.push(articleData)
  })
  return  blogData

}
function printBlogInfo(blogData) {
  blogData.forEach(function(item) {
    var articleTitle = item.articleTitle
    var auther = item.auther
    console.log(auther + '发布了' + articleTitle)

  })
}

http.get(url, function(res) {
  var html = ''
  res.on('data', function(data) {
    html += data
  })
  res.on('end', function() {
    var blogData = filterChpters(html)
    printBlogInfo(blogData)
  })
}).on('error', function() {
  console.log('获取数据失败')
})
