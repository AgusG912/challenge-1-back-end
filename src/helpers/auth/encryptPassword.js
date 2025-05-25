import bcrypt from "bcryptjs";

// Genera un hash seguro para una contraseña usando un salt aleatorio
export const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}