module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define('task', {
        title: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.TEXT,
        },
        startDate: {
            type: Sequelize.DATEONLY,
        },
        dueDate: {
            type: Sequelize.DATEONLY,
        },
        completeDate: {
            type: Sequelize.DATEONLY,
        },
        createdBy: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.STRING,
        },
    });
    return Task;
}
