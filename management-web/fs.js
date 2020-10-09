// 读取改目录下最大的文件
const fs = require('fs')
const path = require('path')

function findLargest(dir, cb) {
    // 读取目录下的所有文件
    fs.readdir(dir, (er, files) => {
        if (er) return cb(er)

        let counter = files.length
        let errored = false
        const stats = []

        files.forEach((file, index) => {
            console.log(index, 111111)
            // 读取文件信息
            fs.stat(path.join(dir, file), (er, stat) => {
                console.log(index, 222222)
                if (errored) return

                if (er) {
                    errored = true
                    return cb(er)
                }

                stats[index] = stat

                // 事先算好有多少个文件，读完 1 个文件信息，计数减 1，当为 0 时，说明读取完毕，此时执行最终的比较操作
                if (--counter == 0) {
                    const largest = stats
                        .filter(stat => {
                            return stat.isFile()
                        })
                        .reduce((prev, next) => {
                            if (prev.size > next.size) return prev
                            return next
                        })
                    cb(null, files[stats.indexOf(largest)])
                }
            })
        })
    })
}

// 查找当前目录最大的文件
findLargest('./', function(er, filename) {
    if (er) return console.error(er)
    console.log('largest file was:', filename)
})
