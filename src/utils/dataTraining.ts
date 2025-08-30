type Exercise = {
  id: string;
  title: string;
  series: number;
  anterior: string;
  kg: number;
  rep: number;
};

export const exerciseData = [
  { id: '1', title: 'Supino Reto com Barra', series: 4, anterior: '50 x 8', kg: 55, rep: 8 },
  { id: '2', title: 'Supino Inclinado com Halteres', series: 3, anterior: '40 x 10', kg: 45, rep: 10 },
  { id: '3', title: 'Crucifixo com Halteres', series: 4, anterior: '20 x 12', kg: 25, rep: 12 },
  { id: '4', title: 'Crossover na Polia', series: 5, anterior: '30 x 12', kg: 35, rep: 12 },
  { id: '5', title: 'Pullover com Halter', series: 3, anterior: '25 x 10', kg: 30, rep: 10 },
  { id: '6', title: 'Tríceps Testa com Barra EZ', series: 3, anterior: '20 x 12', kg: 25, rep: 12 },
  { id: '7', title: 'Tríceps Coice com Halteres', series: 4, anterior: '15 x 15', kg: 20, rep: 15 },
  { id: '8', title: 'Paralelas para Tríceps', series: 2, anterior: '00 x 10', kg: 0, rep: 10 }
];