
import sequelize from 'sequelize';
import seq_instance from '../db/mysql';


const Good =  seq_instance.define('i_good', {
    id: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    good_name: {
      type: sequelize.STRING(100),
      allowNull: true,
      defaultValue: ''
    },
    left: {
      type: sequelize.INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    },
    good_desc: {
      type: sequelize.STRING(1024),
      allowNull: true,
      defaultValue: ''
    },
    create_date: {
      type: sequelize.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'i_good'
  });

Good.sync();

export default Good;