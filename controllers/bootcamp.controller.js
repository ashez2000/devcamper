exports.getBootcamps = (req, res, next) => {
    res.status(200).json({success: true, message: "bootcamps"}) 
}

exports.getBootcamp = (req, res, next) => {
    res.status(200).json({success: true, message: "bootcamp"}) 
}

exports.createBootcamp = (req, res, next) => {
    res.status(200).json({success: true, message: "bootcamp created"}) 
}

exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({success: true, message: "bootcamp  updated"}) 
}

exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({success: true, message: "bootcamp deleted"}) 
}