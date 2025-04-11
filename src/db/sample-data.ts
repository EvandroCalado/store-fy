import { hashSync } from 'bcrypt-ts-edge';

export const sampleData = {
  users: [
    {
      name: 'Admin',
      email: 'admin@example.com',
      password: hashSync('123456'),
      role: 'admin',
    },
    {
      name: 'User',
      email: 'user@example.com',
      password: hashSync('123456'),
      role: 'user',
    },
  ],
  products: [
    {
      name: 'cadeira elephant eames',
      slug: 'cadeira-elephant-eames',
      category: 'bancos',
      description:
        'Charles e Ray Eames desenvolveram um elefante de brinquedo feito de compensado em 1945.',
      details:
        'No início da década de 1940, Charles e Ray Eames passaram vários anos desenvolvendo e refinando uma técnica para moldar compensado em formas tridimensionais, criando uma série de móveis e esculturas no processo. Entre esses desenhos iniciais, o elefante em duas partes provou ser o mais desafiador tecnicamente devido às suas curvas compostas apertadas, e a peça nunca entrou em produção em série. Um protótipo, que foi dado à filha de 14 anos de Charles, Lucia Eames, foi emprestado ao Museu de Arte Moderna de Nova York para uma exposição de 1946. Ainda está na posse da família Eames hoje.',
      images: ['/products/product-1-1.jpg', '/products/product-1-2.jpg'],
      price: 1799,
      brand: 'vitra',
      rating: 4.5,
      numReviews: 10,
      stock: 5,
      isFeatured: true,
      banner: '/banners/banner-1.webp',
    },
    {
      name: 'banco decorativo puppy',
      slug: 'banco-decorativo-puppy',
      category: 'bancos',
      description:
        'Puppy é um cachorrinho cujo objetivo era ver através dos olhos das crianças quando elas desenham filhotes.',
      details:
        'A cabeça, corpo e pernas são formas arredondadas e essenciais que ganham vida em um objeto amigável, brincalhão, durável e colorido. Feita de polietileno e produzida com moldagem rotacional, a peça é garantida como resistente e leve, pronta para intermináveis momentos de brincadeira e diversão, tanto em casa quanto ao ar livre. Com quatro tamanhos diferentes, crie uma composição decorativa e lúdica no quarto das crianças, brinquedoteca ou qualquer outro ambiente infantil. Use também como uma banqueta. Adequado para uso ao ar livre.',
      images: ['/products/product-2-1.png', '/products/product-2-2.jpg'],
      price: 1599.99,
      brand: 'magis design',
      rating: 4.2,
      numReviews: 8,
      stock: 10,
      isFeatured: true,
      banner: '/banners/banner-2.webp',
    },
    {
      name: 'banco jeri',
      slug: 'banco-jeri',
      category: 'bancos',
      description:
        'Versátil e irreverente, este móvel foi projetado para funcionar em ambos os lados.',
      details:
        'Com design contemporâneo e traços arrojados, a Mesa lateral Iracema foi inspirada na cadeira Saci do mestre Morito Ebine. Feita em madeira maciça executada artesanalmente, a Mesa Iracema utiliza técnicas da marcenaria tradicional com encaixes sem o auxílio de elementos metálicos como pregos ou parafusos, o que garante a peça uma vida útil mais longa. Um dos destaques da Mesa Iracema é a regulagem de altura em dois níveis ( xxcm e xxcm), permitindo ajustá-la de acordo com suas necessidades. O tampo em forma de gota é sustentado por uma haste inclinada proporcionando um visual único e moderno. Seja como um complemento elegante para a sala de estar ou como um suporte funcional ao lado de uma poltrona ou como mesa de cabeceira, a Mesa Iracema une a estética contemporânea à qualidade da marcenaria tradicional, criando uma peça versátil e sofisticada para qualquer ambiente.',
      images: ['/products/product-3-1.webp', '/products/product-3-2.webp'],
      price: 5199.99,
      brand: 'estúdio camarotti',
      rating: 4.9,
      numReviews: 3,
      stock: 0,
      isFeatured: false,
      banner: null,
    },
    {
      name: 'mesa pequi',
      slug: 'mesa-pequi',
      category: 'bancos',
      description:
        'Minimalista e atemporal, com design assinado por Dan Azvdo e editado pelo BehavezStudio.',
      details:
        'A mesa PEQUI, criação do designer Dan Azvdo e editada pelo BehavezStudio, além de inspirada no movimento modernista brasileiro, está diretamente ligada ao homônimo fruto do cerrado, presente na culinária de sua família e apreciado por ele desde sua infância; Os traços e todo o processo criativo para a concepção de cada peça refletem as raízes familiares do designer e sua conexão pessoal com a cultura brasileira.  Apresentada em madeiras nobres e Latão, a Mesa PEQUI integra a coleção Ancestrais, lançada com sucesso no Casa Shopping em setembro de 2023 e integrante do circuito oficial da Mostra DW!SP 24.',
      images: ['/products/product-4-1.avif', '/products/product-4-2.avif'],
      price: 7200,
      brand: 'behavez studio',
      rating: 3.6,
      numReviews: 5,
      stock: 10,
      isFeatured: false,
      banner: null,
    },
    {
      name: 'escultura eames house bird',
      slug: 'escultura-eames-house-bird',
      category: 'decoração',
      description:
        'Há mais de setenta anos que a figura de um pássaro de madeira está no centro da sala.',
      details:
        'Charles e Ray Eames enriqueceram o interior em forma de colagem de sua casa particular, a Eames House, com numerosos objetos e acessórios que trouxeram de suas viagens. Há mais de setenta anos que a figura de um pássaro de madeira está no centro da sala – um artefacto evidentemente muito apreciado pelo casal, uma vez que também aparecia frequentemente como acessório nas fotografias tiradas por Charles e Ray. Além da versão clássica lacada em preto feita de amieiro maciço, o Eames House Bird também está disponível em nogueira. As versões tingidas em verde escuro ou rosa pálido fazem parte da Coleção Especial Eames 2023 e estarão disponíveis apenas até o final de janeiro de 2024.',
      images: ['/products/product-5-1.png', '/products/product-5-2.jpg'],
      price: 3552,
      brand: 'vitra',
      rating: 4.7,
      numReviews: 18,
      stock: 6,
      isFeatured: false,
      banner: null,
    },
    {
      name: 'relógio de parede polygon clock',
      slug: 'relogio-de-parede-polygon-clock',
      category: 'decoração',
      description:
        'Coleção de relógios do George Nelson, um dos maiores ícones do design.',
      details:
        'Com a sua coleção de relógios de parede (1949-1960), George Nelson concebeu uma vasta gama de relógios, muitos dos quais se tornaram ícones do design dos anos 50. Materiais : vários tipos de madeira e metal. Conteúdo do produto : movimento de relógio de quartzo de alta qualidade, bateria de 1,5 volts incluída. Origem da madeira : todos os tipos de madeira da Polônia, exceto o Fan Clock: Cereja americana (Prunus serotina) dos EUA. Tamanho (diâmetro): Ø 35,0 cm',
      images: ['/products/product-6-1.png', '/products/product-6-2.jpg'],
      price: 11795,
      brand: 'vitra',
      rating: 4.6,
      numReviews: 12,
      stock: 8,
      isFeatured: true,
      banner: null,
    },
    {
      name: 'luminária olivia',
      slug: 'luminaria-olivia',
      category: 'luminárias',
      description:
        'A luminária OLIVIA possui luz direta e difusa que pode ser direcionada pelo giro da cúpula ou da haste.',
      details:
        'Uma cúpula cilíndrica metálica que aloja a fonte de luz gira tendo como eixo um tubo metálico curvo que conduz o fio internamente. Fixada na parede. Alimentação por tomada e acionamento por interruptor meio cordão, possui como acessório um peso para manter o fio esticado.',
      images: ['/products/product-7-1.png', '/products/product-7-2.jpg'],
      price: 1130.17,
      brand: 'estúdio rk',
      rating: 4.6,
      numReviews: 12,
      stock: 8,
      isFeatured: true,
      banner: null,
    },
    {
      name: 'luminária baobá',
      slug: 'luminaria-baoba',
      category: 'luminárias',
      description:
        'A Luminária BAOBÁ possui luz direcionável direta e difusa, proporcionando luz complementar de ambientes.',
      details:
        'Uma cúpula em alumínio repuxado, fonte da luz, se une por um ponto articulado à base em aço maciço usinado. Interruptor tipo clique é aplicado no fechamento da cúpula em acrílico leitoso.',
      images: ['/products/product-8-1.png', '/products/product-8-2.jpg'],
      price: 744.44,
      brand: 'estúdio rk',
      rating: 4.6,
      numReviews: 12,
      stock: 8,
      isFeatured: true,
      banner: null,
    },
  ],
};
