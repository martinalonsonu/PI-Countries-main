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
            type: DataTypes.STRING
        },
        season: {
            type: DataTypes.STRING,
            validate: {
                isIn: [["Verano", "Otoño", "Invierno", "Primavera"]]
            }
        }
    }, {
        timestamps: false,
    })
}


