module.exports = function(req, res) {
  const pageNo = parseInt(req.query.pageNo || 1)
  const pageSize = parseInt(req.query.pageSize || 10)

  return {
    "data": {
      "itemCount": pageSize * 10,
      "items": new Array(10).fill(undefined).map((item, index) => {
        const id = (pageNo - 1) * pageSize + index + 1
        return {
          "id": id,
          "name": "hadoop" + id,
          "ip": randomIP()
        }
      }),
      "pageNo": pageNo,
      "pageSize": pageSize,
      "startOffset": (pageNo - 1) * pageSize
    },
    "success": true
  }
}

function randomIP() {
  return [220, random(50, 250), random(50, 250), random(50, 250)].join('.')
}

function random(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}
