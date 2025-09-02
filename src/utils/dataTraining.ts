type Exercise = {
  id: string;
  title: string;
  series: number;
  anterior: string;
  kg: number;
  rep: number;
};

type DateWeek = {
  segunda: { exercises: Exercise[] };
  terca: { exercises: Exercise[] };
  quarta: { exercises: Exercise[] };
  quinta: { exercises: Exercise[] };
  sexta: { exercises: Exercise[] };
  sabado: { exercises: Exercise[] };
  domingo: { exercises: Exercise[] };
}[];

export const exerciseMonday = [
  { id: '1', title: 'Supino Reto com Barra', series: 4, anterior: '50 x 8', kg: 55, rep: 8 },
  { id: '2', title: 'Supino Inclinado com Halteres', series: 3, anterior: '40 x 10', kg: 45, rep: 10 },
  { id: '3', title: 'Crucifixo com Halteres', series: 4, anterior: '20 x 12', kg: 25, rep: 12 },
  { id: '4', title: 'Crossover na Polia', series: 5, anterior: '30 x 12', kg: 35, rep: 12 },
  { id: '5', title: 'Pullover com Halter', series: 3, anterior: '25 x 10', kg: 30, rep: 10 },
  { id: '6', title: 'Tríceps Testa com Barra EZ', series: 3, anterior: '20 x 12', kg: 25, rep: 12 },
  { id: '7', title: 'Tríceps Coice com Halteres', series: 4, anterior: '15 x 15', kg: 20, rep: 15 },
  { id: '8', title: 'Paralelas para Tríceps', series: 2, anterior: '00 x 10', kg: 0, rep: 10 },
];

export const exerciseTuesday = [
  { id: '1', title: 'Barra Fixa Pronada', series: 4, anterior: '00 x 8', kg: 0, rep: 8 },
  { id: '2', title: 'Remada Curvada com Barra', series: 4, anterior: '50 x 10', kg: 55, rep: 10 },
  { id: '3', title: 'Pulldown na Polia', series: 3, anterior: '60 x 12', kg: 65, rep: 12 },
  { id: '4', title: 'Remada Unilateral com Halter', series: 3, anterior: '25 x 12', kg: 30, rep: 12 },
  { id: '5', title: 'Rosca Direta com Barra', series: 4, anterior: '20 x 10', kg: 25, rep: 10 },
  { id: '6', title: 'Rosca Martelo com Halteres', series: 3, anterior: '15 x 12', kg: 18, rep: 12 },
  { id: '7', title: 'Rosca Concentrada', series: 3, anterior: '10 x 15', kg: 12, rep: 15 },
  { id: '8', title: 'Rosca Scott na Polia', series: 3, anterior: '20 x 12', kg: 25, rep: 12 },
];

export const exerciseWednesday = [
  { id: '1', title: 'Agachamento Livre', series: 4, anterior: '80 x 8', kg: 85, rep: 8 },
  { id: '2', title: 'Leg Press 45º', series: 4, anterior: '120 x 10', kg: 130, rep: 10 },
  { id: '3', title: 'Passada com Halteres', series: 3, anterior: '20 x 12', kg: 25, rep: 12 },
  { id: '4', title: 'Cadeira Extensora', series: 3, anterior: '50 x 12', kg: 55, rep: 12 },
  { id: '5', title: 'Cadeira Flexora', series: 3, anterior: '40 x 12', kg: 45, rep: 12 },
  { id: '6', title: 'Panturrilha no Smith', series: 4, anterior: '60 x 15', kg: 65, rep: 15 },
  { id: '7', title: 'Panturrilha Sentada', series: 3, anterior: '30 x 20', kg: 35, rep: 20 },
  { id: '8', title: 'Elevação Pélvica', series: 3, anterior: '00 x 15', kg: 0, rep: 15 },
];

export const exerciseThursday = [
  { id: '1', title: 'Desenvolvimento com Barra', series: 4, anterior: '40 x 8', kg: 45, rep: 8 },
  { id: '2', title: 'Elevação Lateral com Halteres', series: 3, anterior: '12 x 12', kg: 15, rep: 12 },
  { id: '3', title: 'Elevação Frontal com Halteres', series: 3, anterior: '10 x 12', kg: 12, rep: 12 },
  { id: '4', title: 'Remada Alta na Polia', series: 3, anterior: '30 x 10', kg: 35, rep: 10 },
  { id: '5', title: 'Abdominal Prancha', series: 3, anterior: '00 x 30s', kg: 0, rep: 30 },
  { id: '6', title: 'Abdominal Infra com Banco', series: 4, anterior: '00 x 15', kg: 0, rep: 15 },
  { id: '7', title: 'Abdominal Oblíquo com Rotação', series: 3, anterior: '00 x 20', kg: 0, rep: 20 },
  { id: '8', title: 'Abdominal Crunch na Polia', series: 3, anterior: '20 x 12', kg: 25, rep: 12 },
];

export const exerciseFriday = [
  { id: '1', title: 'Supino Reto com Halteres', series: 4, anterior: '35 x 10', kg: 40, rep: 10 },
  { id: '2', title: 'Supino Declinado com Barra', series: 3, anterior: '60 x 8', kg: 65, rep: 8 },
  { id: '3', title: 'Crucifixo Inclinado com Halteres', series: 3, anterior: '20 x 12', kg: 22, rep: 12 },
  { id: '4', title: 'Peck Deck', series: 4, anterior: '40 x 12', kg: 45, rep: 12 },
  { id: '5', title: 'Tríceps Francês com Halter', series: 3, anterior: '15 x 12', kg: 18, rep: 12 },
  { id: '6', title: 'Tríceps na Polia com Corda', series: 4, anterior: '25 x 12', kg: 30, rep: 12 },
  { id: '7', title: 'Mergulho em Banco', series: 3, anterior: '00 x 15', kg: 0, rep: 15 },
  { id: '8', title: 'Supino Fechado com Barra', series: 3, anterior: '30 x 10', kg: 35, rep: 10 },
];

export const exerciseSaturday = [
  { id: '1', title: 'Levantamento Terra', series: 4, anterior: '80 x 8', kg: 85, rep: 8 },
  { id: '2', title: 'Remada Baixa na Polia', series: 4, anterior: '50 x 12', kg: 55, rep: 12 },
  { id: '3', title: 'Pulldown Supinado', series: 3, anterior: '55 x 10', kg: 60, rep: 10 },
  { id: '4', title: 'Face Pull na Polia', series: 3, anterior: '20 x 12', kg: 25, rep: 12 },
  { id: '5', title: 'Rosca Inclinada com Halteres', series: 3, anterior: '15 x 12', kg: 18, rep: 12 },
  { id: '6', title: 'Rosca 21', series: 3, anterior: '10 x 21', kg: 12, rep: 21 },
  { id: '7', title: 'Rosca Alternada com Halteres', series: 3, anterior: '12 x 12', kg: 15, rep: 12 },
  { id: '8', title: 'Rosca na Polia Baixa', series: 3, anterior: '20 x 12', kg: 25, rep: 12 },
];

export const DateWeek: DateWeek = [
  {
    segunda: {
      exercises: exerciseMonday,
    },
    terca: {
      exercises: exerciseTuesday,
    },
    quarta: {
      exercises: exerciseWednesday,
    },
    quinta: {
      exercises: exerciseThursday,
    },
    sexta: {
      exercises: exerciseFriday,
    },
    sabado: {
      exercises: exerciseSaturday,
    },
    domingo: {
      exercises: [],
    },
  },
];