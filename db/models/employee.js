module.exports = ( sequelize , Sequelize ) => {
  const employee = sequelize.define(
    'employee',
    {
        id: { type: Sequelize.INTEGER(11), primaryKey: true, autoIncrement: true, field: 'id' },
        name: { type: Sequelize.STRING(100), allowNull: false, field: 'name' },
    },
    {
        tableName: 'employee'
    }
  );
  
  return employee;
}