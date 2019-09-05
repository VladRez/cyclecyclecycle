const Map = require("../models/Map")
const Location = require("../models/Location")
const Route = require("../models/Route")

const createMap = async data => {
    // debugger
    try{
        let map = new Map(data, err=> {if (err) throw err})
        
        map.save()
        return map
    } catch(err) {
        if (err) throw(err)
    }

   
}

module.exports = {createMap}