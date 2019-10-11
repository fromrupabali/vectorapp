const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
     const shop = sequelize.define(
       "logo",
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
     logo.associate = function(models) {
       logo.belongsTo(models.user);
     }; 

     return logo;
}
