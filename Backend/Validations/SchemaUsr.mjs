import zod from 'zod';

export const SchemaUser = zod.object({
    name_user: zod.string({
        required_error: "El nombre del usuario es requerido",
        invalid_type_error: "El nombre del usuario debe ser una cadena de texto"
    }),
    lastName_user: zod.string({
        required_error: "El apellido del usuario es requerido",
        invalid_type_error: "El apellido del usuario debe ser una cadena de texto"
    }),
    email_user: zod.string({
        required_error: "El correo electrónico del usuario es requerido",
        invalid_type_error: "El correo electrónico del usuario debe ser una cadena de texto"
    }).email("El correo electrónico del usuario debe ser un correo electrónico válido"),

    password_user: zod.string({
        required_error: "La contraseña del usuario es requerida",
        invalid_type_error: "La contraseña del usuario debe ser una cadena de texto"
    }).max(11, "La contraseña del usuario debe tener al menos 11 caracteres")
})

export const SchemaLogin = zod.object({
    email_user: zod.string({
        required_error: "El correo electrónico del usuario es requerido",
        invalid_type_error: "El correo electrónico del usuario debe ser una cadena de texto"
    }).email("El correo electrónico del usuario debe ser un correo electrónico válido"),

    password_user: zod.string({
        required_error: "La contraseña del usuario es requerida",
        invalid_type_error: "La contraseña del usuario debe ser una cadena de texto"
    }).max(11, "La contraseña del usuario debe tener al menos 11 caracteres")
})

export const SchemaUpdateUser = zod.object({
    account_balance_user: zod.number({
        required_error: "El saldo de la cuenta del usuario es requerido",
        invalid_type_error: "El saldo de la cuenta del usuario debe ser un número"
    }).positive(),

    meta_user: zod.number({
        required_error: "La meta del usuario es requerida",
        invalid_type_error: "La meta del usuario debe ser un número"
    }).positive()
})

// Function to validate the user schema
export function validateUser(data) {
    return SchemaUser.safeParse(data);
}
// Function to validate the login schema
export function validateLogin(data) {
    return SchemaLogin.safeParse(data);
}

// Function to validate the update user schema
export function validateUpdateUser(data){
    return SchemaUpdateUser.safeParse(data);
}