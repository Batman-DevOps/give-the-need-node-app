const allRoutes = require('express').Router();
const constants = require('../../constants/constants');

allRoutes.get('/', (req, res) => {
    res.json({
      message: constants.WELCOME_MSG
    });
})

const userRoutes = require('../../modules/users/user.routes');
const youthRoutes = require('../../modules/youth/youth.routes');
const tutorRoutes = require('../../modules/tutor/tutor.routes');
// const eventRoutes = require('../../modules/event/event.routes');
// const taskRoutes = require('../../modules/task/task.routes');
// const articleRoutes = require('../../modules/article/article.routes');
// const podcastRoutes = require('../../modules/podcast/podcast.routes');
// const questionAndAnswerRoutes = require('../../modules/question-and-answer/question-and-answer.routes');
// const stateRoutes = require('../../modules/state/state.routes');
// const districtRoutes = require('../../modules/district/district.routes');
// const schoolRoutes = require('../../modules/school/school.routes');
// const topicRoutes = require('../../modules/topic/topic.routes');
// const communicationRoutes = require('../../modules/communication/communication.routes');

allRoutes.use(userRoutes);
allRoutes.use(youthRoutes);
allRoutes.use(tutorRoutes);

module.exports = allRoutes;