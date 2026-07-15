const plannerService = require("../services/planner.service");

async function sendMessage(req, res, next) {
  try {
    const { conversationId, message } = req.body;
    if (!message) {
      return res
        .status(400)
        .json({ success: false, message: "message is required." });
    }
    const conversation = await plannerService.sendMessage(req.user.id, {
      conversationId,
      message,
    });
    res.status(200).json({ success: true, data: conversation });
  } catch (err) {
    next(err);
  }
}

async function getActiveConversation(req, res, next) {
  try {
    const conversation = await plannerService.getActiveConversation(
      req.user.id,
    );
    res.status(200).json({ success: true, data: conversation });
  } catch (err) {
    next(err);
  }
}

async function regenerateConversation(req, res, next) {
  try {
    const { scope, dayNumber } = req.body;
    if (!scope || (scope === "day" && !dayNumber)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "scope is required (and dayNumber when scope is 'day').",
        });
    }
    const conversation = await plannerService.regenerateConversation(
      req.user.id,
      req.params.id,
      { scope, dayNumber },
    );
    res.status(200).json({ success: true, data: conversation });
  } catch (err) {
    next(err);
  }
}

async function generate(req, res, next) {
  try {
    const { destination, days, budget, travelers, travelStyle } = req.body;
    if (!destination || !days || !budget) {
      return res
        .status(400)
        .json({
          success: false,
          message: "destination, days, and budget are required.",
        });
    }

    const message = `Plan a ${days}-day trip to ${destination} for ${travelers || 1} traveler(s) with a budget of ₹${budget}. Travel style: ${travelStyle || "Balanced"}.`;
    const conversation = await plannerService.sendMessage(req.user.id, {
      message,
    });
    res.status(201).json({ success: true, data: conversation });
  } catch (err) {
    next(err);
  }
}

async function regenerateDay(req, res, next) {
  try {
    const { dayNumber } = req.body;
    if (!dayNumber) {
      return res
        .status(400)
        .json({ success: false, message: "dayNumber is required." });
    }
    const conversation = await plannerService.getActiveConversation(
      req.user.id,
    );
    if (!conversation) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No active conversation to regenerate.",
        });
    }
    const updated = await plannerService.regenerateConversation(
      req.user.id,
      conversation._id,
      {
        scope: "day",
        dayNumber: Number(dayNumber),
      },
    );
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Saved plan functionality — UNCHANGED from before this phase.
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
    const plans = await plannerService.getHistory(req.user.id, {
      search: req.query.search,
    });
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
    const plan = await plannerService.updatePlan(
      req.user.id,
      req.params.id,
      req.body,
    );
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

module.exports = {
  sendMessage,
  getActiveConversation,
  regenerateConversation,
  generate,
  regenerateDay,
  save,
  duplicate,
  history,
  getOne,
  update,
  remove,
  favorite,
};
