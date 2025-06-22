//este modelo sirve para mapear los datos de la pregunta y corregir el formato de algunas 
export class Preguntas{

    public type:string;
    public difficulty:string;
    public category:string;
    public question:string;
    public correct_answer:string;
    public incorrect_answers:string[];
    public tiempoRespuesta:string;
    public puntoPregunta:number;

    constructor(data:any){
        this.tiempoRespuesta = this.decodeHtml(data.tiempoRespuesta)
        this.type = this.decodeHtml(data.type);
        this.difficulty = this.decodeHtml(data.difficulty);
        this.category = this.decodeHtml(data.category);
        this.question = this.decodeHtml(data.question);
        this.correct_answer = this.decodeHtml(data.correct_answer);
        this.incorrect_answers = data.incorrect_answers.map((ans: string) => this.decodeHtml(ans));
        this.puntoPregunta = data.puntoPregunta;
    }

    decodeHtml(html: string): string {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }


}