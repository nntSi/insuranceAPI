module.exports = ( sequelize , Sequelize ) => {
  const claim = sequelize.define(
    'claim',
    {
        id: { type: Sequelize.INTEGER(11), primaryKey: true, autoIncrement: true, field: 'id' },
        svh_code: { type: Sequelize.STRING(255), allowNull: false, field: 'svh_code' },
        employee: { type: Sequelize.STRING(255), allowNull: false, field: 'employee' },
        inspector: { type: Sequelize.STRING(255), allowNull: false, field: 'inspector'},
        source: { type: Sequelize.STRING(255), allowNull: false, field: 'source'},
        type: { type: Sequelize.STRING(255), allowNull: false, field: 'type'},
        source_employee: { type: Sequelize.STRING(255), allowNull: false, field: 'source_employee'},
        location: { type: Sequelize.STRING(255), allowNull: false, field: 'location'},
        accident: { type: Sequelize.STRING(255), allowNull: false, field: 'accident'},
        date: { type: Sequelize.STRING(255), allowNull: false, field: 'date'},
        time: { type: Sequelize.STRING(255), allowNull: false, field: 'time'},
        inspector_mobile: { type: Sequelize.STRING(255), allowNull: false, field: 'inspector_mobile'}
    },
    {
        tableName: 'claim' 
    }
  );
  
  return claim;
}