import { Motorcycle } from '../models/motorcycle.model';

/**
 * Local fallback data used when Supabase is unavailable or the table doesn't exist yet.
 * This ensures the catalog always displays motorcycles to the user.
 */
export const FALLBACK_MOTORCYCLES: Motorcycle[] = [
  {
    id: 'kaw-01', slug: 'kawasaki-z750-abs', name: 'Z750 ABS', year_range: '2007–2012',
    type: 'NAKED', image: 'assets/images/motos/kawasaki1.png', brand: 'kawasaki', price: 8200,
    stock: 1, visible: true,
    specs: {
      motor: { tipo: '4 cilindros en línea, 4T, DOHC, 16 válvulas', cilindrada_cc: 748, refrigeracion: 'Líquida', potencia_cv: 106, potencia_rpm: 10500, torque_nm: 78, torque_rpm: 8300, alimentacion: 'Inyección electrónica Keihin 32mm', transmision: '6 velocidades, cadena', velocidad_max_kmh: 235 },
      chasis: { tipo: 'Espina dorsal tubular acero', suspension_delantera: 'Horquilla invertida 41mm, 120mm recorrido', suspension_trasera: 'Uni-Trak gas, ajustable' },
      frenos: { delantero: 'Doble disco 300mm, ABS', trasero: 'Monodisco 250mm' },
      neumaticos: { delantero: '120/70-ZR17', trasero: '180/55-ZR17' },
      dimensiones: { peso_kg: 226, deposito_litros: 18.5, altura_asiento_mm: 815, distancia_ejes_mm: 1440 }
    }
  },
  {
    id: 'kaw-02', slug: 'kawasaki-ninja-300-se', name: 'Ninja 300 Special Edition', year_range: '2013–2017',
    type: 'SPORT', image: 'assets/images/motos/kawasaki2.png', brand: 'kawasaki', price: 4900,
    stock: 1, visible: true,
    specs: {
      motor: { tipo: 'Bicilíndrico en paralelo, 4T, DOHC, 8 válvulas', cilindrada_cc: 296, refrigeracion: 'Líquida', potencia_cv: 39, potencia_rpm: 11000, torque_nm: 27, torque_rpm: 10000, alimentacion: 'Inyección electrónica Keihin 32mm', transmision: '6 velocidades, cadena', velocidad_max_kmh: 175 },
      chasis: { tipo: 'Diamante acero alta resistencia', suspension_delantera: 'Horquilla telescópica 37mm, 120mm', suspension_trasera: 'Uni-Trak gas, precarga 5 clics' },
      frenos: { delantero: 'Monodisco 290mm, 2 pistones', trasero: 'Monodisco 220mm' },
      neumaticos: { delantero: '110/70-17', trasero: '140/70-17' },
      dimensiones: { peso_kg: 172, deposito_litros: 17, altura_asiento_mm: 785, distancia_ejes_mm: 1405 }
    }
  },
  {
    id: 'kaw-03', slug: 'kawasaki-ninja-h2r', name: 'Ninja H2R', year_range: '2015–presente',
    type: 'TRACK', image: 'assets/images/motos/kawasaki3.png', brand: 'kawasaki', price: 55000,
    badge_special: 'SOLO CIRCUITO', stock: 1, visible: true,
    specs: {
      motor: { tipo: '4 cilindros en línea, Supercharged', cilindrada_cc: 998, refrigeracion: 'Líquida', potencia_cv: 310, potencia_rpm: 14000, torque_nm: 165, torque_rpm: 12500, alimentacion: 'Inyección doble inyector 50mm', transmision: '6 velocidades dog-ring, KQS', velocidad_max_kmh: 400 },
      chasis: { tipo: 'Multitubular Trellis acero', suspension_delantera: 'KYB AOS-II invertida 43mm', suspension_trasera: 'Öhlins TTX36' },
      frenos: { delantero: 'Doble disco Brembo 330mm, KIBS', trasero: 'Monodisco 250mm Brembo' },
      neumaticos: { delantero: '120/600 R17 Slick', trasero: '190/650 R17 Slick' },
      dimensiones: { peso_kg: 216, deposito_litros: 17, altura_asiento_mm: 830, distancia_ejes_mm: 1450 }
    }
  },
  {
    id: 'kaw-04', slug: 'kawasaki-z1000-abs', name: 'Z1000 ABS', year_range: '2014–2021',
    type: 'NAKED', image: 'assets/images/motos/kawasaki4.png', brand: 'kawasaki', price: 11500,
    stock: 1, visible: true,
    specs: {
      motor: { tipo: '4 cilindros en línea, 4T, DOHC, 16v', cilindrada_cc: 1043, refrigeracion: 'Líquida', potencia_cv: 142, potencia_rpm: 10000, torque_nm: 111, torque_rpm: 7300, alimentacion: 'Inyección Keihin 38mm', transmision: '6 velocidades, cadena', velocidad_max_kmh: 250 },
      chasis: { tipo: 'Doble viga de aluminio', suspension_delantera: 'Showa SFF-BP invertida 41mm', suspension_trasera: 'Back-link horizontal gas' },
      frenos: { delantero: 'Doble disco 310mm, ABS', trasero: 'Monodisco 250mm' },
      neumaticos: { delantero: '120/70-ZR17', trasero: '190/50-ZR17' },
      dimensiones: { peso_kg: 221, deposito_litros: 17, altura_asiento_mm: 815, distancia_ejes_mm: 1435 }
    }
  },
  {
    id: 'kaw-05', slug: 'kawasaki-kx250f', name: 'KX250F', year_range: '2017–2018',
    type: 'OFF-ROAD', image: 'assets/images/motos/kawasaki5.png', brand: 'kawasaki', price: 7200,
    badge_special: 'MOTOCROSS', stock: 1, visible: true,
    specs: {
      motor: { tipo: 'Monocilíndrico, 4T, DOHC, 4v', cilindrada_cc: 249, refrigeracion: 'Líquida', potencia_cv: 40, potencia_rpm: 12500, torque_nm: 29, torque_rpm: 9000, alimentacion: 'Inyección digital Keihin 43mm', transmision: '5 velocidades, cadena', velocidad_max_kmh: 130 },
      chasis: { tipo: 'Perimetral de aluminio', suspension_delantera: 'Showa SFF invertida 48mm, 310mm', suspension_trasera: 'Uni-Trak Showa, 310mm' },
      frenos: { delantero: 'Monodisco 270mm Braking', trasero: 'Monodisco 240mm' },
      neumaticos: { delantero: '80/100-21', trasero: '100/90-19' },
      dimensiones: { peso_kg: 104, deposito_litros: 6.4, altura_asiento_mm: 945, distancia_ejes_mm: 1475 }
    }
  },
  {
    id: 'hond-01', slug: 'honda-cg160-fan', name: 'CG 160 Fan', year_range: '2022–presente',
    type: 'COMMUTER', image: 'assets/images/motos/honda1.png', brand: 'honda', price: 2100,
    stock: 1, visible: true,
    specs: {
      motor: { tipo: 'Monocilíndrico, 4T, OHC, 2v', cilindrada_cc: 162, refrigeracion: 'Aire', potencia_cv: 15, potencia_rpm: 8000, torque_nm: 14, torque_rpm: 6000, alimentacion: 'Inyección PGM-FI', transmision: '5 velocidades, cadena', velocidad_max_kmh: 120 },
      chasis: { tipo: 'Cuna semidoble de acero', suspension_delantera: 'Horquilla telescópica, 120mm', suspension_trasera: 'Doble amortiguador, 101mm' },
      frenos: { delantero: 'Monodisco 240mm, CBS', trasero: 'Tambor 130mm' },
      neumaticos: { delantero: '80/100-18', trasero: '90/90-18' },
      dimensiones: { peso_kg: 116, deposito_litros: 16.1, altura_asiento_mm: 790, distancia_ejes_mm: 1315 }
    }
  },
  {
    id: 'hond-02', slug: 'honda-vario-150', name: 'Vario 150 eSP', year_range: '2015–2021',
    type: 'SCOOTER', image: 'assets/images/motos/honda2.png', brand: 'honda', price: 2400,
    stock: 1, visible: true,
    specs: {
      motor: { tipo: 'Monocilíndrico, 4T, SOHC, eSP', cilindrada_cc: 150, refrigeracion: 'Líquida', potencia_cv: 13, potencia_rpm: 8500, torque_nm: 13, torque_rpm: 5000, alimentacion: 'Inyección PGM-FI', transmision: 'Automática CVT', velocidad_max_kmh: 105 },
      chasis: { tipo: 'Columna inferior tubo de acero', suspension_delantera: 'Horquilla telescópica', suspension_trasera: 'Monoamortiguador lateral' },
      frenos: { delantero: 'Monodisco hidráulico, CBS', trasero: 'Tambor' },
      neumaticos: { delantero: '90/80-14 Tubeless', trasero: '100/80-14 Tubeless' },
      dimensiones: { peso_kg: 112, deposito_litros: 5.5, altura_asiento_mm: 769, distancia_ejes_mm: 1280 }
    }
  },
  {
    id: 'hond-03', slug: 'honda-vario-110', name: 'Vario 110 FI', year_range: '2014–2020',
    type: 'SCOOTER', image: 'assets/images/motos/honda3.png', brand: 'honda', price: 1800,
    stock: 1, visible: true,
    specs: {
      motor: { tipo: 'Monocilíndrico, 4T, SOHC, eSP', cilindrada_cc: 108, refrigeracion: 'Aire forzado', potencia_cv: 8.7, potencia_rpm: 7500, torque_nm: 9.1, torque_rpm: 6000, alimentacion: 'Inyección PGM-FI', transmision: 'Automática V-Matic', velocidad_max_kmh: 90 },
      chasis: { tipo: 'Tubo de acero espina dorsal', suspension_delantera: 'Horquilla telescópica', suspension_trasera: 'Brazo oscilante monoamortiguador' },
      frenos: { delantero: 'Monodisco hidráulico, CBS', trasero: 'Tambor' },
      neumaticos: { delantero: '80/90-14 Tubeless', trasero: '90/90-14 Tubeless' },
      dimensiones: { peso_kg: 96, deposito_litros: 3.7, altura_asiento_mm: 734, distancia_ejes_mm: 1244 }
    }
  },
  {
    id: 'hond-04', slug: 'honda-cbr1000rr-fireblade', name: 'CBR 1000RR Fireblade', year_range: '2017–2019',
    type: 'SPORT', image: 'assets/images/motos/honda4.png', brand: 'honda', price: 14500,
    stock: 1, visible: true,
    specs: {
      motor: { tipo: '4 cilindros en línea, 4T, DOHC, 16v', cilindrada_cc: 999, refrigeracion: 'Líquida', potencia_cv: 192, potencia_rpm: 13000, torque_nm: 114, torque_rpm: 11000, alimentacion: 'Inyección PGM-DSFI', transmision: '6 velocidades, cadena', velocidad_max_kmh: 299 },
      chasis: { tipo: 'Diamante aluminio doble viga', suspension_delantera: 'Showa BPF invertida 43mm', suspension_trasera: 'Pro-Link Showa BFRC' },
      frenos: { delantero: 'Doble disco 320mm, ABS curva', trasero: 'Monodisco 220mm' },
      neumaticos: { delantero: '120/70-ZR17', trasero: '190/50-ZR17' },
      dimensiones: { peso_kg: 196, deposito_litros: 16.2, altura_asiento_mm: 832, distancia_ejes_mm: 1405 }
    }
  },
  {
    id: 'hond-05', slug: 'honda-cb150r-streetfire', name: 'CB150R StreetFire', year_range: '2015–2021',
    type: 'NAKED', image: 'assets/images/motos/honda5.png', brand: 'honda', price: 3500,
    stock: 1, visible: true,
    specs: {
      motor: { tipo: 'Monocilíndrico, 4T, DOHC, 4v', cilindrada_cc: 149, refrigeracion: 'Líquida', potencia_cv: 16.9, potencia_rpm: 9000, torque_nm: 13.8, torque_rpm: 7000, alimentacion: 'Inyección PGM-FI', transmision: '6 velocidades, cadena', velocidad_max_kmh: 135 },
      chasis: { tipo: 'Trellis de acero diamante', suspension_delantera: 'Horquilla telescópica, 120mm', suspension_trasera: 'Pro-Link amortiguador central' },
      frenos: { delantero: 'Monodisco 276mm Nissin', trasero: 'Monodisco 220mm' },
      neumaticos: { delantero: '100/80-17 Tubeless', trasero: '130/70-17 Tubeless' },
      dimensiones: { peso_kg: 136, deposito_litros: 12, altura_asiento_mm: 797, distancia_ejes_mm: 1293 }
    }
  },
  {
    id: 'yam-01', slug: 'yamaha-yzf-r1-2004', name: 'YZF-R1', year_range: '2004–2006',
    type: 'SPORT', image: 'assets/images/motos/yamaha1.png', brand: 'yamaha', price: 9800,
    stock: 1, visible: true,
    specs: {
      motor: { tipo: '4 cilindros en línea, 4T, DOHC, 20v', cilindrada_cc: 998, refrigeracion: 'Líquida', potencia_cv: 172, potencia_rpm: 12500, torque_nm: 104, torque_rpm: 10500, alimentacion: 'Inyección electrónica', transmision: '6 velocidades, cadena', velocidad_max_kmh: 299 },
      chasis: { tipo: 'Deltabox V de aluminio', suspension_delantera: 'Horquilla invertida Kayaba 43mm', suspension_trasera: 'Basculante aluminio monoamortiguador Kayaba' },
      frenos: { delantero: 'Doble disco 320mm Sumitomo', trasero: 'Monodisco 220mm' },
      neumaticos: { delantero: '120/70-ZR17', trasero: '190/50-ZR17' },
      dimensiones: { peso_kg: 180, deposito_litros: 18, altura_asiento_mm: 835, distancia_ejes_mm: 1395 }
    }
  },
  {
    id: 'yam-02', slug: 'yamaha-yzf-r6-60aniversario', name: 'YZF-R6 60° Aniversario', year_range: '2016',
    type: 'SPORT', image: 'assets/images/motos/yamaha2.png', brand: 'yamaha', price: 10900,
    stock: 1, visible: true,
    specs: {
      motor: { tipo: '4 cilindros en línea, 4T, DOHC, 16v', cilindrada_cc: 599, refrigeracion: 'Líquida', potencia_cv: 123.7, potencia_rpm: 14500, torque_nm: 65.7, torque_rpm: 10500, alimentacion: 'Inyección YCC-T + YCC-I', transmision: '6 velocidades, cadena', velocidad_max_kmh: 260 },
      chasis: { tipo: 'Deltabox aluminio fundido', suspension_delantera: 'Horquilla invertida KYB 41mm', suspension_trasera: 'Monoamortiguador KYB depósito separado' },
      frenos: { delantero: 'Doble disco 310mm monobloque', trasero: 'Monodisco 220mm' },
      neumaticos: { delantero: '120/70-ZR17', trasero: '180/55-ZR17' },
      dimensiones: { peso_kg: 189, deposito_litros: 17, altura_asiento_mm: 850, distancia_ejes_mm: 1375 }
    }
  },
  {
    id: 'yam-03', slug: 'yamaha-mt10', name: 'MT-10', year_range: '2016–presente',
    type: 'NAKED', image: 'assets/images/motos/yamaha3.png', brand: 'yamaha', price: 13200,
    stock: 1, visible: true,
    specs: {
      motor: { tipo: '4 cilindros Crossplane CP4, 4T, DOHC', cilindrada_cc: 998, refrigeracion: 'Líquida', potencia_cv: 160, potencia_rpm: 11500, torque_nm: 111, torque_rpm: 9000, alimentacion: 'Inyección YCC-T', transmision: '6 velocidades, Quickshifter', velocidad_max_kmh: 250 },
      chasis: { tipo: 'Deltabox de aluminio', suspension_delantera: 'Horquilla invertida KYB 43mm', suspension_trasera: 'Amortiguador KYB tipo bieleta' },
      frenos: { delantero: 'Doble disco 320mm, ABS', trasero: 'Monodisco 220mm' },
      neumaticos: { delantero: '120/70-ZR17', trasero: '190/55-ZR17' },
      dimensiones: { peso_kg: 210, deposito_litros: 17, altura_asiento_mm: 825, distancia_ejes_mm: 1400 }
    }
  },
  {
    id: 'yam-04', slug: 'yamaha-fz16', name: 'FZ16 / FZ-S', year_range: '2008–2014',
    type: 'NAKED', image: 'assets/images/motos/yamaha4.png', brand: 'yamaha', price: 2600,
    stock: 1, visible: true,
    specs: {
      motor: { tipo: 'Monocilíndrico, 4T, SOHC, 2v', cilindrada_cc: 153, refrigeracion: 'Aire', potencia_cv: 14, potencia_rpm: 7500, torque_nm: 13.6, torque_rpm: 6000, alimentacion: 'Carburador BS26', transmision: '5 velocidades, cadena', velocidad_max_kmh: 115 },
      chasis: { tipo: 'Diamante tubo de acero', suspension_delantera: 'Horquilla telescópica 41mm, 130mm', suspension_trasera: 'Monocross amortiguador ajustable' },
      frenos: { delantero: 'Monodisco 267mm, 2 pistones', trasero: 'Tambor 130mm' },
      neumaticos: { delantero: '100/80-17', trasero: '140/60-R17' },
      dimensiones: { peso_kg: 135, deposito_litros: 12, altura_asiento_mm: 790, distancia_ejes_mm: 1334 }
    }
  },
  {
    id: 'yam-05', slug: 'yamaha-aerox-155', name: 'Aerox 155 (NVX 155)', year_range: '2016–presente',
    type: 'SCOOTER', image: 'assets/images/motos/yamaha5.png', brand: 'yamaha', price: 3400,
    stock: 1, visible: true,
    specs: {
      motor: { tipo: 'Monocilíndrico, 4T, SOHC, 4v, VVA', cilindrada_cc: 155, refrigeracion: 'Líquida', potencia_cv: 15.4, potencia_rpm: 8000, torque_nm: 13.9, torque_rpm: 6500, alimentacion: 'Inyección electrónica FI', transmision: 'Automática CVT', velocidad_max_kmh: 120 },
      chasis: { tipo: 'Subchasis columna inferior acero', suspension_delantera: 'Horquilla telescópica', suspension_trasera: 'Doble amortiguador basculante' },
      frenos: { delantero: 'Monodisco 230mm, ABS monocanal', trasero: 'Tambor 130mm' },
      neumaticos: { delantero: '110/80-14 Tubeless', trasero: '140/70-14 Tubeless' },
      dimensiones: { peso_kg: 122, deposito_litros: 5.5, altura_asiento_mm: 790, distancia_ejes_mm: 1350 }
    }
  },
  {
    id: 'suzu-01', slug: 'suzuki-inazuma-250', name: 'Inazuma 250 / GW250', year_range: '2012–2017',
    type: 'NAKED', image: 'assets/images/motos/suzuki1.png', brand: 'suzuki', price: 3800,
    stock: 1, visible: true,
    specs: {
      motor: { tipo: 'Bicilíndrico paralelo, 4T, SOHC, 4v', cilindrada_cc: 248, refrigeracion: 'Líquida', potencia_cv: 24.4, potencia_rpm: 8500, torque_nm: 22, torque_rpm: 6500, alimentacion: 'Inyección electrónica', transmision: '6 velocidades, cadena', velocidad_max_kmh: 135 },
      chasis: { tipo: 'Semi-cuna doble acero', suspension_delantera: 'Horquilla telescópica KYB, 120mm', suspension_trasera: 'Monoamortiguador KYB, 7 posiciones' },
      frenos: { delantero: 'Monodisco 290mm Nissin', trasero: 'Monodisco 240mm Nissin' },
      neumaticos: { delantero: '110/80-17', trasero: '140/70-17' },
      dimensiones: { peso_kg: 183, deposito_litros: 13.3, altura_asiento_mm: 780, distancia_ejes_mm: 1430 }
    }
  },
  {
    id: 'suzu-02', slug: 'suzuki-gsx-r150', name: 'GSX-R150', year_range: '2017–presente',
    type: 'SPORT', image: 'assets/images/motos/suzuki2.png', brand: 'suzuki', price: 3900,
    stock: 1, visible: true,
    specs: {
      motor: { tipo: 'Monocilíndrico, 4T, DOHC, 4v', cilindrada_cc: 147, refrigeracion: 'Líquida', potencia_cv: 19, potencia_rpm: 10500, torque_nm: 14, torque_rpm: 9000, alimentacion: 'Inyección electrónica', transmision: '6 velocidades, cadena', velocidad_max_kmh: 145 },
      chasis: { tipo: 'Diamante tubo de acero', suspension_delantera: 'Horquilla telescópica, 120mm', suspension_trasera: 'Monoamortiguador tipo Link' },
      frenos: { delantero: 'Monodisco 290mm, ABS', trasero: 'Monodisco 187mm' },
      neumaticos: { delantero: '90/80-17 Tubeless', trasero: '130/70-17 Tubeless' },
      dimensiones: { peso_kg: 131, deposito_litros: 11, altura_asiento_mm: 785, distancia_ejes_mm: 1300 }
    }
  },
  {
    id: 'suzu-03', slug: 'suzuki-gsx-s1000', name: 'GSX-S1000 ABS', year_range: '2015–presente',
    type: 'NAKED', image: 'assets/images/motos/suzuki3.png', brand: 'suzuki', price: 11900,
    stock: 1, visible: true,
    specs: {
      motor: { tipo: '4 cilindros en línea, 4T, DOHC, 16v', cilindrada_cc: 999, refrigeracion: 'Líquida', potencia_cv: 150, potencia_rpm: 10000, torque_nm: 108, torque_rpm: 9500, alimentacion: 'Inyección SDTV Keihin', transmision: '6 velocidades, cadena', velocidad_max_kmh: 250 },
      chasis: { tipo: 'Doble viga aluminio', suspension_delantera: 'Horquilla invertida KYB 43mm', suspension_trasera: 'Monoamortiguador gas tipo link' },
      frenos: { delantero: 'Doble disco 310mm Brembo, ABS', trasero: 'Monodisco 250mm Nissin' },
      neumaticos: { delantero: '120/70-ZR17', trasero: '190/50-ZR17' },
      dimensiones: { peso_kg: 209, deposito_litros: 17, altura_asiento_mm: 810, distancia_ejes_mm: 1460 }
    }
  },
  {
    id: 'suzu-04', slug: 'suzuki-gsx-r1000', name: 'GSX-R1000 ABS / R', year_range: '2017–2022',
    type: 'SPORT', image: 'assets/images/motos/suzuki4.png', brand: 'suzuki', price: 16500,
    stock: 1, visible: true,
    specs: {
      motor: { tipo: '4 cilindros en línea, 4T, DOHC, SR-VVT', cilindrada_cc: 1000, refrigeracion: 'Líquida', potencia_cv: 202, potencia_rpm: 13200, torque_nm: 117.6, torque_rpm: 10800, alimentacion: 'Inyección doble inyector S-FI', transmision: '6 velocidades, Quickshifter', velocidad_max_kmh: 299 },
      chasis: { tipo: 'Doble viga perimetral aluminio', suspension_delantera: 'Showa BFF invertida', suspension_trasera: 'Showa BFRC lite multirregulable' },
      frenos: { delantero: 'Doble disco Brembo 320mm, Motion Track ABS', trasero: 'Monodisco 220mm Nissin' },
      neumaticos: { delantero: '120/70-ZR17', trasero: '190/55-ZR17' },
      dimensiones: { peso_kg: 203, deposito_litros: 16, altura_asiento_mm: 825, distancia_ejes_mm: 1420 }
    }
  },
  {
    id: 'suzu-05', slug: 'suzuki-gixxer-150', name: 'Gixxer 150 Naked', year_range: '2019–presente',
    type: 'NAKED', image: 'assets/images/motos/suzuki5.png', brand: 'suzuki', price: 2800,
    stock: 1, visible: true,
    specs: {
      motor: { tipo: 'Monocilíndrico, 4T, SOHC, 2v, SEP', cilindrada_cc: 155, refrigeracion: 'Aire', potencia_cv: 13.6, potencia_rpm: 8000, torque_nm: 13.8, torque_rpm: 6000, alimentacion: 'Inyección electrónica', transmision: '5 velocidades, cadena', velocidad_max_kmh: 115 },
      chasis: { tipo: 'Cuna diamante acero', suspension_delantera: 'Horquilla telescópica 41mm, 120mm', suspension_trasera: 'Monoamortiguador hidráulico' },
      frenos: { delantero: 'Monodisco 266mm Bybre, ABS', trasero: 'Monodisco 220mm' },
      neumaticos: { delantero: '100/80-17 Tubeless', trasero: '140/60R-17 Tubeless' },
      dimensiones: { peso_kg: 140, deposito_litros: 12, altura_asiento_mm: 795, distancia_ejes_mm: 1335 }
    }
  }
];
