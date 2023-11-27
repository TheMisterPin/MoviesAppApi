// import { PrismaClient as MongoClient } from "../prisma/generated/mongodb_client.prisma";
// import { PrismaClient as PostgresClient } from "../prisma/generated/postgresql_client.prisma";
// import { DefaultArgs } from "@prisma/client/runtime";

// export const DATA_SOURCE = process.env.DATA_SOURCE ?? "mongo"

// type ClientMongo = MongoClient<Prisma.PrismaClientOptions, never, DefaultArgs>
// type ClientPostgres = PostgresClient<Prisma.PrismaClientOptions, never, DefaultArgs>

// export const mongoClient = new MongoClient();
// export const postgresClient = new PostgresClient();

// export let clients: any

// if (DATA_SOURCE === "postgres") {
//     clients = postgresClient
// } else {
//     clients = mongoClient
// }