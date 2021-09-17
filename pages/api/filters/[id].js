import Cors from "cors";
import initMiddleware from "../../../lib/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET"],
  })
);

const rest = new (require("rest-mssql-nodejs"))({
  user: process.env.NEXT_PUBLIC_USER,
  password: process.env.NEXT_PUBLIC_PASSWORD,
  server: process.env.NEXT_PUBLIC_HOST,
  database: process.env.NEXT_PUBLIC_DATABASE,
});

export default async function getDetailsProduct(req, res) {
  // http://localhost:3000/api/filters/('CUPLASA', 'TRUPER')?categorie=ELECTRICO&first=1&last=200
  // Run cors
  await cors(req, res);
  if (req.method !== "GET") {
    res
      .status(500)
      .json({ message: "Lo sentimos, sólo aceptamos solicitudes GET" });
  }

  setTimeout(async () => {
    const result = await rest.executeQuery(`SELECT *
  FROM (
      SELECT ROW_NUMBER () OVER(ORDER BY a.FECHA_ALTA DESC) AS row_id, RTRIM(a.CLAVEART) AS articulo_id, RTRIM(a.DESC_BREVE) AS name, RTRIM(a.DESCRIBEAR) AS description, l.PREC_IVA1 AS price, RTRIM(m.DESC_MARCA) AS marca, RTRIM(c.DESCRIBECO) AS category, RTRIM(g.DESGIR) AS main_category, cast('' as xml).value(
      'xs:base64Binary(sql:column("i.IMAGEN"))', 'varchar(max)'
  ) AS image_url
  FROM ARTICULO AS a
  LEFT OUTER JOIN ARTLISTA AS l
      ON a.CLAVEART = l.CLAVEART
  LEFT OUTER JOIN ARTGIRO AS g
      ON a.CLAVEGIR = g.CLAVEGIR
  LEFT OUTER JOIN CAT_CLAS AS c
      ON a.CVE_CLAS = c.CVE_CLAS
  LEFT OUTER JOIN IMAGENES AS i
      ON a.CLAVEART = i.CAMPO1
  LEFT OUTER JOIN ART_ALM AS s
      ON a.CLAVEART = s.CLAVEART
  LEFT OUTER JOIN MARCAS AS m
      ON a.CVE_MARCA = m.CVE_MARCA
  WHERE a.HABVTAS = '' AND c.DESCRIBECO IN ${
    req.query.categorie == "todas"
      ? `('ACABADOS',
  'ACCESORIOS PARA BAÑOS',
  'ACERO',
  'ADHESIVOS Y BOQUILLAS',
  'AGRGADOS',
  'ALAMBRON',
  'ALBAÑILERIA',
  'APAGADORES CONECTORES Y PLACAS',
  'ARENA',
  'ARENILLA',
  'ARMEX',
  'BAÑOS',
  'BOQUILLAS',
  'CABLES ELECTRICOS',
  'CAL',
  'CALENTADORES',
  'CAMPANA',
  'CANCELES Y CABINAS',
  'CARPINTERIA',
  'CEMENTO',
  'CENTRO DE CARGA E INTERRUPTORES',
  'CERAMICOS',
  'CERRAJERIA',
  'CLASIFICACION',
  'CLAVO',
  'COBRE',
  'COCINA',
  'COMPLEMENTOS',
  'CPVC',
  'DEL HOGAR',
  'ELECTRICO',
  'ELECTRONICA',
  'ESPEJOS Y BOTIQUINES',
  'EXTENSIONES Y MULTICONTACTOS',
  'EXTERIOR',
  'FONTANERIA',
  'FREGADERO',
  'GALVANIZADO',
  'GENERAL',
  'GRAN FORMATO',
  'GRAVA',
  'GRAVA BASALTICA',
  'GRIFERIA',
  'HERRAMIENTAS',
  'HIDRAULICO',
  'HORNO',
  'ILUMINACION',
  'IMPERMEABILIZANTES',
  'IMPORTADOS',
  'INDUSTRIAL',
  'INTERIOR',
  'JARDINERIA',
  'LAMINAS',
  'LAVABO',
  'LLAVES Y ACCESORIOS',
  'MALLA ELECTROSOLDADA',
  'MALLAS',
  'MALLAS Y CENEFAS',
  'MANGUERAS',
  'MATERIALES DE CONSTRUCCION',
  'MECANICA',
  'MEZCLADORA',
  'MONOMANDO',
  'MORTERO',
  'MUEBLES PARA BAÑOS Y LAVABOS',
  'MUROS Y FACHADAS',
  'NACIONALES',
  'OVALINES',
  'PARRILLA',
  'PIEDRA',
  'PISOS CERAMICOS',
  'PISOS PORCELANATOS',
  'PLOMERIA',
  'POLVOS',
  'PVC',
  'RECOCIDO',
  'RECUBRIMIENTO',
  'REGADERAS',
  'RESIDENCIAL',
  'SANITARIOS',
  'SONOTUBO',
  'TEPEZIL',
  'TINACOS Y CISTERNAS',
  'TINAS E HIDROMASAJES',
  'TOCADORES',
  'TORNILLERIA',
  'TUBERIA',
  'TUBO PLUS',
  'TUBO SANITARIO',
  'VARILLA',
  'VITRO BLOCK',
  'YESO')`
      : `('${req.query.categorie.replace(/-/gi, " ")}')`
  } AND m.DESC_MARCA IN ${
      req.query.id == "()"
        ? `(
        'ORTIZ',
        'ZAZ II',
        'MEX ASIA',
        'VITROMEX',
        'EUROPLAS',
        'ADA INNOVA',
        'TERRONES',
        'SIMITRON',
        'IMCOSA',
        'GALVATUBING',
        'IDEAL',
        'TILES 2000 S.A. DE C.V.',
        'LINEA BLANCA',
        'FONTIBRE',
        'OMEGA',
        'NAVIEMPAQUES',
        'TL PLASTICOS',
        'NACOBRE',
        'APYPSA',
        'FANTASY',
        'LOWE´S',
        'ALKAR',
        'CONSTRUPISO',
        'CEMIX',
        'PLACERO',
        'LAMOSA DESCONTINUADO',
        'MAYTESA',
        'OSTER',
        'PLASTINAK',
        'TRAMONTINA',
        'TERRACOTA',
        'PROCINTAS',
        'VITROMEX 2AS',
        'FERCAMA',
        'CERPLAST',
        'BLACK',
        'PRODESA',
        'CALZAVAL',
        'ALICA',
        'CINSA',
        'DISSTON',
        'MATERIALES VASQUEZ',
        'ARGOS',
        'STA.ANITA',
        'ORTIPLAZTIK',
        'PVC',
        'MITTORI',
        'D''NOVO',
        'C.GLEZ.',
        'FENGSER',
        'KITCHEN',
        'TAVOLA',
        'BARQUERA',
        'TAURUS',
        'COME IN',
        'FIERO',
        'MT DE MEXICO',
        'FOSET',
        'LAMOSA',
        'POLIFLEX',
        'ARMHER',
        'SIMON',
        'MONARCA',
        'HAMILTON BEACH',
        'MOLDERAMA',
        'PLASTY HOME',
        'ANFORA',
        'PROCTOR SILEX',
        'CREST',
        'KARTELL',
        'PLASTITRIM',
        'LINCOLN',
        'VAP 2000',
        'ROTOPLAS',
        'HOLCIM',
        'LIBBEY',
        'REFREPET',
        'IUSA',
        'EDOMEX',
        'EUREKA MOLDEO',
        'EKCOVASCONIA',
        'TERSIL',
        'APAN',
        'CASTEL',
        'CUPLASA',
        'ALCOVA',
        'RAZTRIMEX',
        'PLASVIC',
        'PEGADURO',
        'BORIS',
        'TRUPER',
        'CUBASA',
        'VITROMEX DESCONTINUADOS',
        'POR DEFECTO',
        'CLARASOL',
        'RIM',
        'MYTEK',
        'PLASTYMET',
        'TIMESA',
        'PRETUL',
        'SERAMIK',
        'LA MEXICANA',
        'BAQUELITA',
        'SANTUL',
        'COEL')`
        : `${req.query.id}`
    } AND l.PREC_IVA1 BETWEEN ${req.query.first || 0} AND ${
      req.query.last || 100000
    } AND l.NO_LISTAP = '001' AND i.IMAGEN Is NOT NULL AND s.CVEALM IN ('0020','0007','0018','0014','0015','0002','0008','0023','0017','0028','0027')
      GROUP BY a.CLAVEART, a.DESC_BREVE, a.DESCRIBEAR, l.PREC_IVA1, m.DESC_MARCA, a.CVE_CLAS, c.DESCRIBECO, a.CLAVEGIR, g.DESGIR, i.IMAGEN, a.FECHA_ALTA
    ) AS articles_with_row_nums
    WHERE row_id BETWEEN 1 AND 20;`);

    result &&
      res.status(200).json({
        name: "Filtered products",
        method: req.method,
        total: result.data[0].length,
        data: result.data[0],
      });
  }, 1000);
}
