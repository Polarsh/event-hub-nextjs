# Importaciones necesarias
import sys
import json
from transformers import pipeline

# Carga el modelo de generación de texto una sola vez para mejorar el rendimiento.
try:
    generator = pipeline("text-generation", model="datificate/gpt2-small-spanish")
except Exception as e:
    # En caso de error (por ejemplo, si no se puede descargar el modelo),
    # devolvemos un texto de error claro para depuración.
    print(json.dumps({"description": f"Error: No se pudo cargar el modelo de IA. Razón: {str(e)}"}), file=sys.stderr)
    sys.exit(1)

def generate_description(title, summary):
    prompt = f"Por favor, genera una descripción completa y detallada para un evento. Utiliza la siguiente información como base.\n\nTítulo: {title}\nResumen: {summary}\n\nDescripción del evento:"
    
    # Genera el texto con el modelo de IA.
    # El valor `max_new_tokens=150` le pide a la IA que genere un texto de aproximadamente 100 palabras.
    generated_text = generator(prompt, max_new_tokens=150, clean_up_tokenization_spaces=True, pad_token_id=50256)[0]['generated_text']
    
    # El modelo de IA a menudo incluye el 'prompt' en la respuesta. Lo eliminamos aquí.
    final_text = generated_text.replace(prompt, "").strip()
    
    # Si el modelo no generó nada útil, devolvemos un mensaje de error.
    if len(final_text) < 50:
        return "El modelo no pudo generar una descripción útil con este input. Por favor, intenta de nuevo con un resumen más descriptivo."

    return final_text

if __name__ == "__main__":
    # La aplicación espera el título y el resumen como argumentos de línea de comandos.
    try:
        title = sys.argv[1]
        summary = sys.argv[2]
    except IndexError:
        # Si faltan argumentos, el script termina con un error.
        print(json.dumps({"error": "Se requieren el título y el resumen como argumentos."}), file=sys.stderr)
        sys.exit(1)

    description = generate_description(title, summary)
    
    # Finalmente, devuelve la descripción como un JSON.
    print(json.dumps({"description": description}))
