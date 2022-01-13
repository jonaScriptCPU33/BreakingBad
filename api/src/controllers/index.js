const axios = require("axios");
const { API } = process.env;
const { Character, Occupation } = require('../db')


async function getApiInfo() {
  const apiUrl = await axios.get(`${API}`);

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
}

async function getDbInfo() {
  return await Character.findAll({
    include: {
      model: Occupation,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
}

async function getAllCharacters() {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
}
console.log(getAllCharacters)
module.exports = {
  getDbInfo,
  getApiInfo,
  getAllCharacters,
};
