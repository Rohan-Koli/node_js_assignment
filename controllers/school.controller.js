const {School} = require("../models")

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  
const getSchools = async (req, res) => {
    try {
      const { latitude, longitude } = req.body;
  
      if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Latitude and Longitude are required in query' });
      }
  
      const userLat = parseFloat(latitude);
      const userLng = parseFloat(longitude);
  
      const schools = await School.findAll({ raw: true });
  
      const sortedData = schools
        .map((school) => {
          const distance = getDistanceFromLatLonInKm(
            userLat,
            userLng,
            school.latitude,
            school.longitude
          );
          return { ...school, distance: distance.toFixed(2) }; // optional: round to 2 decimals
        })
        .sort((a, b) => a.distance - b.distance);
  
      res.status(200).json({ data: sortedData });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }

  const addSchool = async(req,res)=>{
    try {
        const {latitude,longitude,name,address} = req.body
        const newSchool = {latitude,longitude,name,address}
        const data = await School.create(newSchool)
        res.status(200).json({ message:"new School added",data });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

  module.exports = {getSchools,addSchool}