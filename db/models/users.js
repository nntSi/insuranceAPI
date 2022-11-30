module.exports = ( sequelize , Sequelize ) => {
  const users = sequelize.define(
    'users',
    {
        id: { type: Sequelize.INTEGER(11), primaryKey: true, autoIncrement: true, field: 'id' },
        username: { type: Sequelize.STRING(255), allowNull: false, field: 'username' },
        password: { type: Sequelize.STRING(255), allowNull: false, field: 'password' },
        title: { type: Sequelize.STRING(50), allowNull: false, field: 'title' },
        firstname: { type: Sequelize.STRING(255), allowNull: false, field: 'firstname' },
        lastname: { type: Sequelize.STRING(255), allowNull: false, field: 'lastname' },
        email: { type: Sequelize.STRING(255), allowNull: false, field: 'email' },
        position: { type: Sequelize.STRING(20), allowNull: false, field: 'position' },
        department: { type: Sequelize.STRING(100), allowNull: false, field: 'department' },
        mobile: { type: Sequelize.STRING(10), allowNull: false, field: 'mobile' },
        token: { type: Sequelize.STRING(255), allowNull: false, field: 'token' },
        
    },
    {
        tableName: 'users' 
    }
  );

  return users;
}