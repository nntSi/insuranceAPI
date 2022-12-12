module.exports = ( sequelize , Sequelize ) => {
  const province = sequelize.define(
    'province',
    {
        id: { type: Sequelize.INTEGER(11), primaryKey: true, autoIncrement: true, field: 'id' },
        name: { type: Sequelize.STRING(100), allowNull: false, field: 'name' },
    },
    {
        tableName: 'province'
    }
  );
  return province;
}