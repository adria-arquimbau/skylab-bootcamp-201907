
function PP(){
    // variables generales
    var name = '';
    //Pasapalabra object
    var questions = [
        { letter: "a", answer: "abducir", status: 0, question: "Con la A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
        { letter: "b", answer: "bingo", status: 0, question: "Con la B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},
        { letter: "c", answer: "churumbel", status: 0, question: "Con la C. Niño, crío, bebé"},
        { letter: "d", answer: "diarrea", status: 0, question: "Con la D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"},
        { letter: "e", answer: "ectoplasma", status: 0, question: "Con la E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"},
        { letter: "f", answer: "facil", status: 0, question: "Con la F. Que no requiere gran esfuerzo, capacidad o dificultad"},
        { letter: "g", answer: "galaxia", status: 0, question: "Con la G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"},
        { letter: "h", answer: "harakiri", status: 0, question: "Con la H. Suicidio ritual japonés por desentrañamiento"},
        { letter: "i", answer: "iglesia", status: 0, question: "Con la I. Templo cristiano"},
        { letter: "j", answer: "jabali", status: 0, question: "Con la J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"},
        { letter: "k", answer: "kamikaze", status: 0, question: "Con la K. Persona que se juega la vida realizando una acción temeraria"},
        { letter: "l", answer: "licantropo", status: 0, question: "Con la L. Hombre lobo"},
        { letter: "m", answer: "misantropo", status: 0, question: "Con la M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"},
        { letter: "n", answer: "necedad", status: 0, question: "Con la N. Demostración de poca inteligencia"},
        { letter: "ñ", answer: "señal", status: 0, question: "Contiene la Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."},
        { letter: "o", answer: "orco", status: 0, question: "Con la O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"},
        { letter: "p", answer: "protoss", status: 0, question: "Con la P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"},
        { letter: "q", answer: "queso", status: 0, question: "Con la Q. Producto obtenido por la maduración de la cuajada de la leche"},
        { letter: "r", answer: "raton", status: 0, question: "Con la R. Roedor"},
        { letter: "s", answer: "stackoverflow", status: 0, question: "Con la S. Comunidad salvadora de todo desarrollador informático"},
        { letter: "t", answer: "terminator", status: 0, question: "Con la T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"},
        { letter: "u", answer: "unamuno", status: 0, question: "Con la U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"},
        { letter: "v", answer: "vikingos", status: 0, question: "Con la V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"},
        { letter: "w", answer: "sandwich", status: 0, question: "Contiene la W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"},
        { letter: "x", answer: "botox", status: 0, question: "Contiene la X. Toxina bacteriana utilizada en cirujía estética"},
        { letter: "y", answer: "peyote", status: 0, question: "Contiene la Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"},
        { letter: "z", answer: "zen", status: 0, question: "Con la Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"},
    ]
      
    
    //Preguntamos Name y iniciamos juego con funciones
    function userName(){
        name = prompt ('Introduce tu nombre de usuario.');
        alert('Bienvenido ' + name);
        alert(name + ', vamos a iniciar el juego. Pulsa ACEPTAR cuando estes listo y ten la consola preparada.');
        question();
    }
    //Iniciamos bucle con cada pregunta y su letra
    function question(){
        for (i=0; i <= questions.length; i++){
            console.log('Con la ' + questions[i] .letter + ' ' + questions[i] .question);
            var Answer = prompt('Introduce tu respuesta aqui:');
                if(Answer == questions[i].answer){
                    alert('CORRECTO!'); //no se si enviar lo
                }
        }
    }

a

    userName();
}
PP();