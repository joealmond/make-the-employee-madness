const { findOneAndDelete } = require("./db/employee.model");

app.get("path", async (req, res, next) => {
  try {
    const response = await Modell.find().sort();
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("path/:id", async (req, res, next) => {
  try {
    const deltetd = Modell.findOneAndDelete({ _id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ message: "Document not found" });
    }
    return res.json(deltetd);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("path", async (req, res, next) => {
  try {
    const created = await Modell.create(req.body);
    return res.json(created);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.patch("path/:id", async (req, res, next) => {
  try {
    const updated = await Modell.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/path/:id", async (req, res, next) => {
  try {
    const updated = await Modell.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true, omitUndefined: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/path/:id", async (req, res, next) => {
  const selected = await Modell.findById(req.params.id)
  const modified = {...selected, ...req.body}
  try {
    const updated = await Modell.findOneAndUpdate(
      { _id: req.params.id },
      { $set: modified },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});


app.get("path", async (req, res, next) => {
  try {
    const sortParam = req.query.sort;
    const sort = sortParam ? { [sortParam]: 1 } : {};

    const response = await Modell.find().sort(sort);
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});