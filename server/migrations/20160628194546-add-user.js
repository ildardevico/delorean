module.exports = {
  up: (queryInterface, DataTypes, done) => {
    queryInterface
      .createTable('Users', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        email: DataTypes.STRING,
        name: DataTypes.STRING,
        hash: DataTypes.TEXT,
        salt: DataTypes.TEXT,
        signupToken: DataTypes.STRING,
        emailVerified: DataTypes.BOOLEAN,
        resetToken: DataTypes.STRING,
        resetTokenExpires: DataTypes.DATE
      })
      .then(() => done());
  },
  down: queryInterface => queryInterface.dropTable('Users')
};
