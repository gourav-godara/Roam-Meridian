const plannerService = require("../services/planner.service");

async function generate(req, res, next) {
  try {
    const { destination, days, budget, travelers, travelStyle, preferences, mustVisitPlaces, foodPreference, transport, accommodation } = req.body;

    if (!destination || !days || !budget) {
      return res.status(400).json({ success: false, message: "destination, days, and budget are required." });
    }

    const plan = await plannerService.generatePlan(req.user.id, {
      destination,
      days: Number(days),
      budget: Number(budget),
      travelers: Number(travelers) || 1,
      travelStyle,
      preferences,
      mustVisitPlaces,
      foodPreference,
      transport,
      accommodation,
    });

    res.status(201).json({ success: true, data: plan });
  } catch (err) {
    next(err);
  }
}

async function regenerateDay(req, res, next) {
  try {
    const { dayNumber } = req.body;
    if (!dayNumber) {
      return res.status(400).json({ success: false, message: "dayNumber is required." });
    }
    const plan = await plannerService.regenerateDay(req.user.id, req.params.id, Number(dayNumber));
    res.status(200).json({ success: true, data: plan });
  } catch (err) {
    next(err);
  }
}

async function save(req, res, next) {
  try {
    const plan = await plannerService.savePlan(req.user.id, req.params.id);
    res.status(200).json({ success: true, data: plan });
  } catch (err) {
    next(err);
  }
}

async function duplicate(req, res, next) {
  try {
    const plan = await plannerService.duplicatePlan(req.user.id, req.params.id);
    res.status(201).json({ success: true, data: plan });
  } catch (err) {
    next(err);
  }
}

async function history(req, res, next) {
  try {
    const plans = await plannerService.getHistory(req.user.id, { search: req.query.search });
    res.status(200).json({ success: true, data: plans });
  } catch (err) {
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const plan = await plannerService.getPlanById(req.user.id, req.params.id);
    res.status(200).json({ success: true, data: plan });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const plan = await plannerService.updatePlan(req.user.id, req.params.id, req.body);
    res.status(200).json({ success: true, data: plan });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await plannerService.deletePlan(req.user.id, req.params.id);
    res.status(200).json({ success: true, message: "Plan deleted." });
  } catch (err) {
    next(err);
  }
}

async function favorite(req, res, next) {
  try {
    const plan = await plannerService.favoritePlan(req.user.id, req.params.id);
    res.status(200).json({ success: true, data: plan });
  } catch (err) {
    next(err);
  }
}

module.exports = { generate, regenerateDay, save, duplicate, history, getOne, update, remove, favorite };
