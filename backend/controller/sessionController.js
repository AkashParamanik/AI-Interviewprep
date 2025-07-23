const Session = require("../models/Session");
const Question = require("../models/Question");

//create a new session POST /api/sessions/create private
exports.createSession = async (req, res) => {
  try {
    const { role, topicsToFocus, experience, description, questions } =
      req.body;

    const userId = req.user._id;

    const session = await Session.create({
      user: userId,
      description,
      topicsToFocus,
      experience,
      role,
    });
    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return question._id;
      })
    );
    session.questions = questionDocs;
    await session.save();
    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//get all session by login user GET /api/sessions/my-session
exports.getMySession = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("questions");
    // const sessions = await Session.find().limit(5);
    // console.log("All sessions:", sessions);

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//get a session by ID with questions GET /api/sessions/:id
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: 1 } },
      })
      .exec();
    if (!session)
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });

    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//delete a session by ID with questions DELETE /api/sessions/:id
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    if (session.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "not authorized to delete the session" });
    }
    await Question.deleteMany({ session: session._id });

    await session.deleteOne();
    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
