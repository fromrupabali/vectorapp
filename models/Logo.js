const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
     const Logo = sequelize.define(
       "Logo",
       {
         id: {
           type: DataTypes.INTEGER,
           primaryKey: true,
           autoIncrement: true
         },
         title: {
           type: DataTypes.STRING,
           required: true
         },
         userId: {
           type: DataTypes.INTEGER,
           required: true
         },
         vectorData: {
           type: DataTypes.STRING,
           required: true
         },
         URL: {
           type: DataTypes.STRING,
           required: true
         },
         createdAt: {
           type: DataTypes.DATE,
           defaultValue: Sequelize.NOW
         },
         updatedAt: {
           type: DataTypes.DATE,
           defaultValue: Sequelize.NOW
         }
       },
       {}
     );
     Logo.associate = function(models) {
       Logo.belongsTo(models.User);
     }; 

     return Logo;
}
