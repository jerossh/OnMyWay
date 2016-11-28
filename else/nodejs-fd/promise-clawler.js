var http = require('http')
var cheerio = require('cheerio')
var Promise = require('bluebird')
var baseurl = 'http://www.imooc.com/learn/'
var VideoIds = [637, 348, 259, 197, 134, 75]

// 爬取针对的内容
function filterChpters(html) {
  // 引用方式
  var $ = cheerio.load(html)
  var chapters = $('.chapter')
  var title = $('.course-infos h2').text()
  var number = parseInt($($('.static-item')[2]).find('strong').text(), 10)

  // courseData = {
  //   title: title
  // }
  var courseData = {
    title: title,
    number: number,
    chapters: []
  }

  chapters.each(function(item) {
    var chapter = $(this)
    var chapterTitle = chapter.find('strong').text()
    var videos = chapter.find('.video').children('li')
    var chapterData = {
      chapterTitle: chapterTitle,
      videos: []
    }
    videos.each(function(item) {
      var video = $(this).find('.studyvideo')
      var videoTitle = video.text().trim()
      var id = video.attr('href').split('video/')[1]

      chapterData.videos.push({
        videoTitle: videoTitle,
        id: id
      })
    })
    courseData.chapters.push(chapterData)
  })
  return  courseData

}

// 打印爬取的内容
function printCourseInfo(coursesData) {
  coursesData.forEach(function(courseData) {
    console.log(courseData.number + '人学过' + courseData.title + '\n')
  })

  coursesData.forEach(function(courseData) {
    console.log('###' + courseData.title + '\n')
    courseData.chapters.forEach(function(chapter) {
      var chapterTitle = chapter.chapterTitle

      console.log(chapterTitle + '\n')

      chapter.videos.forEach(function(video) {
        console.log( '［' + video.id + '］' + video.videoTitle + '\n');
      })
    })
  })
}

// 新建promise过程
function getPagesAsync(url) {
 return new Promise(function(resolve,reject) {
   console.log('正在爬取' + url)

   http.get(url, function(res) {
     var html = ''
     res.on('data', function(data) {
       html += data
     })
     res.on('end', function() {
       resolve(html)    //html 传递下去
     })
   }).on('error', function() {
     reject(e)    //返回错误信息
     console.log('获取数据失败')
   })
 })
}


var fetchCourseArray = []
// 怎么获取这个VideoIds, scott老师个人主页面所有课程页面的id
VideoIds.forEach(function(id) {   // VideoIds 是上面的编号
fetchCourseArray.push(getPagesAsync(baseurl + id))  //这里获取了多个网址
})

// 这里是执行过程
Promise.all(fetchCourseArray)      //多个promise
  .then(function(pages) {
  var coursesData = []

  pages.forEach(function(html) {
    // 每一个课程进行遍历
    var course = filterChpters(html)
    coursesData.push(course)
  })

  coursesData.sort(function(a, b) {
    return a.number < b.number
  })
  printCourseInfo(coursesData)
})
