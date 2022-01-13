const { Router } = require("express");

const characterRoutes = require("./character");
const occupationRoutes = require("./occupation");

const router = Router();

/* Middleware's */
router.use(characterRoutes);
router.use(occupationRoutes);


module.exports = router;


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

 /* const getApiInfo = async () => {
    const apiUrl = await axios.get("https://breakingbadapi.com/api/characters");
    
    const apiInfo = await apiUrl.data.map((el) => {
        return {
            id: el.char_id,
            name: el.name,
            birthday: el.birthday,
            img: el.img,
            nickname: el.nickname,
            status: el.status,
            occupation: el.occupation.map((el) => el),
            appearance: el.appearance.map((el) => el),
        };
    });

  return apiInfo;
};


const getDbInfo = async () => {
    return await Character.findAll({
        include: {
            model: Occupation,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
};


const getAllCharacters = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}; 


router.get("/characters", async (req, res) => {
    const name = req.query.name;

    let charactersTotal = await getAllCharacters();
    if (name) {
        let characterName = await charactersTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        characterName.length ? res.status(200).send(characterName) : res.status(404).send("The character does not exist");
    } else {
        res.status(200).send(charactersTotal);
    };
}); 


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


router.post("/character", async (req, res) => {
    let {
        name,
        nickname,
        birthday,
        image,
        status,
        createdInDb,
        occupation
    } = req.body

    let characterCreated = await Character.create({
        name,
        nickname,
        birthday,
        image,
        status,
        createdInDb,
    });

    let occupationDb = await Occupation.findAll({
        where: { name: occupation }
    });

    characterCreated.addOccupation(occupationDb);
    res.send("The character was created successfully!")
});


router.get("/characters/:id", async (req, res) => {
    const id = req.params.id;
    const charactersTotal = await getAllCharacters()
    
    if (id) {
        let characterId = await charactersTotal.filter(el => el.id == id)
        characterId.length ? res.status(200).json(characterId) : res.status(404).send("Character not found")
    }
}); 
 */ 

