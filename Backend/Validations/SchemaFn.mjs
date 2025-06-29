import zod from 'zod';

export const SchemaFinance = zod.object({
    description_finance: zod.string({
        required_error: "La descripción de la finanza es requerida",
        invalid_type_error: "La descripción de la finanza debe ser una cadena de texto"
    }).min(1, "La descripción de la finanza es requerida"),
    
    date_finance: zod.string().refine(value => {
        const parserDate =new Date(value);
        return !isNaN(parserDate.getDate());
    }),

    type_finance: zod.string({
        required_error: "El tipo de finanza es requerido",
        invalid_type_error: "El tipo de finanza debe ser una cadena de texto"
    }).refine(value => {
        const validTypes = ["Ingreso", "Gasto", "Meta"];
        return validTypes.includes(value);
    }),

    category_finance: zod.string({
        required_error: "La categoría de la finanza es requerida",
        invalid_type_error: "La categoría de la finanza debe ser una cadena de texto"
    }).refine(value => {
        const validCategory = ['Salidas', 'Educación', 'Transporte', 'Ventas', 'Servicios', 'Otros'];
        return validCategory.includes(value);
    }),

    amount_finance: zod.number({
        required_error: "El monto de la finanza es requerido",
        invalid_type_error: "El monto de la finanza debe ser un número"
    }).min(0, "El monto de la finanza debe ser mayor o igual a 0").positive()

})

// Function to validate the schema
export function validateFinance(data){
    return SchemaFinance.safeParse(data);
}

// Function to validate the schema and update the data
export function validateFinanceUpdate(data){
    return SchemaFinance.partial().safeParse(data);
}
