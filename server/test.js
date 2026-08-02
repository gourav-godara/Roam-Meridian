require("dotenv").config();

const {
  getDestinationImages,
} = require("./src/services/pexels.service");

(async () => {
  const images = await getDestinationImages("Manali India");

  console.log(images);
})();