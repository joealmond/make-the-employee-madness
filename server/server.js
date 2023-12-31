require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");

mongoose.set('strictQuery', true);

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: "desc" });
  return res.json(employees);
});

app.get("/api/employees/:id", async (req, res) => {
  const employees = await EmployeeModel.findById(req.params.id);
  return res.json(employees);
});

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (error) {
    return next(error);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  const employee = req.body;

  try {
    const modified = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(modified);
  } catch (error) {
    return next(error);
  }
});

// works in mongoos 7 and above

// app.delete("/api/employees/:id", async (req, res, next) => {
//   try {
//     const deleted = await EmployeeModel.deleteOne({ _id: req.params.id });
//     return res.json(deleted);
//   } catch (err) {
//     return next(err);
//   }
// });

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}.`);
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
