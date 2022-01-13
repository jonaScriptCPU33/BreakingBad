const router = require("express").Router();
const { Character, Occupation } = require("../db");
const { getAllCharacters } = require("../controllers/index");

router.get("/characters", async (req, res) => {
  const name = req.query.name;

  let charactersTotal = await getAllCharacters();
  if (name) {
    let characterName = await charactersTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    characterName.length
      ? res.status(200).send(characterName)
      : res.status(404).send("The character does not exist");
  } else {
    res.status(200).send(charactersTotal);
  }
});

router.get("/characters/:id", async (req, res) => {
  const id = req.params.id;
  const charactersTotal = await getAllCharacters();

  if (id) {
    let characterId = await charactersTotal.filter((el) => el.id == id);
    characterId.length
      ? res.status(200).json(characterId)
      : res.status(404).send("Character not found");
  }
});

router.post("/character", async (req, res) => {
  let { name, nickname, birthday, image, status, createdInDb, occupation } =
    req.body;

  let [characterCreated, validator] = await Character.findOrCreate({
    where: { name: name },
    defaults: {
      name,
      nickname,
      birthday,
      image,
      status,
      createdInDb,
    },
  });

  let occupationDb = await Occupation.findAll({
    where: { name: occupation },
  });

  if (validator) {
    characterCreated.addOccupation(occupationDb);
    res.send("The character was created successfully!");
  } else {
    res.send("El caracter ya existe");
  }
});

module.exports = router;
