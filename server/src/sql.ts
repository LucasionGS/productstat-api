import { Sequelize, DataTypes, Model } from "sequelize";
import os from "os";
import Path from "path";
import fs from "fs";

const sqlPath = Path.resolve(os.homedir(), ".prodstat", "product-stats.db");
fs.mkdirSync(Path.dirname(sqlPath), { recursive: true });

const sql = new Sequelize({
  dialect: "sqlite",
  storage: sqlPath
});

export class User extends Model {
  public id: number;
  public username: string;
  public password: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false
    }
  },
  {
    tableName: "users",
    sequelize: sql
  }
);

export interface IProduct {
  name: string;
  barcode: string;
  image?: string;
  brand?: string;
  category?: string;
}

export class Product extends Model<IProduct, IProduct> {
  public name: string;
  public barcode: string;
  public image?: string;
  public brand?: string;
  public category?: string;

  public records?: Record[];
}

Product.init(
  {
    barcode: {
      primaryKey: true,
      type: new DataTypes.STRING(128),
      unique: true,
      allowNull: false
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    image: {
      type: new DataTypes.STRING(128),
      allowNull: true
    },
    brand: {
      type: new DataTypes.STRING(128),
      allowNull: true
    },
    category: {
      type: new DataTypes.STRING(128),
      allowNull: true
    }
  },
  {
    tableName: "products",
    sequelize: sql
  }
);

export class Record extends Model {
  public id: number;
  public userId: number;
  public barcode: string; // Product barcode
  public date: Date;
}

Record.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    barcode: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(Date.now())
    }
  },
  {
    tableName: "records",
    sequelize: sql
  }
);

// TODO: Add product nutrition data

Product.hasMany(Record, {
  sourceKey: "barcode",
  foreignKey: "barcode",
  as: "records"
});

sql.sync().then(() => {
  console.log("Database synced");
});

export default sql;