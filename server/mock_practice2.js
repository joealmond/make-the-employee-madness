

app.get("/path/", async (req, res) => {
    const data = await Model.find();
    return res.json(data)
})

app.post("/path/", async (req, res) => {
    const created = await Model.create(req.body);
    return res.json(created)
})

app.delete("/path/:id", async (req, res) => {
    const deleted = await Model.deleteOne({ _id: req.params.id })
    return res.json(deleted)
})

app.patch("/path/:id", async (req, res) => {
    const updated = await Model.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
    )
    return res.json(updated)
})

app.put("/path/:id", async (req, res) => {
    const updated = await Model.findOneAndReplace(
        { _id: req.params.id },
        { req.body },
        { returnDocument: 'after' }
    )
    return res.json(updated)
})

// Query: path/?start=a
app.get("/path/", async (req, res) => {
    const data = await Model.find({ name: req.query.start });
    return res.json(data)
})