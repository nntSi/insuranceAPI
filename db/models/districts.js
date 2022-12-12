module.exports = ( sequelize , Sequelize ) => {
  const districts = sequelize.define(
    'districts',
    {
        id: { type: Sequelize.INTEGER(11), primaryKey: true, autoIncrement: true, field: 'id' },
        name: { type: Sequelize.STRING(100), allowNull: false, field: 'name' },
        prv_id: { type: Sequelize.INTEGER(11), allowNull: false, field: 'prv_id'}
    },
    {
        tableName: 'districts'
    }
  );
  return districts;
}