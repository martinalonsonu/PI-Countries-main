const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('activity', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        duration: {
            type: DataTypes.INTEGER
        },
        season: {
            type: DataTypes.STRING,
            validate: {
                isIn: [["Spring", "Summer", "Fall", "Winter"]]
            }
        }
    }, {
        timestamps: false,
    })
}


