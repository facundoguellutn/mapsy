const paises = [
    {
      name: "Argentina",
      code: "ARG",
      currency: {
        ARS: {
          name: "Argentine peso",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/ar.png",
    },
    {
      name: "Brasil",
      code: "BRA",
      currency: {
        BRL: {
          name: "Brazilian real",
          symbol: "R$",
        },
      },
      flag: "https://flagcdn.com/w320/br.png",
    },
    {
      name: "Estados Unidos",
      code: "USA",
      currency: {
        USD: {
          name: "United States dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/us.png",
    },
    {
      name: "Uruguay",
      code: "URY",
      currency: {
        UYU: {
          name: "Uruguayan peso",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/uy.png",
    },
    {
      name: "Afganistán",
      code: "AFG",
      currency: {
        AFN: {
          name: "Afghan afghani",
          symbol: "؋",
        },
      },
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_the_Taliban.svg/320px-Flag_of_the_Taliban.svg.png",
    },
    {
      name: "Alandia",
      code: "ALA",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/ax.png",
    },
    {
      name: "Albania",
      code: "ALB",
      currency: {
        ALL: {
          name: "Albanian lek",
          symbol: "L",
        },
      },
      flag: "https://flagcdn.com/w320/al.png",
    },
    {
      name: "Alemania",
      code: "DEU",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/de.png",
    },
    {
      name: "Andorra",
      code: "AND",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/ad.png",
    },
    {
      name: "Angola",
      code: "AGO",
      currency: {
        AOA: {
          name: "Angolan kwanza",
          symbol: "Kz",
        },
      },
      flag: "https://flagcdn.com/w320/ao.png",
    },
    {
      name: "Anguilla",
      code: "AIA",
      currency: {
        XCD: {
          name: "Eastern Caribbean dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/ai.png",
    },
    {
      name: "Antigua y Barbuda",
      code: "ATG",
      currency: {
        XCD: {
          name: "Eastern Caribbean dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/ag.png",
    },
    {
      name: "Arabia Saudí",
      code: "SAU",
      currency: {
        SAR: {
          name: "Saudi riyal",
          symbol: "ر.س",
        },
      },
      flag: "https://flagcdn.com/w320/sa.png",
    },
    {
      name: "Argelia",
      code: "DZA",
      currency: {
        DZD: {
          name: "Algerian dinar",
          symbol: "د.ج",
        },
      },
      flag: "https://flagcdn.com/w320/dz.png",
    },
    {
      name: "Armenia",
      code: "ARM",
      currency: {
        AMD: {
          name: "Armenian dram",
          symbol: "֏",
        },
      },
      flag: "https://flagcdn.com/w320/am.png",
    },
    {
      name: "Aruba",
      code: "ABW",
      currency: {
        AWG: {
          name: "Aruban florin",
          symbol: "ƒ",
        },
      },
      flag: "https://flagcdn.com/w320/aw.png",
    },
    {
      name: "Australia",
      code: "AUS",
      currency: {
        AUD: {
          name: "Australian dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/au.png",
    },
    {
      name: "Austria",
      code: "AUT",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/at.png",
    },
    {
      name: "Azerbaiyán",
      code: "AZE",
      currency: {
        AZN: {
          name: "Azerbaijani manat",
          symbol: "₼",
        },
      },
      flag: "https://flagcdn.com/w320/az.png",
    },
    {
      name: "Bahamas",
      code: "BHS",
      currency: {
        BSD: {
          name: "Bahamian dollar",
          symbol: "$",
        },
        USD: {
          name: "United States dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/bs.png",
    },
    {
      name: "Bahrein",
      code: "BHR",
      currency: {
        BHD: {
          name: "Bahraini dinar",
          symbol: ".د.ب",
        },
      },
      flag: "https://flagcdn.com/w320/bh.png",
    },
    {
      name: "Bangladesh",
      code: "BGD",
      currency: {
        BDT: {
          name: "Bangladeshi taka",
          symbol: "৳",
        },
      },
      flag: "https://flagcdn.com/w320/bd.png",
    },
    {
      name: "Barbados",
      code: "BRB",
      currency: {
        BBD: {
          name: "Barbadian dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/bb.png",
    },
    {
      name: "Bélgica",
      code: "BEL",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/be.png",
    },
    {
      name: "Belice",
      code: "BLZ",
      currency: {
        BZD: {
          name: "Belize dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/bz.png",
    },
    {
      name: "Benín",
      code: "BEN",
      currency: {
        XOF: {
          name: "West African CFA franc",
          symbol: "Fr",
        },
      },
      flag: "https://flagcdn.com/w320/bj.png",
    },
    {
      name: "Bermudas",
      code: "BMU",
      currency: {
        BMD: {
          name: "Bermudian dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/bm.png",
    },
    {
      name: "Bielorrusia",
      code: "BLR",
      currency: {
        BYN: {
          name: "Belarusian ruble",
          symbol: "Br",
        },
      },
      flag: "https://flagcdn.com/w320/by.png",
    },
    {
      name: "Bolivia",
      code: "BOL",
      currency: {
        BOB: {
          name: "Bolivian boliviano",
          symbol: "Bs.",
        },
      },
      flag: "https://flagcdn.com/w320/bo.png",
    },
    {
      name: "Bosnia y Herzegovina",
      code: "BIH",
      currency: {
        BAM: {
          name: "Bosnia and Herzegovina convertible mark",
        },
      },
      flag: "https://flagcdn.com/w320/ba.png",
    },
    {
      name: "Botswana",
      code: "BWA",
      currency: {
        BWP: {
          name: "Botswana pula",
          symbol: "P",
        },
      },
      flag: "https://flagcdn.com/w320/bw.png",
    },
    {
      name: "Brunei",
      code: "BRN",
      currency: {
        BND: {
          name: "Brunei dollar",
          symbol: "$",
        },
        SGD: {
          name: "Singapore dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/bn.png",
    },
    {
      name: "Bulgaria",
      code: "BGR",
      currency: {
        BGN: {
          name: "Bulgarian lev",
          symbol: "лв",
        },
      },
      flag: "https://flagcdn.com/w320/bg.png",
    },
    {
      name: "Burkina Faso",
      code: "BFA",
      currency: {
        XOF: {
          name: "West African CFA franc",
          symbol: "Fr",
        },
      },
      flag: "https://flagcdn.com/w320/bf.png",
    },
    {
      name: "Burundi",
      code: "BDI",
      currency: {
        BIF: {
          name: "Burundian franc",
          symbol: "Fr",
        },
      },
      flag: "https://flagcdn.com/w320/bi.png",
    },
    {
      name: "Bután",
      code: "BTN",
      currency: {
        BTN: {
          name: "Bhutanese ngultrum",
          symbol: "Nu.",
        },
        INR: {
          name: "Indian rupee",
          symbol: "₹",
        },
      },
      flag: "https://flagcdn.com/w320/bt.png",
    },
    {
      name: "Cabo Verde",
      code: "CPV",
      currency: {
        CVE: {
          name: "Cape Verdean escudo",
          symbol: "Esc",
        },
      },
      flag: "https://flagcdn.com/w320/cv.png",
    },
    {
      name: "Camboya",
      code: "KHM",
      currency: {
        KHR: {
          name: "Cambodian riel",
          symbol: "៛",
        },
        USD: {
          name: "United States dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/kh.png",
    },
    {
      name: "Camerún",
      code: "CMR",
      currency: {
        XAF: {
          name: "Central African CFA franc",
          symbol: "Fr",
        },
      },
      flag: "https://flagcdn.com/w320/cm.png",
    },
    {
      name: "Canadá",
      code: "CAN",
      currency: {
        CAD: {
          name: "Canadian dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/ca.png",
    },
    {
      name: "Caribe Neerlandés",
      code: "BES",
      currency: {
        USD: {
          name: "United States dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/bq.png",
    },
    {
      name: "Catar",
      code: "QAT",
      currency: {
        QAR: {
          name: "Qatari riyal",
          symbol: "ر.ق",
        },
      },
      flag: "https://flagcdn.com/w320/qa.png",
    },
    {
      name: "Chad",
      code: "TCD",
      currency: {
        XAF: {
          name: "Central African CFA franc",
          symbol: "Fr",
        },
      },
      flag: "https://flagcdn.com/w320/td.png",
    },
    {
      name: "Chequia",
      code: "CZE",
      currency: {
        CZK: {
          name: "Czech koruna",
          symbol: "Kč",
        },
      },
      flag: "https://flagcdn.com/w320/cz.png",
    },
    {
      name: "Chile",
      code: "CHL",
      currency: {
        CLP: {
          name: "Chilean peso",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/cl.png",
    },
    {
      name: "China",
      code: "CHN",
      currency: {
        CNY: {
          name: "Chinese yuan",
          symbol: "¥",
        },
      },
      flag: "https://flagcdn.com/w320/cn.png",
    },
    {
      name: "Chipre",
      code: "CYP",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/cy.png",
    },
    {
      name: "Ciudad del Vaticano",
      code: "VAT",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/va.png",
    },
    {
      name: "Colombia",
      code: "COL",
      currency: {
        COP: {
          name: "Colombian peso",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/co.png",
    },
    {
      name: "Comoras",
      code: "COM",
      currency: {
        KMF: {
          name: "Comorian franc",
          symbol: "Fr",
        },
      },
      flag: "https://flagcdn.com/w320/km.png",
    },
    {
      name: "Congo",
      code: "COG",
      currency: {
        XAF: {
          name: "Central African CFA franc",
          symbol: "Fr",
        },
      },
      flag: "https://flagcdn.com/w320/cg.png",
    },
    {
      name: "Congo (Rep. Dem.)",
      code: "COD",
      currency: {
        CDF: {
          name: "Congolese franc",
          symbol: "FC",
        },
      },
      flag: "https://flagcdn.com/w320/cd.png",
    },
    {
      name: "Corea del Norte",
      code: "PRK",
      currency: {
        KPW: {
          name: "North Korean won",
          symbol: "₩",
        },
      },
      flag: "https://flagcdn.com/w320/kp.png",
    },
    {
      name: "Corea del Sur",
      code: "KOR",
      currency: {
        KRW: {
          name: "South Korean won",
          symbol: "₩",
        },
      },
      flag: "https://flagcdn.com/w320/kr.png",
    },
    {
      name: "Costa de Marfil",
      code: "CIV",
      currency: {
        XOF: {
          name: "West African CFA franc",
          symbol: "Fr",
        },
      },
      flag: "https://flagcdn.com/w320/ci.png",
    },
    {
      name: "Costa Rica",
      code: "CRI",
      currency: {
        CRC: {
          name: "Costa Rican colón",
          symbol: "₡",
        },
      },
      flag: "https://flagcdn.com/w320/cr.png",
    },
    {
      name: "Croacia",
      code: "HRV",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/hr.png",
    },
    {
      name: "Cuba",
      code: "CUB",
      currency: {
        CUC: {
          name: "Cuban convertible peso",
          symbol: "$",
        },
        CUP: {
          name: "Cuban peso",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/cu.png",
    },
    {
      name: "Curazao",
      code: "CUW",
      currency: {
        ANG: {
          name: "Netherlands Antillean guilder",
          symbol: "ƒ",
        },
      },
      flag: "https://flagcdn.com/w320/cw.png",
    },
    {
      name: "Dinamarca",
      code: "DNK",
      currency: {
        DKK: {
          name: "Danish krone",
          symbol: "kr",
        },
      },
      flag: "https://flagcdn.com/w320/dk.png",
    },
    {
      name: "Djibouti",
      code: "DJI",
      currency: {
        DJF: {
          name: "Djiboutian franc",
          symbol: "Fr",
        },
      },
      flag: "https://flagcdn.com/w320/dj.png",
    },
    {
      name: "Dominica",
      code: "DMA",
      currency: {
        XCD: {
          name: "Eastern Caribbean dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/dm.png",
    },
    {
      name: "Ecuador",
      code: "ECU",
      currency: {
        USD: {
          name: "United States dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/ec.png",
    },
    {
      name: "Egipto",
      code: "EGY",
      currency: {
        EGP: {
          name: "Egyptian pound",
          symbol: "£",
        },
      },
      flag: "https://flagcdn.com/w320/eg.png",
    },
    {
      name: "El Salvador",
      code: "SLV",
      currency: {
        USD: {
          name: "United States dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/sv.png",
    },
    {
      name: "Emiratos Árabes Unidos",
      code: "ARE",
      currency: {
        AED: {
          name: "United Arab Emirates dirham",
          symbol: "د.إ",
        },
      },
      flag: "https://flagcdn.com/w320/ae.png",
    },
    {
      name: "Eritrea",
      code: "ERI",
      currency: {
        ERN: {
          name: "Eritrean nakfa",
          symbol: "Nfk",
        },
      },
      flag: "https://flagcdn.com/w320/er.png",
    },
    {
      name: "Eslovenia",
      code: "SVN",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/si.png",
    },
    {
      name: "España",
      code: "ESP",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/es.png",
    },
    {
      name: "Estonia",
      code: "EST",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/ee.png",
    },
    {
      name: "Etiopía",
      code: "ETH",
      currency: {
        ETB: {
          name: "Ethiopian birr",
          symbol: "Br",
        },
      },
      flag: "https://flagcdn.com/w320/et.png",
    },
    {
      name: "Filipinas",
      code: "PHL",
      currency: {
        PHP: {
          name: "Philippine peso",
          symbol: "₱",
        },
      },
      flag: "https://flagcdn.com/w320/ph.png",
    },
    {
      name: "Finlandia",
      code: "FIN",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/fi.png",
    },
    {
      name: "Fiyi",
      code: "FJI",
      currency: {
        FJD: {
          name: "Fijian dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/fj.png",
    },
    {
      name: "Francia",
      code: "FRA",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/fr.png",
    },
    {
      name: "Gabón",
      code: "GAB",
      currency: {
        XAF: {
          name: "Central African CFA franc",
          symbol: "Fr",
        },
      },
      flag: "https://flagcdn.com/w320/ga.png",
    },
    {
      name: "Gambia",
      code: "GMB",
      currency: {
        GMD: {
          name: "dalasi",
          symbol: "D",
        },
      },
      flag: "https://flagcdn.com/w320/gm.png",
    },
    {
      name: "Georgia",
      code: "GEO",
      currency: {
        GEL: {
          name: "lari",
          symbol: "₾",
        },
      },
      flag: "https://flagcdn.com/w320/ge.png",
    },
    {
      name: "Ghana",
      code: "GHA",
      currency: {
        GHS: {
          name: "Ghanaian cedi",
          symbol: "₵",
        },
      },
      flag: "https://flagcdn.com/w320/gh.png",
    },
    {
      name: "Gibraltar",
      code: "GIB",
      currency: {
        GIP: {
          name: "Gibraltar pound",
          symbol: "£",
        },
      },
      flag: "https://flagcdn.com/w320/gi.png",
    },
    {
      name: "Grecia",
      code: "GRC",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/gr.png",
    },
    {
      name: "Grenada",
      code: "GRD",
      currency: {
        XCD: {
          name: "Eastern Caribbean dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/gd.png",
    },
    {
      name: "Groenlandia",
      code: "GRL",
      currency: {
        DKK: {
          name: "krone",
          symbol: "kr.",
        },
      },
      flag: "https://flagcdn.com/w320/gl.png",
    },
    {
      name: "Guadalupe",
      code: "GLP",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/gp.png",
    },
    {
      name: "Guam",
      code: "GUM",
      currency: {
        USD: {
          name: "United States dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/gu.png",
    },
    {
      name: "Guatemala",
      code: "GTM",
      currency: {
        GTQ: {
          name: "Guatemalan quetzal",
          symbol: "Q",
        },
      },
      flag: "https://flagcdn.com/w320/gt.png",
    },
    {
      name: "Guayana Francesa",
      code: "GUF",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/gf.png",
    },
    {
      name: "Guernsey",
      code: "GGY",
      currency: {
        GBP: {
          name: "British pound",
          symbol: "£",
        },
        GGP: {
          name: "Guernsey pound",
          symbol: "£",
        },
      },
      flag: "https://flagcdn.com/w320/gg.png",
    },
    {
      name: "Guinea",
      code: "GIN",
      currency: {
        GNF: {
          name: "Guinean franc",
          symbol: "Fr",
        },
      },
      flag: "https://flagcdn.com/w320/gn.png",
    },
    {
      name: "Guinea Ecuatorial",
      code: "GNQ",
      currency: {
        XAF: {
          name: "Central African CFA franc",
          symbol: "Fr",
        },
      },
      flag: "https://flagcdn.com/w320/gq.png",
    },
    {
      name: "Guinea-Bisáu",
      code: "GNB",
      currency: {
        XOF: {
          name: "West African CFA franc",
          symbol: "Fr",
        },
      },
      flag: "https://flagcdn.com/w320/gw.png",
    },
    {
      name: "Guyana",
      code: "GUY",
      currency: {
        GYD: {
          name: "Guyanese dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/gy.png",
    },
    {
      name: "Haití",
      code: "HTI",
      currency: {
        HTG: {
          name: "Haitian gourde",
          symbol: "G",
        },
      },
      flag: "https://flagcdn.com/w320/ht.png",
    },
    {
      name: "Honduras",
      code: "HND",
      currency: {
        HNL: {
          name: "Honduran lempira",
          symbol: "L",
        },
      },
      flag: "https://flagcdn.com/w320/hn.png",
    },
    {
      name: "Hong Kong",
      code: "HKG",
      currency: {
        HKD: {
          name: "Hong Kong dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/hk.png",
    },
    {
      name: "Hungría",
      code: "HUN",
      currency: {
        HUF: {
          name: "Hungarian forint",
          symbol: "Ft",
        },
      },
      flag: "https://flagcdn.com/w320/hu.png",
    },
    {
      name: "India",
      code: "IND",
      currency: {
        INR: {
          name: "Indian rupee",
          symbol: "₹",
        },
      },
      flag: "https://flagcdn.com/w320/in.png",
    },
    {
      name: "Indonesia",
      code: "IDN",
      currency: {
        IDR: {
          name: "Indonesian rupiah",
          symbol: "Rp",
        },
      },
      flag: "https://flagcdn.com/w320/id.png",
    },
    {
      name: "Irak",
      code: "IRQ",
      currency: {
        IQD: {
          name: "Iraqi dinar",
          symbol: "ع.د",
        },
      },
      flag: "https://flagcdn.com/w320/iq.png",
    },
    {
      name: "Iran",
      code: "IRN",
      currency: {
        IRR: {
          name: "Iranian rial",
          symbol: "﷼",
        },
      },
      flag: "https://flagcdn.com/w320/ir.png",
    },
    {
      name: "Irlanda",
      code: "IRL",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/ie.png",
    },
    {
      name: "Isla de Man",
      code: "IMN",
      currency: {
        GBP: {
          name: "British pound",
          symbol: "£",
        },
        IMP: {
          name: "Manx pound",
          symbol: "£",
        },
      },
      flag: "https://flagcdn.com/w320/im.png",
    },
    {
      name: "Isla de Navidad",
      code: "CXR",
      currency: {
        AUD: {
          name: "Australian dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/cx.png",
    },
    {
      name: "Isla de Norfolk",
      code: "NFK",
      currency: {
        AUD: {
          name: "Australian dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/nf.png",
    },
    {
      name: "Islandia",
      code: "ISL",
      currency: {
        ISK: {
          name: "Icelandic króna",
          symbol: "kr",
        },
      },
      flag: "https://flagcdn.com/w320/is.png",
    },
    {
      name: "Islas Caimán",
      code: "CYM",
      currency: {
        KYD: {
          name: "Cayman Islands dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/ky.png",
    },
    {
      name: "Islas Cocos o Islas Keeling",
      code: "CCK",
      currency: {
        AUD: {
          name: "Australian dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/cc.png",
    },
    {
      name: "Islas Cook",
      code: "COK",
      currency: {
        CKD: {
          name: "Cook Islands dollar",
          symbol: "$",
        },
        NZD: {
          name: "New Zealand dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/ck.png",
    },
    {
      name: "Islas Faroe",
      code: "FRO",
      currency: {
        DKK: {
          name: "Danish krone",
          symbol: "kr",
        },
        FOK: {
          name: "Faroese króna",
          symbol: "kr",
        },
      },
      flag: "https://flagcdn.com/w320/fo.png",
    },
    {
      name: "Islas Georgias del Sur y Sandwich del Sur",
      code: "SGS",
      currency: {
        SHP: {
          name: "Saint Helena pound",
          symbol: "£",
        },
      },
      flag: "https://flagcdn.com/w320/gs.png",
    },
    {
      name: "Islas Malvinas",
      code: "FLK",
      currency: {
        FKP: {
          name: "Falkland Islands pound",
          symbol: "£",
        },
      },
      flag: "https://flagcdn.com/w320/fk.png",
    },
    {
      name: "Islas Marianas del Norte",
      code: "MNP",
      currency: {
        USD: {
          name: "United States dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/mp.png",
    },
    {
      name: "Islas Marshall",
      code: "MHL",
      currency: {
        USD: {
          name: "United States dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/mh.png",
    },
    {
      name: "Islas Pitcairn",
      code: "PCN",
      currency: {
        NZD: {
          name: "New Zealand dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/pn.png",
    },
    {
      name: "Islas Salomón",
      code: "SLB",
      currency: {
        SBD: {
          name: "Solomon Islands dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/sb.png",
    },
    {
      name: "Islas Svalbard y Jan Mayen",
      code: "SJM",
      currency: {
        NOK: {
          name: "krone",
          symbol: "kr",
        },
      },
      flag: "https://flagcdn.com/w320/sj.png",
    },
    {
      name: "Islas Tokelau",
      code: "TKL",
      currency: {
        NZD: {
          name: "New Zealand dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/tk.png",
    },
    {
      name: "Islas Turks y Caicos",
      code: "TCA",
      currency: {
        USD: {
          name: "United States dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/tc.png",
    },
    {
      name: "Islas Ultramarinas Menores de Estados Unidos",
      code: "UMI",
      currency: {
        USD: {
          name: "United States dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/um.png",
    },
    {
      name: "Islas Vírgenes de los Estados Unidos",
      code: "VIR",
      currency: {
        USD: {
          name: "United States dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/vi.png",
    },
    {
      name: "Islas Vírgenes del Reino Unido",
      code: "VGB",
      currency: {
        USD: {
          name: "United States dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/vg.png",
    },
    {
      name: "Israel",
      code: "ISR",
      currency: {
        ILS: {
          name: "Israeli new shekel",
          symbol: "₪",
        },
      },
      flag: "https://flagcdn.com/w320/il.png",
    },
    {
      name: "Italia",
      code: "ITA",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/it.png",
    },
    {
      name: "Jamaica",
      code: "JAM",
      currency: {
        JMD: {
          name: "Jamaican dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/jm.png",
    },
    {
      name: "Japón",
      code: "JPN",
      currency: {
        JPY: {
          name: "Japanese yen",
          symbol: "¥",
        },
      },
      flag: "https://flagcdn.com/w320/jp.png",
    },
    {
      name: "Jersey",
      code: "JEY",
      currency: {
        GBP: {
          name: "British pound",
          symbol: "£",
        },
        JEP: {
          name: "Jersey pound",
          symbol: "£",
        },
      },
      flag: "https://flagcdn.com/w320/je.png",
    },
    {
      name: "Jordania",
      code: "JOR",
      currency: {
        JOD: {
          name: "Jordanian dinar",
          symbol: "د.ا",
        },
      },
      flag: "https://flagcdn.com/w320/jo.png",
    },
    {
      name: "Kazajistán",
      code: "KAZ",
      currency: {
        KZT: {
          name: "Kazakhstani tenge",
          symbol: "₸",
        },
      },
      flag: "https://flagcdn.com/w320/kz.png",
    },
    {
      name: "Kenia",
      code: "KEN",
      currency: {
        KES: {
          name: "Kenyan shilling",
          symbol: "Sh",
        },
      },
      flag: "https://flagcdn.com/w320/ke.png",
    },
    {
      name: "Kirguizistán",
      code: "KGZ",
      currency: {
        KGS: {
          name: "Kyrgyzstani som",
          symbol: "с",
        },
      },
      flag: "https://flagcdn.com/w320/kg.png",
    },
    {
      name: "Kiribati",
      code: "KIR",
      currency: {
        AUD: {
          name: "Australian dollar",
          symbol: "$",
        },
        KID: {
          name: "Kiribati dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/ki.png",
    },
    {
      name: "Kosovo",
      code: "UNK",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/xk.png",
    },
    {
      name: "Kuwait",
      code: "KWT",
      currency: {
        KWD: {
          name: "Kuwaiti dinar",
          symbol: "د.ك",
        },
      },
      flag: "https://flagcdn.com/w320/kw.png",
    },
    {
      name: "Laos",
      code: "LAO",
      currency: {
        LAK: {
          name: "Lao kip",
          symbol: "₭",
        },
      },
      flag: "https://flagcdn.com/w320/la.png",
    },
    {
      name: "Lesotho",
      code: "LSO",
      currency: {
        LSL: {
          name: "Lesotho loti",
          symbol: "L",
        },
        ZAR: {
          name: "South African rand",
          symbol: "R",
        },
      },
      flag: "https://flagcdn.com/w320/ls.png",
    },
    {
      name: "Letonia",
      code: "LVA",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/lv.png",
    },
    {
      name: "Líbano",
      code: "LBN",
      currency: {
        LBP: {
          name: "Lebanese pound",
          symbol: "ل.ل",
        },
      },
      flag: "https://flagcdn.com/w320/lb.png",
    },
    {
      name: "Liberia",
      code: "LBR",
      currency: {
        LRD: {
          name: "Liberian dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/lr.png",
    },
    {
      name: "Libia",
      code: "LBY",
      currency: {
        LYD: {
          name: "Libyan dinar",
          symbol: "ل.د",
        },
      },
      flag: "https://flagcdn.com/w320/ly.png",
    },
    {
      name: "Liechtenstein",
      code: "LIE",
      currency: {
        CHF: {
          name: "Swiss franc",
          symbol: "Fr",
        },
      },
      flag: "https://flagcdn.com/w320/li.png",
    },
    {
      name: "Lituania",
      code: "LTU",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/lt.png",
    },
    {
      name: "Luxemburgo",
      code: "LUX",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/lu.png",
    },
    {
      name: "Macao",
      code: "MAC",
      currency: {
        MOP: {
          name: "Macanese pataca",
          symbol: "P",
        },
      },
      flag: "https://flagcdn.com/w320/mo.png",
    },
    {
      name: "Macedonia del Norte",
      code: "MKD",
      currency: {
        MKD: {
          name: "denar",
          symbol: "den",
        },
      },
      flag: "https://flagcdn.com/w320/mk.png",
    },
    {
      name: "Madagascar",
      code: "MDG",
      currency: {
        MGA: {
          name: "Malagasy ariary",
          symbol: "Ar",
        },
      },
      flag: "https://flagcdn.com/w320/mg.png",
    },
    {
      name: "Malasia",
      code: "MYS",
      currency: {
        MYR: {
          name: "Malaysian ringgit",
          symbol: "RM",
        },
      },
      flag: "https://flagcdn.com/w320/my.png",
    },
    {
      name: "Malawi",
      code: "MWI",
      currency: {
        MWK: {
          name: "Malawian kwacha",
          symbol: "MK",
        },
      },
      flag: "https://flagcdn.com/w320/mw.png",
    },
    {
      name: "Maldivas",
      code: "MDV",
      currency: {
        MVR: {
          name: "Maldivian rufiyaa",
          symbol: ".ރ",
        },
      },
      flag: "https://flagcdn.com/w320/mv.png",
    },
    {
      name: "Mali",
      code: "MLI",
      currency: {
        XOF: {
          name: "West African CFA franc",
          symbol: "Fr",
        },
      },
      flag: "https://flagcdn.com/w320/ml.png",
    },
    {
      name: "Malta",
      code: "MLT",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/mt.png",
    },
    {
      name: "Marruecos",
      code: "MAR",
      currency: {
        MAD: {
          name: "Moroccan dirham",
          symbol: "د.م.",
        },
      },
      flag: "https://flagcdn.com/w320/ma.png",
    },
    {
      name: "Martinica",
      code: "MTQ",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/mq.png",
    },
    {
      name: "Mauricio",
      code: "MUS",
      currency: {
        MUR: {
          name: "Mauritian rupee",
          symbol: "₨",
        },
      },
      flag: "https://flagcdn.com/w320/mu.png",
    },
    {
      name: "Mauritania",
      code: "MRT",
      currency: {
        MRU: {
          name: "Mauritanian ouguiya",
          symbol: "UM",
        },
      },
      flag: "https://flagcdn.com/w320/mr.png",
    },
    {
      name: "Mayotte",
      code: "MYT",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/yt.png",
    },
    {
      name: "México",
      code: "MEX",
      currency: {
        MXN: {
          name: "Mexican peso",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/mx.png",
    },
    {
      name: "Micronesia",
      code: "FSM",
      currency: {
        USD: {
          name: "United States dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/fm.png",
    },
    {
      name: "Moldavia",
      code: "MDA",
      currency: {
        MDL: {
          name: "Moldovan leu",
          symbol: "L",
        },
      },
      flag: "https://flagcdn.com/w320/md.png",
    },
    {
      name: "Mónaco",
      code: "MCO",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/mc.png",
    },
    {
      name: "Mongolia",
      code: "MNG",
      currency: {
        MNT: {
          name: "Mongolian tögrög",
          symbol: "₮",
        },
      },
      flag: "https://flagcdn.com/w320/mn.png",
    },
    {
      name: "Montenegro",
      code: "MNE",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/me.png",
    },
    {
      name: "Montserrat",
      code: "MSR",
      currency: {
        XCD: {
          name: "Eastern Caribbean dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/ms.png",
    },
    {
      name: "Mozambique",
      code: "MOZ",
      currency: {
        MZN: {
          name: "Mozambican metical",
          symbol: "MT",
        },
      },
      flag: "https://flagcdn.com/w320/mz.png",
    },
    {
      name: "Myanmar",
      code: "MMR",
      currency: {
        MMK: {
          name: "Burmese kyat",
          symbol: "Ks",
        },
      },
      flag: "https://flagcdn.com/w320/mm.png",
    },
    {
      name: "Namibia",
      code: "NAM",
      currency: {
        NAD: {
          name: "Namibian dollar",
          symbol: "$",
        },
        ZAR: {
          name: "South African rand",
          symbol: "R",
        },
      },
      flag: "https://flagcdn.com/w320/na.png",
    },
    {
      name: "Nauru",
      code: "NRU",
      currency: {
        AUD: {
          name: "Australian dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/nr.png",
    },
    {
      name: "Nepal",
      code: "NPL",
      currency: {
        NPR: {
          name: "Nepalese rupee",
          symbol: "₨",
        },
      },
      flag: "https://flagcdn.com/w320/np.png",
    },
    {
      name: "Nicaragua",
      code: "NIC",
      currency: {
        NIO: {
          name: "Nicaraguan córdoba",
          symbol: "C$",
        },
      },
      flag: "https://flagcdn.com/w320/ni.png",
    },
    {
      name: "Níger",
      code: "NER",
      currency: {
        XOF: {
          name: "West African CFA franc",
          symbol: "Fr",
        },
      },
      flag: "https://flagcdn.com/w320/ne.png",
    },
    {
      name: "Nigeria",
      code: "NGA",
      currency: {
        NGN: {
          name: "Nigerian naira",
          symbol: "₦",
        },
      },
      flag: "https://flagcdn.com/w320/ng.png",
    },
    {
      name: "Niue",
      code: "NIU",
      currency: {
        NZD: {
          name: "New Zealand dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/nu.png",
    },
    {
      name: "Noruega",
      code: "NOR",
      currency: {
        NOK: {
          name: "Norwegian krone",
          symbol: "kr",
        },
      },
      flag: "https://flagcdn.com/w320/no.png",
    },
    {
      name: "Nueva Caledonia",
      code: "NCL",
      currency: {
        XPF: {
          name: "CFP franc",
          symbol: "₣",
        },
      },
      flag: "https://flagcdn.com/w320/nc.png",
    },
    {
      name: "Nueva Zelanda",
      code: "NZL",
      currency: {
        NZD: {
          name: "New Zealand dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/nz.png",
    },
    {
      name: "Omán",
      code: "OMN",
      currency: {
        OMR: {
          name: "Omani rial",
          symbol: "ر.ع.",
        },
      },
      flag: "https://flagcdn.com/w320/om.png",
    },
    {
      name: "Países Bajos",
      code: "NLD",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/nl.png",
    },
    {
      name: "Pakistán",
      code: "PAK",
      currency: {
        PKR: {
          name: "Pakistani rupee",
          symbol: "₨",
        },
      },
      flag: "https://flagcdn.com/w320/pk.png",
    },
    {
      name: "Palau",
      code: "PLW",
      currency: {
        USD: {
          name: "United States dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/pw.png",
    },
    {
      name: "Palestina",
      code: "PSE",
      currency: {
        EGP: {
          name: "Egyptian pound",
          symbol: "E£",
        },
        ILS: {
          name: "Israeli new shekel",
          symbol: "₪",
        },
        JOD: {
          name: "Jordanian dinar",
          symbol: "JD",
        },
      },
      flag: "https://flagcdn.com/w320/ps.png",
    },
    {
      name: "Panamá",
      code: "PAN",
      currency: {
        PAB: {
          name: "Panamanian balboa",
          symbol: "B/.",
        },
        USD: {
          name: "United States dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/pa.png",
    },
    {
      name: "Papúa Nueva Guinea",
      code: "PNG",
      currency: {
        PGK: {
          name: "Papua New Guinean kina",
          symbol: "K",
        },
      },
      flag: "https://flagcdn.com/w320/pg.png",
    },
    {
      name: "Paraguay",
      code: "PRY",
      currency: {
        PYG: {
          name: "Paraguayan guaraní",
          symbol: "₲",
        },
      },
      flag: "https://flagcdn.com/w320/py.png",
    },
    {
      name: "Perú",
      code: "PER",
      currency: {
        PEN: {
          name: "Peruvian sol",
          symbol: "S/ ",
        },
      },
      flag: "https://flagcdn.com/w320/pe.png",
    },
    {
      name: "Polinesia Francesa",
      code: "PYF",
      currency: {
        XPF: {
          name: "CFP franc",
          symbol: "₣",
        },
      },
      flag: "https://flagcdn.com/w320/pf.png",
    },
    {
      name: "Polonia",
      code: "POL",
      currency: {
        PLN: {
          name: "Polish złoty",
          symbol: "zł",
        },
      },
      flag: "https://flagcdn.com/w320/pl.png",
    },
    {
      name: "Portugal",
      code: "PRT",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/pt.png",
    },
    {
      name: "Puerto Rico",
      code: "PRI",
      currency: {
        USD: {
          name: "United States dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/pr.png",
    },
    {
      name: "Reino Unido",
      code: "GBR",
      currency: {
        GBP: {
          name: "British pound",
          symbol: "£",
        },
      },
      flag: "https://flagcdn.com/w320/gb.png",
    },
    {
      name: "República Centroafricana",
      code: "CAF",
      currency: {
        XAF: {
          name: "Central African CFA franc",
          symbol: "Fr",
        },
      },
      flag: "https://flagcdn.com/w320/cf.png",
    },
    {
      name: "República Dominicana",
      code: "DOM",
      currency: {
        DOP: {
          name: "Dominican peso",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/do.png",
    },
    {
      name: "República Eslovaca",
      code: "SVK",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/sk.png",
    },
    {
      name: "Reunión",
      code: "REU",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/re.png",
    },
    {
      name: "Ruanda",
      code: "RWA",
      currency: {
        RWF: {
          name: "Rwandan franc",
          symbol: "Fr",
        },
      },
      flag: "https://flagcdn.com/w320/rw.png",
    },
    {
      name: "Rumania",
      code: "ROU",
      currency: {
        RON: {
          name: "Romanian leu",
          symbol: "lei",
        },
      },
      flag: "https://flagcdn.com/w320/ro.png",
    },
    {
      name: "Rusia",
      code: "RUS",
      currency: {
        RUB: {
          name: "Russian ruble",
          symbol: "₽",
        },
      },
      flag: "https://flagcdn.com/w320/ru.png",
    },
    {
      name: "Sahara Occidental",
      code: "ESH",
      currency: {
        DZD: {
          name: "Algerian dinar",
          symbol: "دج",
        },
        MAD: {
          name: "Moroccan dirham",
          symbol: "DH",
        },
        MRU: {
          name: "Mauritanian ouguiya",
          symbol: "UM",
        },
      },
      flag: "https://flagcdn.com/w320/eh.png",
    },
    {
      name: "Saint Martin",
      code: "MAF",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/mf.png",
    },
    {
      name: "Samoa",
      code: "WSM",
      currency: {
        WST: {
          name: "Samoan tālā",
          symbol: "T",
        },
      },
      flag: "https://flagcdn.com/w320/ws.png",
    },
    {
      name: "Samoa Americana",
      code: "ASM",
      currency: {
        USD: {
          name: "United States dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/as.png",
    },
    {
      name: "San Bartolomé",
      code: "BLM",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/bl.png",
    },
    {
      name: "San Cristóbal y Nieves",
      code: "KNA",
      currency: {
        XCD: {
          name: "Eastern Caribbean dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/kn.png",
    },
    {
      name: "San Marino",
      code: "SMR",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/sm.png",
    },
    {
      name: "San Pedro y Miquelón",
      code: "SPM",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/pm.png",
    },
    {
      name: "San Vicente y Granadinas",
      code: "VCT",
      currency: {
        XCD: {
          name: "Eastern Caribbean dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/vc.png",
    },
    {
      name: "Santa Elena, Ascensión y Tristán de Acuña",
      code: "SHN",
      currency: {
        GBP: {
          name: "Pound sterling",
          symbol: "£",
        },
        SHP: {
          name: "Saint Helena pound",
          symbol: "£",
        },
      },
      flag: "https://flagcdn.com/w320/sh.png",
    },
    {
      name: "Santa Lucía",
      code: "LCA",
      currency: {
        XCD: {
          name: "Eastern Caribbean dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/lc.png",
    },
    {
      name: "Santo Tomé y Príncipe",
      code: "STP",
      currency: {
        STN: {
          name: "São Tomé and Príncipe dobra",
          symbol: "Db",
        },
      },
      flag: "https://flagcdn.com/w320/st.png",
    },
    {
      name: "Senegal",
      code: "SEN",
      currency: {
        XOF: {
          name: "West African CFA franc",
          symbol: "Fr",
        },
      },
      flag: "https://flagcdn.com/w320/sn.png",
    },
    {
      name: "Serbia",
      code: "SRB",
      currency: {
        RSD: {
          name: "Serbian dinar",
          symbol: "дин.",
        },
      },
      flag: "https://flagcdn.com/w320/rs.png",
    },
    {
      name: "Seychelles",
      code: "SYC",
      currency: {
        SCR: {
          name: "Seychellois rupee",
          symbol: "₨",
        },
      },
      flag: "https://flagcdn.com/w320/sc.png",
    },
    {
      name: "Sierra Leone",
      code: "SLE",
      currency: {
        SLL: {
          name: "Sierra Leonean leone",
          symbol: "Le",
        },
      },
      flag: "https://flagcdn.com/w320/sl.png",
    },
    {
      name: "Singapur",
      code: "SGP",
      currency: {
        SGD: {
          name: "Singapore dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/sg.png",
    },
    {
      name: "Sint Maarten",
      code: "SXM",
      currency: {
        ANG: {
          name: "Netherlands Antillean guilder",
          symbol: "ƒ",
        },
      },
      flag: "https://flagcdn.com/w320/sx.png",
    },
    {
      name: "Siria",
      code: "SYR",
      currency: {
        SYP: {
          name: "Syrian pound",
          symbol: "£",
        },
      },
      flag: "https://flagcdn.com/w320/sy.png",
    },
    {
      name: "Somalia",
      code: "SOM",
      currency: {
        SOS: {
          name: "Somali shilling",
          symbol: "Sh",
        },
      },
      flag: "https://flagcdn.com/w320/so.png",
    },
    {
      name: "Sri Lanka",
      code: "LKA",
      currency: {
        LKR: {
          name: "Sri Lankan rupee",
          symbol: "Rs  රු",
        },
      },
      flag: "https://flagcdn.com/w320/lk.png",
    },
    {
      name: "Suazilandia",
      code: "SWZ",
      currency: {
        SZL: {
          name: "Swazi lilangeni",
          symbol: "L",
        },
        ZAR: {
          name: "South African rand",
          symbol: "R",
        },
      },
      flag: "https://flagcdn.com/w320/sz.png",
    },
    {
      name: "Sudáfrica",
      code: "ZAF",
      currency: {
        ZAR: {
          name: "South African rand",
          symbol: "R",
        },
      },
      flag: "https://flagcdn.com/w320/za.png",
    },
    {
      name: "Sudán",
      code: "SDN",
      currency: {
        SDG: {
          name: "Sudanese pound",
        },
      },
      flag: "https://flagcdn.com/w320/sd.png",
    },
    {
      name: "Sudán del Sur",
      code: "SSD",
      currency: {
        SSP: {
          name: "South Sudanese pound",
          symbol: "£",
        },
      },
      flag: "https://flagcdn.com/w320/ss.png",
    },
    {
      name: "Suecia",
      code: "SWE",
      currency: {
        SEK: {
          name: "Swedish krona",
          symbol: "kr",
        },
      },
      flag: "https://flagcdn.com/w320/se.png",
    },
    {
      name: "Suiza",
      code: "CHE",
      currency: {
        CHF: {
          name: "Swiss franc",
          symbol: "Fr.",
        },
      },
      flag: "https://flagcdn.com/w320/ch.png",
    },
    {
      name: "Surinam",
      code: "SUR",
      currency: {
        SRD: {
          name: "Surinamese dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/sr.png",
    },
    {
      name: "Tailandia",
      code: "THA",
      currency: {
        THB: {
          name: "Thai baht",
          symbol: "฿",
        },
      },
      flag: "https://flagcdn.com/w320/th.png",
    },
    {
      name: "Taiwán",
      code: "TWN",
      currency: {
        TWD: {
          name: "New Taiwan dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/tw.png",
    },
    {
      name: "Tanzania",
      code: "TZA",
      currency: {
        TZS: {
          name: "Tanzanian shilling",
          symbol: "Sh",
        },
      },
      flag: "https://flagcdn.com/w320/tz.png",
    },
    {
      name: "Tayikistán",
      code: "TJK",
      currency: {
        TJS: {
          name: "Tajikistani somoni",
          symbol: "ЅМ",
        },
      },
      flag: "https://flagcdn.com/w320/tj.png",
    },
    {
      name: "Territorio Británico del Océano Índico",
      code: "IOT",
      currency: {
        USD: {
          name: "United States dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/io.png",
    },
    {
      name: "Tierras Australes y Antárticas Francesas",
      code: "ATF",
      currency: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      flag: "https://flagcdn.com/w320/tf.png",
    },
    {
      name: "Timor Oriental",
      code: "TLS",
      currency: {
        USD: {
          name: "United States dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/tl.png",
    },
    {
      name: "Togo",
      code: "TGO",
      currency: {
        XOF: {
          name: "West African CFA franc",
          symbol: "Fr",
        },
      },
      flag: "https://flagcdn.com/w320/tg.png",
    },
    {
      name: "Tonga",
      code: "TON",
      currency: {
        TOP: {
          name: "Tongan paʻanga",
          symbol: "T$",
        },
      },
      flag: "https://flagcdn.com/w320/to.png",
    },
    {
      name: "Trinidad y Tobago",
      code: "TTO",
      currency: {
        TTD: {
          name: "Trinidad and Tobago dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/tt.png",
    },
    {
      name: "Túnez",
      code: "TUN",
      currency: {
        TND: {
          name: "Tunisian dinar",
          symbol: "د.ت",
        },
      },
      flag: "https://flagcdn.com/w320/tn.png",
    },
    {
      name: "Turkmenistán",
      code: "TKM",
      currency: {
        TMT: {
          name: "Turkmenistan manat",
          symbol: "m",
        },
      },
      flag: "https://flagcdn.com/w320/tm.png",
    },
    {
      name: "Turquía",
      code: "TUR",
      currency: {
        TRY: {
          name: "Turkish lira",
          symbol: "₺",
        },
      },
      flag: "https://flagcdn.com/w320/tr.png",
    },
    {
      name: "Tuvalu",
      code: "TUV",
      currency: {
        AUD: {
          name: "Australian dollar",
          symbol: "$",
        },
        TVD: {
          name: "Tuvaluan dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/tv.png",
    },
    {
      name: "Ucrania",
      code: "UKR",
      currency: {
        UAH: {
          name: "Ukrainian hryvnia",
          symbol: "₴",
        },
      },
      flag: "https://flagcdn.com/w320/ua.png",
    },
    {
      name: "Uganda",
      code: "UGA",
      currency: {
        UGX: {
          name: "Ugandan shilling",
          symbol: "Sh",
        },
      },
      flag: "https://flagcdn.com/w320/ug.png",
    },
    {
      name: "Uzbekistán",
      code: "UZB",
      currency: {
        UZS: {
          name: "Uzbekistani soʻm",
          symbol: "so'm",
        },
      },
      flag: "https://flagcdn.com/w320/uz.png",
    },
    {
      name: "Vanuatu",
      code: "VUT",
      currency: {
        VUV: {
          name: "Vanuatu vatu",
          symbol: "Vt",
        },
      },
      flag: "https://flagcdn.com/w320/vu.png",
    },
    {
      name: "Venezuela",
      code: "VEN",
      currency: {
        VES: {
          name: "Venezuelan bolívar soberano",
          symbol: "Bs.S.",
        },
      },
      flag: "https://flagcdn.com/w320/ve.png",
    },
    {
      name: "Vietnam",
      code: "VNM",
      currency: {
        VND: {
          name: "Vietnamese đồng",
          symbol: "₫",
        },
      },
      flag: "https://flagcdn.com/w320/vn.png",
    },
    {
      name: "Wallis y Futuna",
      code: "WLF",
      currency: {
        XPF: {
          name: "CFP franc",
          symbol: "₣",
        },
      },
      flag: "https://flagcdn.com/w320/wf.png",
    },
    {
      name: "Yemen",
      code: "YEM",
      currency: {
        YER: {
          name: "Yemeni rial",
          symbol: "﷼",
        },
      },
      flag: "https://flagcdn.com/w320/ye.png",
    },
    {
      name: "Zambia",
      code: "ZMB",
      currency: {
        ZMW: {
          name: "Zambian kwacha",
          symbol: "ZK",
        },
      },
      flag: "https://flagcdn.com/w320/zm.png",
    },
    {
      name: "Zimbabue",
      code: "ZWE",
      currency: {
        ZWL: {
          name: "Zimbabwean dollar",
          symbol: "$",
        },
      },
      flag: "https://flagcdn.com/w320/zw.png",
    },
  ];

export default paises;