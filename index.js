const express = require("express");
const { json } = require("express");
const Sequelize = require("sequelize");
//const recipeRouter = require("./Routers/recipeRouter")

const PORT = 5000;

const sequel = new Sequelize("vijay", "postgres", "postgres", {
  HOST: "localhost",
  PORT: "5432",
  dialect: "postgres",
});

const db = {};
db.Sequelize = Sequelize;
db.sequel = sequel;

const app = express();
app.use(json());

const recipeData = db.sequel.define("recipes", {
  id: {
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    type: Sequelize.UUID,
  },
  // image: {
  //   allowNull: false,
  //   type: Sequelize.STRING,
  // },
  title: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  description: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  foodType: {
    allowNull: false,
    type: Sequelize.STRING,
    defaultValue: "",
    field: "food_type",
  },
  ingredient: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  stepToPrepare: {
    allowNull: false,
    type: Sequelize.STRING,
  },
});

const foo = async () => {
  try {
    await db.sequel.sync();
  } catch (err) {
    console.log(err);
  }
};
foo();

app.post("/post", async (req, res) => {
  try {
    const post = await recipeData.create({
      // id: req.body.id,
      // title: req.body.title,
      // description: req.body.description,
      // foodType: req.body.foodType,
      // ingredient: req.body.ingredient,
      // stepToPrepare: req.body.stepToPrepare,
      ...req.body,
    });
    return res.status(200).send(post);
  } catch (error) {
    console.log(error);
    return res.status(404).send(error);
  }
});

app.get("/get", async function (req, res) {
  try {
    const data = await recipeData.findAll({});
    return res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/getOne/:id", async function (req, res) {
  try {
    const data = await recipeData.findOne({ where: { id: req.params.id } });
    return res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.put("/update/:id", async function (req, res) {
  try {
    const data = await recipeData.update(req.body, {
      where: { id: req.params.id },
    });
    return res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete/:id", async function (req, res) {
  try {
    const data = await recipeData.destroy({ where: { id: req.params.id } });
    return res.send(`DOcument with has been deleted...`);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  else return console.log(`Backend running in ${PORT}`);
});
