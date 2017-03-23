module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING,
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Role.hasMany(models.User, {
          foreignKey: 'roleId',
          as: 'users'
        })
      }
    }
  });
  return Role;
};
