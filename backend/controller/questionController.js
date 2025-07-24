const Question = require("../models/Question");
const Session = require("../models/Session");

//add question POST /api/questions/add private

exports.addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;
    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Invalid Input" });
    }
    const session = await Session.findById(sessionId);

    if (!session) return res.status(404).json({ message: "session not found" });

    //create new questions

    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    );
    console.log(session.questions);

    //update session to include new question IDs

    session.questions.push(...createdQuestions.map((q) => q._id));
    await session.save();
    res.status(201).json(createdQuestions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//pin & unpin POST /api/questions/:id/pin private

exports.togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question)
      return res.status(404).json({ message: "question not found" });
    question.isPinned = !question.isPinned;
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//update note for a ques POST /api/questions/:id/note private

exports.updateQuestionNote = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
