/**
 * List handler for reservation resources
 */
const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
  const date = req.query.date
  const data = date ? await service.listDate(date) : await service.list()
  res.json({ data })
}

async function create(req, res) {
  const reservation = { ...req.body }
  console.log(reservation)
  const data = await service.create(reservation)
  res.json({ data })
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [asyncErrorBoundary(create)],
}
