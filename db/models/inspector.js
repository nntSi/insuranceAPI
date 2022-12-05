module.exports = ( sequelize , Sequelize ) => {
  const inspector = sequelize.define(
    'inspector',
    {
        id: { type: Sequelize.INTEGER(11), primaryKey: true, autoIncrement: true, field: 'id' },
        title: { type: Sequelize.STRING(10), allowNull: false, field: 'title' },
        firstname: { type: Sequelize.STRING(255), allowNull: false, field: 'firstname' },
        lastname: { type: Sequelize.STRING(255), allowNull: false, field: 'lastname'},
        mobile: { type: Sequelize.STRING(10), allowNull: false, field: 'mobile'},
    },
    {
        tableName: 'inspector'
    }
  );
  
  return inspector;
}