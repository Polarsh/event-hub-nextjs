import { z } from 'zod'

export const eventSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'El título es obligatorio'),
  category: z.string().min(1, 'La categoría es obligatoria'),
  summary: z.string().min(1, 'El resumen es obligatorio'),
  description: z.string().min(1, 'La descripción es obligatoria'),
  imageUrl: z
    .string()
    .url('URL inválida')
    .min(1, 'La URL de la imagen es obligatoria'),
  videoUrl: z
    .string()
    .url('URL inválida')
    .min(1, 'La URL de la imagen es obligatoria'),
  date: z.date(),
  restriction: z.string().min(1, 'La restricción es obligatoria'),
})

// Exporta el tipo para usarlo en el componente
export type EventSchemaProps = z.infer<typeof eventSchema>
