import { prisma } from "../../database/dbConnection.js";

export const userExistsCheck = async (email) => {
    const userExists = await prisma.user.findUnique({
        where: { email },
        include: { role: true }
    });

    return userExists;
};