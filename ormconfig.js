const srcConfig = {
    type: "mariadb",
    host: "localhost",
    username: "root",
    password: "000000",
    port: 3306,
    database: "asa_tb2",
    synchronize: true,
    entities: ["src/models/**.ts"],
    logging: false,
    insecureAuth: true,
};
const distConfig = {
    type: "mariadb",
    host: "db",
    username: "root",
    password: "000000",
    port: 3306,
    database: "asa_tb2",
    synchronize: true,
    entities: ["dist/models/**.js"],
    logging: false,
    insecureAuth: true,
};
console.log(process.env.TS_NODE, "NODE ENV");
module.exports = process.env.TS_NODE ? srcConfig : distConfig;
