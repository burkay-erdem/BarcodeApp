declare module '@env' {
    export const API_URL: string;
    export const DATABASE_URL: string;
}

declare module process.env {
    export const PORT: string;
    export const API_URL: string;
    export const DB_NAME: string;
    export const DB_HOST: string;
    export const DB_USER: string;
    export const DB_PASSWORD: string;
    export const DB_DIALECT: string;
    export const DB_PREFIX: string;
    export const AUTH_SECRET: string;

}