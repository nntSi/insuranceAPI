module.exports = ( sequelize , Sequelize ) => {
  const company = sequelize.define(
    'company',
    {
        id: { type: Sequelize.INTEGER(11), primaryKey: true, autoIncrement: true, field: 'id' },
        company_name: { type: Sequelize.STRING(255), allowNull: false, field: 'company_name' },
    },
    {
        tableName: 'company'
    }
  );
  
  return company;
}