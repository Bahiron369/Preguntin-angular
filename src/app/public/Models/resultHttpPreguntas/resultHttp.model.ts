import { Preguntas } from "../preguntas/Preguntas.models"

//modelo para las preguntas enviadas del servidor con el numero de estado de la solicitud
export class HttpPreguntas{
   public response_code: number = 0
   public results: Preguntas[] = []
}