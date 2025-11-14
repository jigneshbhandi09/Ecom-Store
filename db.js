const { PrismaClient } = require('@prisma/client');
require('dotenv').config({ path: './backend/.env' }); // make sure it points to your .env

const prisma = new PrismaClient();

module.exports = prisma;
