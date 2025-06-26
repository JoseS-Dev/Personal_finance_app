export const MONTHS:string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
]

export const YEARS:number[] = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

export const TYPES:string[] = [
    "Ingreso",
    "Gasto",
    "Meta"
]

export const CATEGORYS:string[] = [
    "Salidas",
    "Educación",
    "Transporte",
    "Ventas",
    "Servicios",
    "Otros"
]