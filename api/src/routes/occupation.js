const { Router } = require("express");
const { Character, Occupation } = require ('../db')
const axios = require("axios");
const controllers = require('../controllers/index')

const router = Router();


router.get("/occupations", async (req, res) => {
    const occupationsApi = await axios.get("https://breakingbadapi.com/api/characters");
    
    const occupations = occupationsApi.data.map(el => el.occupation);
    const occEach = occupations.map(el => {
        for (let i = 0; i< el.length; i++) return el[i]
        // console.log(occEach);
    });
    
    occEach.forEach(el => {
        Occupation.findOrCreate({
            where: { name: el }
        });
    });

    const allOccupations = await Occupation.findAll();
    res.send(allOccupations);
});


module.exports = router;