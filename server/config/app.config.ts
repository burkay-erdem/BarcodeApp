export const DB_CONFIG = {
    DB: process.env.DB_NAME ?? 'elonky',
    HOST: process.env.DB_HOST?? 'localhost',
    USER: process.env.DB_USER ?? 'elonky',
    PASSWORD: process.env.DB_PASSWORD ?? 'Elonky+2024',
    DIALECT: process.env.DB_DIALECT ?? 'mysql', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    PREFIX: process.env.DB_PREFIX ?? '', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
} 