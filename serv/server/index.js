//ทำการ import http เข้ามาเพื่อ run server
const http = require('http');

//กำหนด host และ port เริ่มต้น ว่าจะรันที่ไหน
const host = 'localhost'
const port = 8000 // localhost:8000

//กำหนดค่าเริ่มต้นของ server เมื่อเปิดหน้าเว็บที่ localhost:8000 ขึ้นมา
const requestListener = function (req, res) {
    res.writeHand(200)
    res.end("My First Server!")
}

//ทำการ run server
const server = http.createServer(requestListener)
server.listen(port, host, () => {
    console.log(`server is running on http://${host}:${port}`)
})