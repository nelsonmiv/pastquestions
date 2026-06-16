import { PracticePrompt } from "../types";

export const rawPracticePrompts: PracticePrompt[] = [
  {
    id: 1,
    answer: "Yes, I did. I lived in London for two years.",
    correctQuestion: "Did you live in London?",
    clue: "Did",
    translation: "Sí, viví en Londres por dos años.",
    explanation: "With the simple past, use the auxiliary 'Did' + subject 'you' + base verb 'live' to construct a yes/no question."
  },
  {
    id: 2,
    answer: "No, she didn't. She didn't buy the tickets.",
    correctQuestion: "Did she buy the tickets?",
    clue: "Did",
    translation: "No. Ella no compró las entradas.",
    explanation: "For singular 'she', form the yes/no past question starting with the auxiliary 'Did' + 'she' + base verb 'buy'."
  },
  {
    id: 3,
    answer: "Yes, they did. They finished the project.",
    correctQuestion: "Did they finish the project?",
    clue: "Did",
    translation: "Sí, ellos terminaron el proyecto.",
    explanation: "For plural subjects, start with the auxiliary 'Did' + 'they' and the base verb 'finish'."
  },
  {
    id: 4,
    answer: "I traveled to France last summer.",
    correctQuestion: "Where did you travel last summer?",
    clue: "Where",
    translation: "Viajé a Francia el verano pasado.",
    explanation: "'France' indicates a place. Form the past question starting with 'Where' + auxiliary 'did' + 'you' + base verb 'travel'."
  },
  {
    id: 5,
    answer: "At 9 PM. The train arrived at 9 PM.",
    correctQuestion: "What time did the train arrive?",
    clue: "What time",
    translation: "A las 9 PM. El tren llegó a las 9 PM.",
    explanation: "To request a particular past schedule, use 'What time' + helper 'did' + subject + base verb 'arrive'."
  },
  {
    id: 6,
    answer: "We bought our car two years ago.",
    correctQuestion: "When did you buy your car?",
    clue: "When",
    translation: "Compramos nuestro carro hace dos años.",
    explanation: "'Two years ago' is a timeframe. We use the Wh-question word 'When' followed by 'did' + subject + base verb 'buy'."
  },
  {
    id: 7,
    answer: "She left early because she was tired.",
    correctQuestion: "Why did she leave early?",
    clue: "Why",
    translation: "Ella se fue temprano porque estaba cansada.",
    explanation: "The clause starting with 'because' indicates a reason, needing the Wh-word 'Why' + 'did' + 'she' + base verb 'leave'."
  },
  {
    id: 8,
    answer: "Yes, they were. They were very happy yesterday.",
    correctQuestion: "Were they happy yesterday?",
    clue: "Were",
    translation: "Sí, estaban muy felices ayer.",
    explanation: "For yes/no past queries using 'to be' (were), do NOT use 'did'. Place 'Were' before the subject 'they'."
  },
  {
    id: 9,
    answer: "No, he wasn't. He was not at school this morning.",
    correctQuestion: "Was he at school this morning?",
    clue: "Was",
    translation: "No. Él no estaba en la escuela esta mañana.",
    explanation: "Singular past state linking with 'he' starts the yes/no question using 'Was' + subject 'he'."
  },
  {
    id: 10,
    answer: "It cost twenty dollars.",
    correctQuestion: "How much did it cost?",
    clue: "How much",
    translation: "Costó veinte dólares.",
    explanation: "To ask about cost or price in simple past, use 'How much' + helper 'did' + subject + verb 'cost'."
  },
  {
    id: 11,
    answer: "She ate three apples for breakfast.",
    correctQuestion: "How many apples did she eat for breakfast?",
    clue: "How many",
    translation: "Ella comió tres manzanas para el desayuno.",
    explanation: "For countable items, start with 'How many apples' + simple past helper 'did' + subject + base verb 'eat'."
  },
  {
    id: 12,
    answer: "Yes, I was. I was studying when you rang.",
    correctQuestion: "Were you studying when I rang?",
    clue: "Were",
    translation: "Sí, estaba estudiando cuando llamaste.",
    explanation: "A yes/no query about an ongoing past activity uses the helper 'Were' + subject 'you' + verb-ing 'studying'."
  },
  {
    id: 13,
    answer: "No, she wasn't sleeping at midnight.",
    correctQuestion: "Was she sleeping at midnight?",
    clue: "Was",
    translation: "No. Ella no estaba durmiendo a medianoche.",
    explanation: "Confirming singular ongoing activity uses the prefix 'Was' + subject 'she' + present participle 'sleeping'."
  },
  {
    id: 14,
    answer: "We were cooking dinner at 7 PM yesterday.",
    correctQuestion: "What were you doing at 7 PM yesterday?",
    clue: "What",
    translation: "Estábamos cocinando la cena a las 7 PM ayer.",
    explanation: "To ask about progressive activities at a past hour, start with 'What' + past continuous structure 'were you doing'."
  },
  {
    id: 15,
    answer: "They were playing tennis in the sports center.",
    correctQuestion: "Where were they playing tennis?",
    clue: "Where",
    translation: "Ellos estaban jugando tenis en el centro deportivo.",
    explanation: "'In the sports center' specifies a venue. Use 'Where' + past continuous helper 'were they playing tennis?'"
  },
  {
    id: 16,
    answer: "He was crying because he lost his toy.",
    correctQuestion: "Why was he crying?",
    clue: "Why",
    translation: "Él estaba llorando porque perdió su juguete.",
    explanation: "To ask about continuous motives, structure: 'Why' + past 'be' verb 'was' + subject 'he' + participle 'crying'."
  },
  {
    id: 17,
    answer: "I was driving home when the rain started.",
    correctQuestion: "Were you driving home when the rain started?",
    clue: "Were",
    translation: "Estaba conduciendo a casa cuando empezó la lluvia.",
    explanation: "To verify an progressive activity during an interruption, start with 'Were' + subject 'you' + 'driving'."
  },
  {
    id: 18,
    answer: "They were dancing on the beach at midnight.",
    correctQuestion: "What were they doing at midnight?",
    clue: "What",
    translation: "Estaban bailando en la playa a medianoche.",
    explanation: "Query past midnight actions with the open question: 'What' + progressive form 'were they doing'."
  },
  {
    id: 19,
    answer: "My brother was singing in the shower.",
    correctQuestion: "Who was singing in the shower?",
    clue: "Who",
    translation: "Mi hermano estaba cantando en la ducha.",
    explanation: "When asking which subject was doing an action, start with 'Who' + past 'be' + progressive verb."
  },
  {
    id: 20,
    answer: "Yes, she did. She had a bad cold last week.",
    correctQuestion: "Did she have a bad cold last week?",
    clue: "Did",
    translation: "Sí, ella tuvo un resfriado fuerte la semana pasada.",
    explanation: "With the simple past possession 'had', form questions using 'Did' + subject 'she' + base verb 'have'."
  },
  {
    id: 21,
    answer: "I played tennis with my sister yesterday.",
    correctQuestion: "Who did you play tennis with yesterday?",
    clue: "Who",
    translation: "Jugué tenis con mi hermana ayer.",
    explanation: "For companion queries, form the syntax: 'Who' + helper 'did' + subject + base verb + 'with' at the end."
  },
  {
    id: 22,
    answer: "They were wearing yellow safety helmets.",
    correctQuestion: "What were they wearing?",
    clue: "What",
    translation: "Ellos estaban usando cascos de seguridad amarillos.",
    explanation: "To query physical items worn during an activity, use 'What' + 'were they wearing?'."
  },
  {
    id: 23,
    answer: "At 8 PM. We were watching TV at 8 PM.",
    correctQuestion: "What were you doing at 8 PM?",
    clue: "What",
    translation: "A las 8 PM. Estábamos viendo televisión a las 8 PM.",
    explanation: "Standard past hour activities use 'What' + 'were you doing' + specified hour description."
  },
  {
    id: 24,
    answer: "Yes, I did. I bought a red car yesterday.",
    correctQuestion: "Did you buy a red car yesterday?",
    clue: "Did",
    translation: "Sí. Compré un carro rojo ayer.",
    explanation: "Form the simple past confirmation using 'Did' + subject + base verb 'buy' (not irregular past 'bought')."
  },
  {
    id: 25,
    answer: "He slept in a cheap hostel when traveling.",
    correctQuestion: "Where did he sleep when traveling?",
    clue: "Where",
    translation: "Él durmió en un hostal barato cuando viajaba.",
    explanation: "Requesting purchase location uses 'Where' + helper 'did' + subject + base verb 'sleep' (not 'slept')."
  },
  {
    id: 26,
    answer: "No, they weren't studying. They were playing cards.",
    correctQuestion: "Were they studying?",
    clue: "Were",
    translation: "No, ellos no estaban estudiando. Estaban jugando cartas.",
    explanation: "Check ongoing past continuous behaviors starting with 'Were' + subject 'they' + progressive verb-ing."
  },
  {
    id: 27,
    answer: "I chose the green shirt, not the red one.",
    correctQuestion: "Which shirt did you choose?",
    clue: "Which",
    translation: "Elegí la camisa verde, no la roja.",
    explanation: "Asking to specify a selection uses 'Which shirt' + helper 'did' + subject + base verb 'choose'."
  },
  {
    id: 28,
    answer: "A black cat was sitting on our fence.",
    correctQuestion: "What was sitting on your fence?",
    clue: "What",
    translation: "Un gato negro estaba sentado en nuestra cerca.",
    explanation: "Querying unknown subjects of continuous events starts with 'What' + past linking verb 'was' + participle."
  },
  {
    id: 29,
    answer: "No, he wasn't. He wasn't studying when I came in.",
    correctQuestion: "Was he studying when you came in?",
    clue: "Was",
    translation: "No, él no estaba estudiando cuando entré.",
    explanation: "Confirming state with singular 'he' uses the auxiliary 'Was' + subject + progressive 'studying'."
  },
  {
    id: 30,
    answer: "They were shouting because they were angry.",
    correctQuestion: "Why were they shouting?",
    clue: "Why",
    translation: "Ellos estaban gritando porque estaban enojados.",
    explanation: "Query past continuous reasons by placing 'Why' + continuous 'were' + subject + 'shouting'."
  },
  {
    id: 31,
    answer: "He went to the cinema to watch comedies.",
    correctQuestion: "Why did he go to the cinema?",
    clue: "Why",
    translation: "Él fue al cine a ver comedias.",
    explanation: "To search for the purpose or reason, use 'Why' + 'did' + subject 'he' + base verb 'go'."
  },
  {
    id: 32,
    answer: "I met my new business manager last Tuesday.",
    correctQuestion: "When did you meet your new business manager?",
    clue: "When",
    translation: "Conocí a mi nuevo gerente de negocios el martes pasado.",
    explanation: "'Last Tuesday' is a specific day. Use 'When' + 'did' + subject + base verb 'meet' (not 'met')."
  },
  {
    id: 33,
    answer: "No, I didn't. I did not receive your email.",
    correctQuestion: "Did you receive my email?",
    clue: "Did",
    translation: "No. No recibí tu correo electrónico.",
    explanation: "To ask a yes/no question about an email arrival, use 'Did you receive' + noun."
  },
  {
    id: 34,
    answer: "Yes, she was. She was crying during the movie.",
    correctQuestion: "Was she crying during the movie?",
    clue: "Was",
    translation: "Sí, ella estaba llorando durante la película.",
    explanation: "For singular past continuous confirmation, start with 'Was' + 'she' + '-ing' verb."
  },
  {
    id: 35,
    answer: "We were staying in a small hotel near the beach.",
    correctQuestion: "Where were you staying?",
    clue: "Where",
    translation: "Nos estábamos hospedando en un hotel pequeño cerca de la playa.",
    explanation: "'In a small hotel' is a place, prompting a 'Where' + past continuous question."
  },
  {
    id: 36,
    answer: "They spent five hundred dollars on the flight.",
    correctQuestion: "How much did they spend on the flight?",
    clue: "How much",
    translation: "Ellos gastaron quinientos dólares en el vuelo.",
    explanation: "Inquire about money spent in the past with 'How much' + 'did' + subject + base verb 'spend'."
  },
  {
    id: 37,
    answer: "I took the bus because my car broke down.",
    correctQuestion: "Why did you take the bus?",
    clue: "Why",
    translation: "Tomé el autobús porque mi carro se descompuso.",
    explanation: "'Because...' triggers 'Why' + 'did' + subject + base verb 'take'."
  },
  {
    id: 38,
    answer: "No, we weren't. We weren't listening to that radio station.",
    correctQuestion: "Were you listening to that radio station?",
    clue: "Were",
    translation: "No. No estábamos escuchando esa estación de radio.",
    explanation: "Plural continuous verification uses 'Were you' + progressive verb-ing 'listening'."
  },
  {
    id: 39,
    answer: "Yes, he did. He won the tennis tournament.",
    correctQuestion: "Did he win the tennis tournament?",
    clue: "Did",
    translation: "Sí. Él ganó el torneo de tenis.",
    explanation: "Use 'Did he' followed by the base form of the verb 'win' (not irregular 'won')."
  },
  {
    id: 40,
    answer: "She bought the blue jacket, not the black one.",
    correctQuestion: "Which jacket did she buy?",
    clue: "Which",
    translation: "Ella compró la chaqueta azul, no la negra.",
    explanation: "When choosing between items, use 'Which' + noun + 'did' + subject + base verb 'buy'."
  },
  {
    id: 41,
    answer: "At 11 PM. I was sleeping at 11 PM.",
    correctQuestion: "What were you doing at 11 PM?",
    clue: "What",
    translation: "A las 11 PM. Yo estaba durmiendo a las 11 PM.",
    explanation: "To ask about continuous activity at an hour, use 'What structure' + 'were you doing' + time."
  },
  {
    id: 42,
    answer: "They went to the beach by train.",
    correctQuestion: "How did they go to the beach?",
    clue: "How",
    translation: "Ellos fueron a la playa en tren.",
    explanation: "'By train' denotes the mode of travel. Ask 'How' + 'did' + subject + base verb 'go'."
  },
  {
    id: 43,
    answer: "No, she wasn't. She was not cooking lunch.",
    correctQuestion: "Was she cooking lunch?",
    clue: "Was",
    translation: "No. Ella no estaba cocinando el almuerzo.",
    explanation: "Past progressive singular yes/no check starts with 'Was she' + verb-ing."
  },
  {
    id: 44,
    answer: "He arrived at the office five minutes late.",
    correctQuestion: "How late did he arrive?",
    clue: "How late",
    translation: "Él llegó a la oficina cinco minutos tarde.",
    explanation: "To measure lateness, use 'How late' + past auxiliary 'did' + subject + base verb 'arrive'."
  },
  {
    id: 45,
    answer: "Yes, I did. I saw a huge bird outside my apartment.",
    correctQuestion: "Did you see a huge bird?",
    clue: "Did",
    translation: "Sí. Vi un ave enorme afuera de mi departamento.",
    explanation: "Form the completed past query using 'Did you' + base verb 'see' (not 'saw')."
  },
  {
    id: 46,
    answer: "They were working in the garage all morning.",
    correctQuestion: "Where were they working all morning?",
    clue: "Where",
    translation: "Ellos estuvieron trabajando en el garaje toda la mañana.",
    explanation: "'In the garage' is a place, requesting 'Where' + progressive 'were they working'."
  },
  {
    id: 47,
    answer: "She called her mother yesterday afternoon.",
    correctQuestion: "Who did she call yesterday afternoon?",
    clue: "Who",
    translation: "Ella llamó a su madre ayer por la tarde.",
    explanation: "The object is 'her mother' (a person). Use 'Who' + helper 'did' + she + base verb 'call'."
  },
  {
    id: 48,
    answer: "No, we weren't. We weren't having a meeting.",
    correctQuestion: "Were you having a meeting?",
    clue: "Were",
    translation: "No. No estábamos teniendo una reunión.",
    explanation: "Verify ongoing past activities with 'Were you' + progressive '-ing' verb."
  },
  {
    id: 49,
    answer: "The computer broke because it was too old.",
    correctQuestion: "Why did the computer break?",
    clue: "Why",
    translation: "La computadora se descompuso porque era demasiado vieja.",
    explanation: "Find the structural defect reason using 'Why' + helper 'did' + subject + base verb 'break'."
  },
  {
    id: 50,
    answer: "Yes, he was. He was drinking milk when he sneezed.",
    correctQuestion: "Was he drinking milk when he sneezed?",
    clue: "Was",
    translation: "Sí. Él estaba bebiendo leche cuando estornudó.",
    explanation: "Construct a past progressive yes/no with 'Was' + 'he' + 'drinking' + interruption."
  },
  {
    id: 51,
    answer: "I wrote three letters yesterday.",
    correctQuestion: "How many letters did you write yesterday?",
    clue: "How many",
    translation: "Escribí tres cartas ayer.",
    explanation: "To query countable letters, start with 'How many letters' + 'did you write'."
  },
  {
    id: 52,
    answer: "They lived in Spain five years ago.",
    correctQuestion: "When did they live in Spain?",
    clue: "When",
    translation: "Ellos vivieron en España hace cinco años.",
    explanation: "'Five years ago' indicates time. Use the keyword 'When' + 'did they live'."
  },
  {
    id: 53,
    answer: "No, she didn't. She didn't visit any galleries.",
    correctQuestion: "Did she visit any galleries?",
    clue: "Did",
    translation: "No. Ella no visitó ninguna galería.",
    explanation: "Simple past yes/no negation checked with 'Did she' + base verb 'visit'."
  },
  {
    id: 54,
    answer: "He was talking to his colleague about the contract.",
    correctQuestion: "What was he talking about?",
    clue: "What",
    translation: "Él estaba hablando con su colega sobre el contrato.",
    explanation: "Ask about the subject matter 'about the contract' using 'What' + 'was he talking about'."
  },
  {
    id: 55,
    answer: "Yes, I did. I closed the front window before sleeping.",
    correctQuestion: "Did you close the front window?",
    clue: "Did",
    translation: "Sí. Cerré la ventana delantera antes de dormir.",
    explanation: "Query a past completed habit/action using 'Did you' + base verb 'close'."
  },
  {
    id: 56,
    answer: "We were playing board games because it was raining.",
    correctQuestion: "Why were you playing board games?",
    clue: "Why",
    translation: "Estábamos jugando juegos de mesa porque estaba lloviendo.",
    explanation: "'Because...' refers to a reason, needing 'Why' + continuous 'were you playing'."
  },
  {
    id: 57,
    answer: "He paid forty dollars for the train ticket.",
    correctQuestion: "How much did he pay for the train ticket?",
    clue: "How much",
    translation: "Él pagó cuarenta dólares por el boleto de tren.",
    explanation: "Query price in past using 'How much' + 'did' + subject 'he' + base verb 'pay'."
  },
  {
    id: 58,
    answer: "No, they weren't. They were not laughing at your joke.",
    correctQuestion: "Were they laughing at my joke?",
    clue: "Were",
    translation: "No. Ellos no se estaban riendo de tu chiste.",
    explanation: "Ask if they were laughing using the progressive form 'Were they' + verb-ing."
  },
  {
    id: 59,
    answer: "The keys were inside the kitchen drawer.",
    correctQuestion: "Where were the keys?",
    clue: "Where",
    translation: "Las llaves estaban dentro del cajón de la cocina.",
    explanation: "Since state describes location, ask 'Where' + past 'be' plural 'were the keys'."
  },
  {
    id: 60,
    answer: "She woke up at seven-thirty this morning.",
    correctQuestion: "What time did she wake up this morning?",
    clue: "What time",
    translation: "Ella se despertó a las siete y media esta mañana.",
    explanation: "'Seven-thirty' represents clock time. Ask 'What time' + 'did' + 'she' + 'wake up'."
  },
  {
    id: 61,
    answer: "Yes, she did. She passed her driving test yesterday.",
    correctQuestion: "Did she pass her driving test yesterday?",
    clue: "Did",
    translation: "Sí, ella pasó su examen de conducir ayer.",
    explanation: "Simple past yes/no query uses 'Did' + subject 'she' + base verb 'pass'."
  },
  {
    id: 62,
    answer: "We chose the yellow curtains for our apartment.",
    correctQuestion: "Which curtains did you choose?",
    clue: "Which",
    translation: "Elegimos las cortinas amarillas para nuestro departamento.",
    explanation: "Identify choice using 'Which curtains' + helper 'did' + subject + base verb 'choose'."
  },
  {
    id: 63,
    answer: "He was driving a luxury sports car when I saw him.",
    correctQuestion: "What kind of car was he driving?",
    clue: "What kind of",
    translation: "Él estaba conduciendo un auto deportivo de lujo cuando lo vi.",
    explanation: "Request category with 'What kind of car' + 'was he driving'."
  },
  {
    id: 64,
    answer: "Yes, they were at the conference on Monday.",
    correctQuestion: "Were they at the conference on Monday?",
    clue: "Were",
    translation: "Sí, ellos estuvieron en la conferencia el lunes.",
    explanation: "Check past status with plural subjects directly using 'Were they'."
  },
  {
    id: 65,
    answer: "No, she didn't. She did not find her wallet.",
    correctQuestion: "Did she find her wallet?",
    clue: "Did",
    translation: "No. Ella no encontró su cartera.",
    explanation: "Ask completed past verification via 'Did she' + base verb 'find' (not 'found')."
  },
  {
    id: 66,
    answer: "They bought some fresh fruit and cheese at the market.",
    correctQuestion: "What did they buy at the market?",
    clue: "What",
    translation: "Ellos compraron fruta fresca y queso en el mercado.",
    explanation: "Query purchased goods with 'What' + helper 'did' + subject + base verb 'buy'."
  },
  {
    id: 67,
    answer: "I was crying because I had some dust in my eye.",
    correctQuestion: "Why were you crying?",
    clue: "Why",
    translation: "Estaba llorando porque tenía algo de polvo en mi ojo.",
    explanation: "Ask reason for progressive past crying using 'Why' + 'were you'."
  },
  {
    id: 68,
    answer: "No, he wasn't. He wasn't wearing his glasses.",
    correctQuestion: "Was he wearing his glasses?",
    clue: "Was",
    translation: "No. Él no estaba usando sus lentes.",
    explanation: "Check ongoing past wear with 'Was he' + participle 'wearing'."
  },
  {
    id: 69,
    answer: "We arrived at the final location at noon.",
    correctQuestion: "When did you arrive at the final location?",
    clue: "When",
    translation: "Llegamos a la ubicación final al mediodía.",
    explanation: "'At noon' is a timeframe. Formulate 'When' + helper 'did' + subject + 'arrive'."
  },
  {
    id: 70,
    answer: "They were studying chemistry in the main classroom.",
    correctQuestion: "What subject were they studying?",
    clue: "What subject",
    translation: "Ellos estaban estudiando química en el salón de clases principal.",
    explanation: "Ask about the subject 'chemistry' using 'What subject' + helper 'were they studying'."
  },
  {
    id: 71,
    answer: "Yes, I did. I walked the dog before going to sleep.",
    correctQuestion: "Did you walk the dog before going to sleep?",
    clue: "Did",
    translation: "Sí, paseé al perro antes de ir a dormir.",
    explanation: "Direct simple past yes/no asks 'Did you' + base verb 'walk'."
  },
  {
    id: 72,
    answer: "He bought four train tickets for the family.",
    correctQuestion: "How many train tickets did he buy?",
    clue: "How many",
    translation: "Él compró cuatro boletos de tren para la familia.",
    explanation: "Ask quantitative amount via 'How many train tickets' + 'did he buy'."
  },
  {
    id: 73,
    answer: "No, they didn't. They didn't like the resort.",
    correctQuestion: "Did they like the resort?",
    clue: "Did",
    translation: "No. A ellos no les gustó el complejo vacacional.",
    explanation: "Check past opinions with 'Did they' + base verb 'like' (not 'liked')."
  },
  {
    id: 74,
    answer: "She was reading the daily newspaper when I knocked.",
    correctQuestion: "What was she reading when you knocked?",
    clue: "What",
    translation: "Ella estaba leyendo el periódico diario cuando toqué.",
    explanation: "Query object of interrupted past action: 'What' + 'was she reading' + phrase."
  },
  {
    id: 75,
    answer: "No, he wasn't playing computer games at midnight.",
    correctQuestion: "Was he playing computer games at midnight?",
    clue: "Was",
    translation: "No, él no estaba jugando juegos de computadora a medianoche.",
    explanation: "Check singular midnight activity with 'Was he playing'."
  },
  {
    id: 76,
    answer: "They stayed in Paris for three weeks.",
    correctQuestion: "How long did they stay in Paris?",
    clue: "How long",
    translation: "Ellos se quedaron en París por tres semanas.",
    explanation: "'For three weeks' specifies duration. Frame 'How long' + past helper 'did' + subject."
  },
  {
    id: 77,
    answer: "Yes, I was. I was laughing because of his funny hat.",
    correctQuestion: "Were you laughing because of his funny hat?",
    clue: "Were",
    translation: "Sí, me estaba riendo debido a su divertido sombrero.",
    explanation: "Validate past progressive status with 'Were you' + verb-ing 'laughing'."
  },
  {
    id: 78,
    answer: "She met her new business partner in a restaurant.",
    correctQuestion: "Where did she meet her new business partner?",
    clue: "Where",
    translation: "Ella conoció a su nuevo socio de negocios en un restaurante.",
    explanation: "'In a restaurant' denotes place. Ask 'Where' + 'did she meet'."
  },
  {
    id: 79,
    answer: "I forgot my house keys on my desk.",
    correctQuestion: "Where did you forget your house keys?",
    clue: "Where",
    translation: "Olvidé las llaves de mi casa en mi escritorio.",
    explanation: "Locate forgotten item with 'Where' + simple past helper 'did' + subject + 'forget' (not 'forgot')."
  },
  {
    id: 80,
    answer: "No, she wasn't. She was not crying because she was sad.",
    correctQuestion: "Was she crying because she was sad?",
    clue: "Was",
    translation: "No. Ella no estaba llorando porque estuviera triste.",
    explanation: "Ask yes/no check on reason with 'Was she crying because...'."
  },
  {
    id: 81,
    answer: "Yes, he did. He finished all his homework early.",
    correctQuestion: "Did he finish all his homework early?",
    clue: "Did",
    translation: "Sí. Él terminó toda su tarea temprano.",
    explanation: "completed past yes/no query uses 'Did he' + base verb 'finish'."
  },
  {
    id: 82,
    answer: "They were talking about the football match.",
    correctQuestion: "What were they talking about?",
    clue: "What",
    translation: "Ellos estaban hablando sobre el partido de fútbol.",
    explanation: "Query topic using 'What' + past continuous 'were they talking about'."
  },
  {
    id: 83,
    answer: "No, they weren't. They were not listening to the flight instructions.",
    correctQuestion: "Were they listening to the flight instructions?",
    clue: "Were",
    translation: "No. Ellos no estaban escuchando las instrucciones del vuelo.",
    explanation: "Consult past listening status using plural 'Were they' + progressive verb."
  },
  {
    id: 84,
    answer: "I traveled to the office by taxi because I was late.",
    correctQuestion: "How did you travel to the office?",
    clue: "How",
    translation: "Viajé a la oficina en taxi porque se me hizo tarde.",
    explanation: "Ask about transport style with 'How' + simple past helper 'did you travel'."
  },
  {
    id: 85,
    answer: "Yes, she was. She was singing beautifully tonight.",
    correctQuestion: "Was she singing beautifully tonight?",
    clue: "Was",
    translation: "Sí. Ella estaba cantando hermosamente esta noche.",
    explanation: "Query past continuous singular status with 'Was she' + 'singing'."
  },
  {
    id: 86,
    answer: "They built the bridge ten years ago.",
    correctQuestion: "When did they build the bridge?",
    clue: "When",
    translation: "Ellos construyeron el puente hace diez años.",
    explanation: "Query ancient completion dates via 'When' + 'did they' + base verb 'build' (not 'built')."
  },
  {
    id: 87,
    answer: "No, she didn't. She did not find her sunglasses.",
    correctQuestion: "Did she find her sunglasses?",
    clue: "Did",
    translation: "No. Ella no encontró sus lentes de sol.",
    explanation: "Check simple past loss using 'Did she' + base verb 'find'."
  },
  {
    id: 88,
    answer: "The meeting lasted two hours.",
    correctQuestion: "How long did the meeting last?",
    clue: "How long",
    translation: "La reunión duró dos horas.",
    explanation: "'Two hours' represents duration. Use 'How long' + helper 'did' + subject + 'last'."
  },
  {
    id: 89,
    answer: "Yes, they were. They were driving to Rome when the motor failed.",
    correctQuestion: "Were they driving to Rome when the motor failed?",
    clue: "Were",
    translation: "Sí. Ellos estaban conduciendo a Roma cuando falló el motor.",
    explanation: "Queryprogressive action during interruption: 'Were they driving' + interruption info."
  },
  {
    id: 90,
    answer: "I chose the blue model because it had a larger memory.",
    correctQuestion: "Why did you choose the blue model?",
    clue: "Why",
    translation: "Elegí el modelo azul porque tenía mayor memoria.",
    explanation: "Inquire about past decision reasons with 'Why' + 'did you choose' (not 'chose')."
  },
  {
    id: 91,
    answer: "Yes, I did. I closed the front gate of the garden.",
    correctQuestion: "Did you close the front gate of the garden?",
    clue: "Did",
    translation: "Sí. Cerré la puerta principal del jardín.",
    explanation: "Ask yes/no simple past verification with 'Did you' + base verb 'close'."
  },
  {
    id: 92,
    answer: "They stayed in an apartment during their holiday.",
    correctQuestion: "Where did they stay during their holiday?",
    clue: "Where",
    translation: "Ellos se hospedaron en un departamento durante su vacación.",
    explanation: "'In an apartment' represents location. Ask 'Where' + 'did they stay'."
  },
  {
    id: 93,
    answer: "She was studying biological science at midnight.",
    correctQuestion: "What was she studying at midnight?",
    clue: "What",
    translation: "Ella estaba estudiando ciencia biológica a medianoche.",
    explanation: "Query object of study in past hours with 'What' + 'was she studying'."
  },
  {
    id: 94,
    answer: "No, he wasn't carrying any heavy suitcases.",
    correctQuestion: "Was he carrying any heavy suitcases?",
    clue: "Was",
    translation: "No, él no estaba cargando maletas pesadas.",
    explanation: "Check luggage carriage with 'Was he' + progressive participle 'carrying'."
  },
  {
    id: 95,
    answer: "We chose the yellow route to travel across the mountains.",
    correctQuestion: "Which route did you choose?",
    clue: "Which",
    translation: "Elegimos la ruta amarilla para viajar a través de las montañas.",
    explanation: "Query past continuous choices with 'Which route' + 'did you choose' (not 'chose')."
  },
  {
    id: 96,
    answer: "Yes, she did. She bought some delicious cakes for the party.",
    correctQuestion: "Did she buy some delicious cakes for the party?",
    clue: "Did",
    translation: "Sí, ella compró unos pasteles deliciosos para la fiesta.",
    explanation: "Form past yes/no confirmation with 'Did she' + base verb 'buy'."
  },
  {
    id: 97,
    answer: "I woke up early because I wanted to see the sunrise.",
    correctQuestion: "Why did you wake up early?",
    clue: "Why",
    translation: "Me desperté temprano porque quería ver el amanecer.",
    explanation: "Query reason of waking up using 'Why' + helper 'did you wake up'."
  },
  {
    id: 98,
    answer: "No, they weren't working in the office at 8 PM.",
    correctQuestion: "Were they working in the office at 8 PM?",
    clue: "Were",
    translation: "No, ellos no estaban trabajando en la oficina a las 8 PM.",
    explanation: "Ask past continuous plural yes/no with 'Were they working'."
  },
  {
    id: 99,
    answer: "They bought three packages of fresh coffee.",
    correctQuestion: "How many packages of fresh coffee did they buy?",
    clue: "How many",
    translation: "Ellos compraron tres paquetes de café fresco.",
    explanation: "Countable items purchased queried via 'How many packages... did they buy'."
  },
  {
    id: 100,
    answer: "Yes, I did. I enjoyed my flight to San Francisco.",
    correctQuestion: "Did you enjoy your flight to San Francisco?",
    clue: "Did",
    translation: "Sí, disfruté mi vuelo a San Francisco.",
    explanation: "Inquire about flight evaluation with 'Did you' + base verb 'enjoy' (not 'enjoyed')."
  }
];
