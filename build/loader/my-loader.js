module.exports = function (src) {
  console.log('-----------------start------------------------')
  console.log(this.request)
  console.log(this.target)
  console.log(this.webpack)
  console.log(this.resource)
  console.log(this.resourcePath)
  // if (this.request.indexOf('type=template') > -1) {
  //   console.log(src)
  // }
  // console.log(this.loaderIndex)
  console.log(src)
  console.log('-----------------end------------------------')
  return src
}
