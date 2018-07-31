
module.exports = function(req, res) {
  const id = parseInt(req.query.id)

  return {
    "data": {
      "id": id,
      "name": "hadoop" + id,
      "ip": "123.207.220.181"
    },
    "success": true
  }
}
