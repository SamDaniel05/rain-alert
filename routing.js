// High-Precision Tamil Nadu Micro-Locality, Autocomplete & Autonomous Corridor Routing Engine (100% Free)
const RoutingEngine = {
  // Comprehensive Tamil Nadu Micro-Locality Database with exact coordinates, regions, and search aliases
  CORRIDOR_LOCALITIES: [
    // =========================================================================
    // 1. CHENNAI - NORTH & COASTAL CORRIDOR
    // =========================================================================
    { 
      name: 'Ennore', 
      region: 'North Chennai (Coastal)', 
      lat: 13.2258, 
      lon: 80.3243, 
      aliases: ['ennore port', 'ennore creek', 'ennore thermal', 'ennore bus depot', 'ennor'] 
    },
    { 
      name: 'Kattivakkam', 
      region: 'North Chennai (Coastal)', 
      lat: 13.2100, 
      lon: 80.3180, 
      aliases: ['kadhivakkam', 'kathivakkam', 'kattivakkam railway station'] 
    },
    { 
      name: 'Ernavoor', 
      region: 'North Chennai (Coastal)', 
      lat: 13.1890, 
      lon: 80.3120, 
      aliases: ['ernavur', 'lift gate', 'ernavoor gate', 'ernavur bridge'] 
    },
    { 
      name: 'Wimco Nagar', 
      region: 'North Chennai (Coastal)', 
      lat: 13.1706, 
      lon: 80.3021, 
      aliases: ['wimco', 'vimco', 'vimco nagar', 'wimconagar', 'wimco metro'] 
    },
    { 
      name: 'Tiruvottiyur', 
      region: 'North Chennai (Coastal)', 
      lat: 13.1610, 
      lon: 80.3015, 
      aliases: ['thiruvottiyur', 'thiruvottriyur', 'tiruvottriyur', 'thiruvotriyur', 'thiruvottiyur bus depot', 'vadivudai amman temple'] 
    },
    { 
      name: 'Theradi', 
      region: 'North Chennai (Coastal)', 
      lat: 13.1530, 
      lon: 80.3010, 
      aliases: ['thiruvottiyur theradi', 'theradi junction', 'theradi metro', 'theradi signal'] 
    },
    { 
      name: 'Tiruvottiyur Market', 
      region: 'North Chennai (Coastal)', 
      lat: 13.1480, 
      lon: 80.3005, 
      aliases: ['market', 'thiruvottiyur market', 'tiruvottriyur market', 'thiruvottiyur vegetable market'] 
    },
    { 
      name: 'Kaladipet', 
      region: 'North Chennai (Coastal)', 
      lat: 13.1420, 
      lon: 80.2995, 
      aliases: ['kaladipettai', 'kaladipetu', 'kaladipet metro', 'kaladipet market'] 
    },
    { 
      name: 'Rajakadai', 
      region: 'North Chennai (Coastal)', 
      lat: 13.1360, 
      lon: 80.2985, 
      aliases: ['raja kadai', 'rajakadai junction', 'rajakadai signal'] 
    },
    { 
      name: 'Tollgate', 
      region: 'North Chennai (Coastal)', 
      lat: 13.1310, 
      lon: 80.2975, 
      aliases: ['toll gate', 'tiruvottiyur tollgate', 'thiruvottiyur tollgate', 'tollgate metro', 'tollgate junction'] 
    },
    { 
      name: 'Tondiarpet', 
      region: 'North Chennai (Coastal)', 
      lat: 13.1230, 
      lon: 80.2930, 
      aliases: ['thandaiyarpet', 'tondiarpet bus depot', 'tondiarpet hospital', 'tondiyarpettai'] 
    },
    { 
      name: 'Kasimedu', 
      region: 'North Chennai (Coastal)', 
      lat: 13.1180, 
      lon: 80.2980, 
      aliases: ['kasi medu', 'kasimedu harbour', 'kasimedu fish market', 'kasimedu bridge'] 
    },
    { 
      name: 'Kalmandapam', 
      region: 'North Chennai (Coastal)', 
      lat: 13.1110, 
      lon: 80.2950, 
      aliases: ['kal mandapam', 'kalmandapam junction', 'kalmandapam signal'] 
    },
    { 
      name: 'Royapuram', 
      region: 'North Chennai (Coastal)', 
      lat: 13.1098, 
      lon: 80.2974, 
      aliases: ['royapuram bridge', 'royapuram station', 'royapuram market'] 
    },
    { 
      name: 'Stanley Hospital', 
      region: 'North Chennai (Coastal)', 
      lat: 13.1040, 
      lon: 80.2880, 
      aliases: ['stanley', 'stanley medical college', 'stanley hospital bus stop'] 
    },
    { 
      name: 'Old Washermanpet', 
      region: 'North Chennai (Coastal)', 
      lat: 13.1010, 
      lon: 80.2830, 
      aliases: ['washermanpet', 'vannarpettai', 'washermenpet', 'old washermenpet'] 
    },
    { 
      name: 'New Washermanpet', 
      region: 'North Chennai (Coastal)', 
      lat: 13.1120, 
      lon: 80.2860, 
      aliases: ['new washermenpet', 'new washermanpet metro'] 
    },
    { 
      name: 'Korukkupet', 
      region: 'North Chennai (Coastal)', 
      lat: 13.1160, 
      lon: 80.2750, 
      aliases: ['korukpet', 'korukkupet railway station'] 
    },
    { 
      name: 'Basin Bridge', 
      region: 'North Chennai (Coastal)', 
      lat: 13.1000, 
      lon: 80.2690, 
      aliases: ['basin bridge junction', 'basin bridge station'] 
    },

    // =========================================================================
    // 2. CHENNAI - NORTH INLAND & INDUSTRIAL
    // =========================================================================
    { 
      name: 'Minjur', 
      region: 'North Chennai (Inland)', 
      lat: 13.2780, 
      lon: 80.2610, 
      aliases: ['minjur town', 'minjur railway station'] 
    },
    { 
      name: 'Manali New Town', 
      region: 'North Chennai (Inland)', 
      lat: 13.2116, 
      lon: 80.2771, 
      aliases: ['manali newtown', 'new manali', 'manali new town bus stand'] 
    },
    { 
      name: 'Andarkuppam', 
      region: 'North Chennai (Inland)', 
      lat: 13.2100, 
      lon: 80.2680, 
      aliases: ['andarkupam', 'andarkuppam checkpost'] 
    },
    { 
      name: 'Edayanchavadi', 
      region: 'North Chennai (Inland)', 
      lat: 13.2050, 
      lon: 80.2850, 
      aliases: ['edaiyanchavadi', 'idayanchavadi', 'edayanchavadi junction'] 
    },
    { 
      name: 'Sadayankuppam', 
      region: 'North Chennai (Inland)', 
      lat: 13.1880, 
      lon: 80.2810, 
      aliases: ['sadayankupam', 'sadayankuppam bridge'] 
    },
    { 
      name: 'CPCL / Manali Refinery', 
      region: 'North Chennai (Inland)', 
      lat: 13.1780, 
      lon: 80.2740, 
      aliases: ['cpcl', 'manali refinery', 'chennai petroleum', 'cpcl gate'] 
    },
    { 
      name: 'Manali', 
      region: 'North Chennai (Inland)', 
      lat: 13.1667, 
      lon: 80.2667, 
      aliases: ['manali market', 'manali bus terminus', 'manali town'] 
    },
    { 
      name: 'Mathur MMDA', 
      region: 'North Chennai (Inland)', 
      lat: 13.1690, 
      lon: 80.2450, 
      aliases: ['mathur', 'mmda mathur', 'mathur roundtana'] 
    },
    { 
      name: 'Madhavaram Milk Colony', 
      region: 'North Chennai (Inland)', 
      lat: 13.1550, 
      lon: 80.2350, 
      aliases: ['milk colony', 'madhavaram colony', 'aavin madhavaram'] 
    },
    { 
      name: 'Madhavaram', 
      region: 'North Chennai (Inland)', 
      lat: 13.1480, 
      lon: 80.2310, 
      aliases: ['madhavaram roundtana', 'madhavaram bus terminus'] 
    },
    { 
      name: 'Red Hills', 
      region: 'North Chennai (Inland)', 
      lat: 13.1990, 
      lon: 80.1970, 
      aliases: ['redhills', 'red hills bus terminus', 'padiyanallur'] 
    },
    { 
      name: 'Puzhal', 
      region: 'North Chennai (Inland)', 
      lat: 13.1580, 
      lon: 80.1980, 
      aliases: ['puzhal camp', 'puzhal jail', 'puzhal lake'] 
    },
    { 
      name: 'Kolathur', 
      region: 'North Chennai (Inland)', 
      lat: 13.1240, 
      lon: 80.2140, 
      aliases: ['kolathur junction', 'kolathur signal'] 
    },
    { 
      name: 'Retteri', 
      region: 'North Chennai (Inland)', 
      lat: 13.1320, 
      lon: 80.2080, 
      aliases: ['retteri junction', 'retteri bridge', 'retteri flyover'] 
    },
    { 
      name: 'Villivakkam', 
      region: 'North Chennai (Inland)', 
      lat: 13.1090, 
      lon: 80.2080, 
      aliases: ['villivakkam bus stand', 'villivakkam station'] 
    },
    { 
      name: 'Korattur', 
      region: 'North Chennai (Inland)', 
      lat: 13.1130, 
      lon: 80.1830, 
      aliases: ['korattur railway station', 'korattur lake'] 
    },
    { 
      name: 'Padi', 
      region: 'North Chennai (Inland)', 
      lat: 13.0980, 
      lon: 80.1870, 
      aliases: ['padi flyover', 'lucas tvs', 'padi junction'] 
    },
    { 
      name: 'Perambur', 
      region: 'North Chennai (Inland)', 
      lat: 13.1110, 
      lon: 80.2430, 
      aliases: ['perambur loco', 'perambur railway station', 'perambur barracks'] 
    },
    { 
      name: 'Vyasarpadi', 
      region: 'North Chennai (Inland)', 
      lat: 13.1070, 
      lon: 80.2580, 
      aliases: ['vyasarpadi jeeva', 'vyasarpadi market'] 
    },
    { 
      name: 'MKB Nagar', 
      region: 'North Chennai (Inland)', 
      lat: 13.1250, 
      lon: 80.2580, 
      aliases: ['mkb nagar depot', 'vyasarpadi mkb nagar'] 
    },

    // =========================================================================
    // 3. CHENNAI - CENTRAL & COMMERCIAL
    // =========================================================================
    { 
      name: 'Parrys / Broadway', 
      region: 'Central Chennai', 
      lat: 13.0890, 
      lon: 80.2860, 
      aliases: ['parrys', 'broadway', 'parrys corner', 'high court', 'broadway bus terminus'] 
    },
    { 
      name: 'Chennai Beach', 
      region: 'Central Chennai', 
      lat: 13.0920, 
      lon: 80.2920, 
      aliases: ['beach station', 'chennai beach station', 'rajaji salai'] 
    },
    { 
      name: 'Chennai Central', 
      region: 'Central Chennai', 
      lat: 13.0827, 
      lon: 80.2707, 
      aliases: ['central', 'mgr central', 'puratchi thalaivar mgr central', 'central railway station'] 
    },
    { 
      name: 'Egmore', 
      region: 'Central Chennai', 
      lat: 13.0780, 
      lon: 80.2600, 
      aliases: ['egmore station', 'egmore railway station'] 
    },
    { 
      name: 'Chintadripet', 
      region: 'Central Chennai', 
      lat: 13.0760, 
      lon: 80.2710, 
      aliases: ['chintadripet mrts', 'chindatripet'] 
    },
    { 
      name: 'Triplicane', 
      region: 'Central Chennai', 
      lat: 13.0590, 
      lon: 80.2750, 
      aliases: ['thiruvallikeni', 'triplicane high road', 'parthasarathy temple'] 
    },
    { 
      name: 'Royapettah', 
      region: 'Central Chennai', 
      lat: 13.0520, 
      lon: 80.2630, 
      aliases: ['royapettah hospital', 'royapettah clock tower'] 
    },
    { 
      name: 'Mylapore', 
      region: 'Central Chennai', 
      lat: 13.0368, 
      lon: 80.2676, 
      aliases: ['kapaleeshwarar temple', 'luz corner', 'mylapore tank'] 
    },
    { 
      name: 'Mandaveli', 
      region: 'Central Chennai', 
      lat: 13.0250, 
      lon: 80.2620, 
      aliases: ['mandaveli bus depot', 'mandavelli'] 
    },
    { 
      name: 'Santhome', 
      region: 'Central Chennai', 
      lat: 13.0310, 
      lon: 80.2780, 
      aliases: ['santhome basilica', 'santhome church'] 
    },
    { 
      name: 'Marina Beach', 
      region: 'Central Chennai', 
      lat: 13.0500, 
      lon: 80.2820, 
      aliases: ['marina', 'kamarajar salai'] 
    },
    { 
      name: 'Thousand Lights', 
      region: 'Central Chennai', 
      lat: 13.0590, 
      lon: 80.2520, 
      aliases: ['thousand lights mosque', 'anna salai'] 
    },
    { 
      name: 'Nungambakkam', 
      region: 'Central Chennai', 
      lat: 13.0569, 
      lon: 80.2425, 
      aliases: ['nungambakkam high road', 'sterling road'] 
    },
    { 
      name: 'Chetpet', 
      region: 'Central Chennai', 
      lat: 13.0710, 
      lon: 80.2410, 
      aliases: ['chetpet railway station', 'chetpet eco park'] 
    },
    { 
      name: 'Kilpauk', 
      region: 'Central Chennai', 
      lat: 13.0810, 
      lon: 80.2370, 
      aliases: ['kilpauk medical college', 'kilpauk water works'] 
    },
    { 
      name: 'Purasawalkam', 
      region: 'Central Chennai', 
      lat: 13.0870, 
      lon: 80.2530, 
      aliases: ['purasawalkam high road', 'doveton'] 
    },
    { 
      name: 'T. Nagar', 
      region: 'Central Chennai', 
      lat: 13.0418, 
      lon: 80.2341, 
      aliases: ['tnagar', 't nagar', 'thyagaraya nagar', 'panagal park', 't nagar bus terminus'] 
    },
    { 
      name: 'West Mambalam', 
      region: 'Central Chennai', 
      lat: 13.0370, 
      lon: 80.2230, 
      aliases: ['mambalam station', 'mambalam', 'west mambalam post office'] 
    },
    { 
      name: 'Kodambakkam', 
      region: 'Central Chennai', 
      lat: 13.0510, 
      lon: 80.2220, 
      aliases: ['kodambakkam bridge', 'kodambakkam railway station'] 
    },
    { 
      name: 'Teynampet', 
      region: 'Central Chennai', 
      lat: 13.0400, 
      lon: 80.2490, 
      aliases: ['teynampet signal', 'siat college'] 
    },
    { 
      name: 'Alwarpet', 
      region: 'Central Chennai', 
      lat: 13.0330, 
      lon: 80.2500, 
      aliases: ['alwarpet signal', 'ttkd road'] 
    },
    { 
      name: 'Saidapet', 
      region: 'Central Chennai', 
      lat: 13.0210, 
      lon: 80.2230, 
      aliases: ['saidapet court', 'saidapet bus stop', 'saidapet metro'] 
    },
    { 
      name: 'Guindy', 
      region: 'Central Chennai', 
      lat: 13.0067, 
      lon: 80.2025, 
      aliases: ['guindy industrial estate', 'guindy station', 'guindy race course'] 
    },

    // =========================================================================
    // 4. CHENNAI - INNER RING ROAD, WEST & ARCOT ROAD
    // =========================================================================
    { 
      name: 'Anna Nagar', 
      region: 'West Chennai', 
      lat: 13.0850, 
      lon: 80.2100, 
      aliases: ['anna nagar roundtana', 'anna nagar tower', 'anna nagar east', 'anna nagar west'] 
    },
    { 
      name: 'Shenoy Nagar', 
      region: 'West Chennai', 
      lat: 13.0789, 
      lon: 80.2251, 
      aliases: ['shenoy nagar metro', 'thiru vi ka park'] 
    },
    { 
      name: 'Aminjikarai', 
      region: 'West Chennai', 
      lat: 13.0720, 
      lon: 80.2230, 
      aliases: ['aminjikarai market', 'poonamallee high road aminjikarai'] 
    },
    { 
      name: 'Arumbakkam', 
      region: 'West Chennai', 
      lat: 13.0650, 
      lon: 80.2080, 
      aliases: ['arumbakkam metro', 'dg vaishnav college'] 
    },
    { 
      name: 'Koyambedu', 
      region: 'West Chennai', 
      lat: 13.0694, 
      lon: 80.1948, 
      aliases: ['cmbt', 'koyambedu bus terminus', 'koyambedu market', 'koyambedu metro'] 
    },
    { 
      name: 'Vadapalani', 
      region: 'West Chennai', 
      lat: 13.0500, 
      lon: 80.2120, 
      aliases: ['vadapalani murugan temple', 'vadapalani bus depot', 'nexus vijaya mall'] 
    },
    { 
      name: 'Ashok Nagar', 
      region: 'West Chennai', 
      lat: 13.0370, 
      lon: 80.2120, 
      aliases: ['ashok pillar', 'ashok nagar metro'] 
    },
    { 
      name: 'KK Nagar', 
      region: 'West Chennai', 
      lat: 13.0390, 
      lon: 80.1980, 
      aliases: ['k k nagar bus depot', 'esi hospital kk nagar'] 
    },
    { 
      name: 'Jafferkhanpet', 
      region: 'West Chennai', 
      lat: 13.0280, 
      lon: 80.2050, 
      aliases: ['jafferkhanpet bridge', 'kasi bridge'] 
    },
    { 
      name: 'Ekkattuthangal', 
      region: 'West Chennai', 
      lat: 13.0200, 
      lon: 80.2040, 
      aliases: ['ekkattuthangal metro', 'cipet'] 
    },
    { 
      name: 'Alandur', 
      region: 'West Chennai', 
      lat: 13.0030, 
      lon: 80.2010, 
      aliases: ['alandur metro', 'alandur court'] 
    },
    { 
      name: 'St. Thomas Mount', 
      region: 'West Chennai / GST', 
      lat: 12.9980, 
      lon: 80.1950, 
      aliases: ['st thomas mount railway station', 'mount metro', 'butt road'] 
    },
    { 
      name: 'Kathipara', 
      region: 'West Chennai / GST', 
      lat: 13.0070, 
      lon: 80.2030, 
      aliases: ['kathipara flyover', 'kathipara cloverleaf', 'guindy kathipara'] 
    },
    { 
      name: 'Virugambakkam', 
      region: 'West Chennai', 
      lat: 13.0530, 
      lon: 80.1920, 
      aliases: ['virugambakkam market'] 
    },
    { 
      name: 'Saligramam', 
      region: 'West Chennai', 
      lat: 13.0540, 
      lon: 80.2010, 
      aliases: ['prasad studios', 'saligramam bus stop'] 
    },
    { 
      name: 'Valasaravakkam', 
      region: 'West Chennai', 
      lat: 13.0480, 
      lon: 80.1780, 
      aliases: ['valasaravakkam signal', 'arcot road valasaravakkam'] 
    },
    { 
      name: 'Alwarthirunagar', 
      region: 'West Chennai', 
      lat: 13.0440, 
      lon: 80.1720, 
      aliases: ['alwar thirunagar'] 
    },
    { 
      name: 'Porur', 
      region: 'West Chennai', 
      lat: 13.0382, 
      lon: 80.1565, 
      aliases: ['porur roundtana', 'porur junction', 'sri ramachandra hospital', 'porur flyover'] 
    },
    { 
      name: 'Ramapuram', 
      region: 'West Chennai', 
      lat: 13.0314, 
      lon: 80.1789, 
      aliases: ['srm ramapuram', 'dlf it park', 'ramapuram signal'] 
    },
    { 
      name: 'Mugalivakkam', 
      region: 'West Chennai', 
      lat: 13.0250, 
      lon: 80.1680, 
      aliases: ['mugalivakkam dlf'] 
    },
    { 
      name: 'Manapakkam', 
      region: 'West Chennai', 
      lat: 13.0180, 
      lon: 80.1750, 
      aliases: ['l&t manapakkam', 'miat hospital manapakkam'] 
    },
    { 
      name: 'Iyyappanthangal', 
      region: 'West Chennai', 
      lat: 13.0390, 
      lon: 80.1380, 
      aliases: ['iyyappanthangal bus depot', 'srmc gate'] 
    },
    { 
      name: 'Kumananchavadi', 
      region: 'West Chennai', 
      lat: 13.0450, 
      lon: 80.1180, 
      aliases: ['kumananchavadi signal', 'kumananchavadi junction'] 
    },
    { 
      name: 'Poonamallee', 
      region: 'West Chennai', 
      lat: 13.0487, 
      lon: 80.1054, 
      aliases: ['poonamallee bus terminus', 'poonamallee bypass'] 
    },
    { 
      name: 'Mangadu', 
      region: 'West Chennai', 
      lat: 13.0390, 
      lon: 80.1100, 
      aliases: ['mangadu kamakshi amman temple'] 
    },
    { 
      name: 'Kundrathur', 
      region: 'West Chennai', 
      lat: 12.9980, 
      lon: 80.0980, 
      aliases: ['kundrathur murugan temple'] 
    },
    { 
      name: 'Maduravoyal', 
      region: 'West Chennai', 
      lat: 13.0630, 
      lon: 80.1620, 
      aliases: ['maduravoyal flyover', 'maduravoyal bypass', 'erierikarai'] 
    },
    { 
      name: 'Vanagaram', 
      region: 'West Chennai', 
      lat: 13.0620, 
      lon: 80.1450, 
      aliases: ['vanagaram apollo', 'vanagaram toll plaza'] 
    },
    { 
      name: 'Nolambur', 
      region: 'West Chennai', 
      lat: 13.0760, 
      lon: 80.1620, 
      aliases: ['nolambur phase 2'] 
    },
    { 
      name: 'Mogappair', 
      region: 'West Chennai', 
      lat: 13.0840, 
      lon: 80.1750, 
      aliases: ['mogappair east', 'mogappair west', 'golden flats', 'spartan school'] 
    },
    { 
      name: 'Ambattur Estate', 
      region: 'West Chennai', 
      lat: 13.0980, 
      lon: 80.1620, 
      aliases: ['ambattur industrial estate', 'ambattur ot', 'telephone exchange ambattur'] 
    },
    { 
      name: 'Ambattur', 
      region: 'West Chennai', 
      lat: 13.1143, 
      lon: 80.1548, 
      aliases: ['ambattur railway station', 'ti cycles', 'ambattur market'] 
    },
    { 
      name: 'Avadi', 
      region: 'West Chennai', 
      lat: 13.1147, 
      lon: 80.1018, 
      aliases: ['avadi checkpost', 'avadi bus terminus', 'hvf avadi', 'avadi railway station'] 
    },
    { 
      name: 'Pattabiram', 
      region: 'West Chennai', 
      lat: 13.1230, 
      lon: 80.0620, 
      aliases: ['pattabiram military siding'] 
    },
    { 
      name: 'Thiruninravur', 
      region: 'West Chennai', 
      lat: 13.1200, 
      lon: 80.0270, 
      aliases: ['thiruninravur railway station'] 
    },
    { 
      name: 'Sriperumbudur', 
      region: 'West Industrial Corridor', 
      lat: 12.9699, 
      lon: 79.9482, 
      aliases: ['sriperumbudur sipcot', 'hyundai sriperumbudur', 'sriperumbudur toll'] 
    },
    { 
      name: 'Walajabad', 
      region: 'Kanchipuram District', 
      lat: 12.7918, 
      lon: 79.8284, 
      aliases: ['walajabad bus stand', 'walajabad bypass'] 
    },
    { 
      name: 'Kanchipuram', 
      region: 'Kanchipuram District', 
      lat: 12.8340, 
      lon: 79.7030, 
      aliases: ['kanjeevaram', 'kanchi', 'kanchipuram bus stand', 'kamakshi amman temple'] 
    },

    // =========================================================================
    // 5. CHENNAI - OMR IT EXPRESSWAY & ECR COASTAL
    // =========================================================================
    { 
      name: 'Adyar', 
      region: 'OMR IT Corridor', 
      lat: 13.0012, 
      lon: 80.2565, 
      aliases: ['adyar signal', 'adyar depot', 'adyar flyover'] 
    },
    { 
      name: 'Madhya Kailash', 
      region: 'OMR IT Corridor', 
      lat: 12.9980, 
      lon: 80.2490, 
      aliases: ['madhya kailash junction', 'madhya kailash temple'] 
    },
    { 
      name: 'Kasturba Nagar', 
      region: 'OMR IT Corridor', 
      lat: 12.9930, 
      lon: 80.2520, 
      aliases: ['kasturibai nagar', 'kasturba nagar mrts'] 
    },
    { 
      name: 'Thiruvanmiyur', 
      region: 'OMR IT Corridor', 
      lat: 12.9830, 
      lon: 80.2594, 
      aliases: ['thiruvanmiyur bus terminus', 'thiruvanmiyur signal', 'marundeeswarar temple'] 
    },
    { 
      name: 'Besant Nagar', 
      region: 'South Chennai / ECR', 
      lat: 13.0000, 
      lon: 80.2660, 
      aliases: ['elliots beach', 'bessie beach', 'velankanni church besant nagar'] 
    },
    { 
      name: 'Taramani', 
      region: 'OMR IT Corridor', 
      lat: 12.9860, 
      lon: 80.2430, 
      aliases: ['taramani mrts', 'ascendas it park'] 
    },
    { 
      name: 'Tidel Park', 
      region: 'OMR IT Corridor', 
      lat: 12.9890, 
      lon: 80.2480, 
      aliases: ['tidel', 'tidel park signal', 'tidel mrts'] 
    },
    { 
      name: 'SRP Tools', 
      region: 'OMR IT Corridor', 
      lat: 12.9810, 
      lon: 80.2470, 
      aliases: ['srp tools junction', 'srp signal'] 
    },
    { 
      name: 'Perungudi (OMR Toll)', 
      region: 'OMR IT Corridor', 
      lat: 12.9654, 
      lon: 80.2461, 
      aliases: ['perungudi', 'omr toll', 'seevaram', 'perungudi toll plaza'] 
    },
    { 
      name: 'Kandanchavadi', 
      region: 'OMR IT Corridor', 
      lat: 12.9610, 
      lon: 80.2440, 
      aliases: ['kandanchavadi signal', 'kandhanchavadi'] 
    },
    { 
      name: 'Thoraipakkam', 
      region: 'OMR IT Corridor', 
      lat: 12.9423, 
      lon: 80.2366, 
      aliases: ['thuraipakkam', 'thoraipakkam 200ft road', 'thoraipakkam signal'] 
    },
    { 
      name: 'Mettukuppam', 
      region: 'OMR IT Corridor', 
      lat: 12.9330, 
      lon: 80.2340, 
      aliases: ['omr mettukuppam', 'mettukuppam signal'] 
    },
    { 
      name: 'Karapakkam', 
      region: 'OMR IT Corridor', 
      lat: 12.9180, 
      lon: 80.2310, 
      aliases: ['tcs karapakkam', 'karapakkam signal'] 
    },
    { 
      name: 'Sholinganallur', 
      region: 'OMR IT Corridor', 
      lat: 12.9010, 
      lon: 80.2279, 
      aliases: ['sholinganallur signal', 'shollinganallur', 'solinganallur', 'sholinga', 'sholinganallur junction'] 
    },
    { 
      name: 'Kumaran Nagar', 
      region: 'OMR IT Corridor', 
      lat: 12.8720, 
      lon: 80.2270, 
      aliases: ['kumaran nagar omr'] 
    },
    { 
      name: 'Semmancheri', 
      region: 'OMR IT Corridor', 
      lat: 12.8640, 
      lon: 80.2265, 
      aliases: ['chemmencherry', 'chemmancheri', 'semmanchery', 'chemmenchery', 'semmancheri police station', 'chemmanchery'] 
    },
    { 
      name: 'Navalur', 
      region: 'OMR IT Corridor', 
      lat: 12.8458, 
      lon: 80.2265, 
      aliases: ['navalur toll', 'vivira mall', 'navalur junction'] 
    },
    { 
      name: 'Egattur', 
      region: 'OMR IT Corridor', 
      lat: 12.8360, 
      lon: 80.2240, 
      aliases: ['egatur', 'hiranandani egattur'] 
    },
    { 
      name: 'Siruseri (SIPCOT)', 
      region: 'OMR IT Corridor', 
      lat: 12.8256, 
      lon: 80.2198, 
      aliases: ['siruseri', 'sipcot siruseri', 'sipcot it park', 'tcs siruseri'] 
    },
    { 
      name: 'Kazhipattur', 
      region: 'OMR IT Corridor', 
      lat: 12.8180, 
      lon: 80.2210, 
      aliases: ['kazhipatur'] 
    },
    { 
      name: 'Padur', 
      region: 'OMR IT Corridor', 
      lat: 12.8120, 
      lon: 80.2210, 
      aliases: ['padur junction'] 
    },
    { 
      name: 'Pudupakkam', 
      region: 'OMR IT Corridor', 
      lat: 12.8050, 
      lon: 80.2210, 
      aliases: ['pudhupakkam'] 
    },
    { 
      name: 'Kelambakkam', 
      region: 'OMR IT Corridor', 
      lat: 12.7845, 
      lon: 80.2208, 
      aliases: ['kelambakkam junction', 'kelambakkam bus stand'] 
    },
    { 
      name: 'Thiruporur', 
      region: 'OMR IT Corridor', 
      lat: 12.7230, 
      lon: 80.1915, 
      aliases: ['tiruporur', 'thiruporur murugan temple'] 
    },

    // --- ECR Coastal Corridor ---
    { 
      name: 'Kottivakkam', 
      region: 'ECR Coastal Corridor', 
      lat: 12.9690, 
      lon: 80.2590, 
      aliases: ['kottivakkam beach', 'kottivakkam signal'] 
    },
    { 
      name: 'Palavakkam', 
      region: 'ECR Coastal Corridor', 
      lat: 12.9610, 
      lon: 80.2580, 
      aliases: ['palavakkam beach', 'palavakkam signal'] 
    },
    { 
      name: 'Neelankarai', 
      region: 'ECR Coastal Corridor', 
      lat: 12.9490, 
      lon: 80.2570, 
      aliases: ['neelankarai beach', 'neelankarai police station'] 
    },
    { 
      name: 'Injambakkam', 
      region: 'ECR Coastal Corridor', 
      lat: 12.9230, 
      lon: 80.2540, 
      aliases: ['prarthana drive-in', 'vpg injambakkam'] 
    },
    { 
      name: 'Akkarai', 
      region: 'ECR Coastal Corridor', 
      lat: 12.8980, 
      lon: 80.2510, 
      aliases: ['akkarai junction', 'akkarai water tank'] 
    },
    { 
      name: 'Panaiyur', 
      region: 'ECR Coastal Corridor', 
      lat: 12.8800, 
      lon: 80.2500, 
      aliases: ['panaiyur beach'] 
    },
    { 
      name: 'Uthandi', 
      region: 'ECR Coastal Corridor', 
      lat: 12.8600, 
      lon: 80.2480, 
      aliases: ['uthandi toll', 'uthandi beach'] 
    },
    { 
      name: 'Kanathur', 
      region: 'ECR Coastal Corridor', 
      lat: 12.8450, 
      lon: 80.2470, 
      aliases: ['kanathur reddikuppam', 'mayajaal'] 
    },
    { 
      name: 'Muttukadu', 
      region: 'ECR Coastal Corridor', 
      lat: 12.8250, 
      lon: 80.2450, 
      aliases: ['muttukadu boat house', 'mgm dizee world'] 
    },
    { 
      name: 'Kovalam', 
      region: 'ECR Coastal Corridor', 
      lat: 12.7925, 
      lon: 80.2514, 
      aliases: ['kovalam beach', 'covelong', 'kovalam bridge'] 
    },
    { 
      name: 'Thiruvidanthai', 
      region: 'ECR Coastal Corridor', 
      lat: 12.7600, 
      lon: 80.2400, 
      aliases: ['nithya kalyana perumal temple'] 
    },
    { 
      name: 'Mahabalipuram', 
      region: 'ECR Coastal Corridor', 
      lat: 12.6269, 
      lon: 80.1927, 
      aliases: ['mamallapuram', 'shore temple', 'mahabs'] 
    },

    // =========================================================================
    // 6. CHENNAI - VELACHERY, MEDAVAKKAM & GST SOUTH SUBURBS
    // =========================================================================
    { 
      name: 'Velachery', 
      region: 'Velachery / Medavakkam', 
      lat: 12.9815, 
      lon: 80.2180, 
      aliases: ['velachery mrts', 'phoenix marketcity', 'velachery bus terminus'] 
    },
    { 
      name: 'Vijayanagar (Velachery)', 
      region: 'Velachery / Medavakkam', 
      lat: 12.9780, 
      lon: 80.2190, 
      aliases: ['vijayanagar bus stop', 'vijayanagar junction'] 
    },
    { 
      name: 'Kaiveli', 
      region: 'Velachery / Medavakkam', 
      lat: 12.9570, 
      lon: 80.2150, 
      aliases: ['kaiveli junction', 'kaiveli signal'] 
    },
    { 
      name: 'Madipakkam', 
      region: 'Velachery / Medavakkam', 
      lat: 12.9620, 
      lon: 80.1980, 
      aliases: ['madipakkam koot road', 'madipakkam bus stand', 'madippakkam'] 
    },
    { 
      name: 'Nanganallur', 
      region: 'Velachery / GST', 
      lat: 12.9810, 
      lon: 80.1910, 
      aliases: ['nanganallur anjaneyar temple', 'nanganallur market'] 
    },
    { 
      name: 'Keelkattalai', 
      region: 'Velachery / Medavakkam', 
      lat: 12.9540, 
      lon: 80.1870, 
      aliases: ['keelkattalai signal', 'keelkattalai bus terminus'] 
    },
    { 
      name: 'Kovilambakkam', 
      region: 'Velachery / Medavakkam', 
      lat: 12.9300, 
      lon: 80.1900, 
      aliases: ['kovilambakkam junction'] 
    },
    { 
      name: 'Nanmangalam', 
      region: 'Velachery / Medavakkam', 
      lat: 12.9370, 
      lon: 80.1780, 
      aliases: ['nanmangalam reserve forest'] 
    },
    { 
      name: 'Pallikaranai', 
      region: 'Velachery / Medavakkam', 
      lat: 12.9348, 
      lon: 80.2137, 
      aliases: ['pallikaranai marshland', 'pallikaranai oil mill'] 
    },
    { 
      name: 'Narayanapuram', 
      region: 'Velachery / Medavakkam', 
      lat: 12.9310, 
      lon: 80.2080, 
      aliases: ['narayanapuram lake'] 
    },
    { 
      name: 'Medavakkam Koot Road', 
      region: 'Velachery / Medavakkam', 
      lat: 12.9230, 
      lon: 80.1910, 
      aliases: ['medavakkam junction', 'medavakkam flyover'] 
    },
    { 
      name: 'Medavakkam', 
      region: 'Velachery / Medavakkam', 
      lat: 12.9197, 
      lon: 80.1878, 
      aliases: ['medavakkam town', 'medavakkam bus stop'] 
    },
    { 
      name: 'Perumbakkam', 
      region: 'Velachery / Medavakkam', 
      lat: 12.9000, 
      lon: 80.1950, 
      aliases: ['perumbakkam housing board', 'global hospital'] 
    },
    { 
      name: 'Sithalapakkam', 
      region: 'Velachery / Medavakkam', 
      lat: 12.8800, 
      lon: 80.1880, 
      aliases: ['sithalapakkam lake'] 
    },
    { 
      name: 'Sembakkam', 
      region: 'Velachery / Tambaram', 
      lat: 12.9230, 
      lon: 80.1580, 
      aliases: ['sembakkam bus stop'] 
    },
    { 
      name: 'Hasthinapuram', 
      region: 'Velachery / Chromepet', 
      lat: 12.9420, 
      lon: 80.1580, 
      aliases: ['hasthinapuram bus terminus'] 
    },
    { 
      name: 'Chitlapakkam', 
      region: 'Velachery / Chromepet', 
      lat: 12.9360, 
      lon: 80.1450, 
      aliases: ['chitlapakkam lake'] 
    },
    { 
      name: 'Selaiyur', 
      region: 'Tambaram / Suburbs', 
      lat: 12.9180, 
      lon: 80.1380, 
      aliases: ['selaiyur police station'] 
    },
    { 
      name: 'Camp Road', 
      region: 'Tambaram / Suburbs', 
      lat: 12.9150, 
      lon: 80.1330, 
      aliases: ['camp road junction', 'selaiyur camp road'] 
    },
    { 
      name: 'Meenambakkam', 
      region: 'GST Corridor', 
      lat: 12.9850, 
      lon: 80.1750, 
      aliases: ['chennai airport', 'airport cargo', 'meenambakkam metro'] 
    },
    { 
      name: 'Tirusulam', 
      region: 'GST Corridor', 
      lat: 12.9770, 
      lon: 80.1650, 
      aliases: ['tirusulam railway station', 'airport station'] 
    },
    { 
      name: 'Pallavaram', 
      region: 'GST Corridor', 
      lat: 12.9675, 
      lon: 80.1491, 
      aliases: ['pallavaram flyover', 'pallavaram bus stand', 'pallavaram market'] 
    },
    { 
      name: 'Chromepet', 
      region: 'GST Corridor', 
      lat: 12.9516, 
      lon: 80.1462, 
      aliases: ['chromepet railway station', 'mit bridge', 'clri chromepet'] 
    },
    { 
      name: 'Sanatorium', 
      region: 'GST Corridor', 
      lat: 12.9380, 
      lon: 80.1250, 
      aliases: ['tambaram sanatorium', 'tb hospital', 'mepz'] 
    },
    { 
      name: 'Tambaram', 
      region: 'GST Corridor', 
      lat: 12.9249, 
      lon: 80.1000, 
      aliases: ['tambaram railway station', 'tambaram bus stand', 'tambaram market', 'tambaram west', 'tambaram east'] 
    },
    { 
      name: 'Perungalathur', 
      region: 'GST Corridor', 
      lat: 12.9050, 
      lon: 80.0880, 
      aliases: ['perungalathur bus stop', 'perungalathur bypass', 'perungalathur station'] 
    },
    { 
      name: 'Vandalur', 
      region: 'GST Corridor', 
      lat: 12.8910, 
      lon: 80.0810, 
      aliases: ['vandalur zoo', 'crescent college', 'vandalur bridge', 'vandalur railway station'] 
    },
    { 
      name: 'Urapakkam', 
      region: 'GST Corridor', 
      lat: 12.8680, 
      lon: 80.0720, 
      aliases: ['urapakkam railway station'] 
    },
    { 
      name: 'Guduvancheri', 
      region: 'GST Corridor', 
      lat: 12.8430, 
      lon: 80.0630, 
      aliases: ['guduvanchery bus terminus', 'guduvanchery railway station'] 
    },
    { 
      name: 'Potheri', 
      region: 'GST Corridor', 
      lat: 12.8230, 
      lon: 80.0430, 
      aliases: ['srm university potheri', 'potheri railway station'] 
    },
    { 
      name: 'Maraimalai Nagar', 
      region: 'GST Corridor', 
      lat: 12.7980, 
      lon: 80.0270, 
      aliases: ['ford factory maraimalai nagar', 'mmnagar'] 
    },
    { 
      name: 'Singaperumal Koil', 
      region: 'GST Corridor', 
      lat: 12.7620, 
      lon: 80.0030, 
      aliases: ['sp koil', 'singaperumalkoil'] 
    },
    { 
      name: 'Chengalpattu', 
      region: 'GST Corridor', 
      lat: 12.6841, 
      lon: 79.9836, 
      aliases: ['chengalpet', 'chengalpattu junction', 'chengalpattu old bus stand'] 
    },
    { 
      name: 'Padappai', 
      region: 'South Industrial Corridor', 
      lat: 12.8800, 
      lon: 80.0200, 
      aliases: ['padappai junction'] 
    },
    { 
      name: 'Oragadam', 
      region: 'South Industrial Corridor', 
      lat: 12.8300, 
      lon: 79.9500, 
      aliases: ['oragadam sipcot', 'oragadam junction'] 
    },

    // =========================================================================
    // 7. COIMBATORE & SUBURBS
    // =========================================================================
    { 
      name: 'Gandhipuram', 
      region: 'Coimbatore', 
      lat: 11.0183, 
      lon: 76.9678, 
      aliases: ['gandhipuram bus stand', 'gandhipuram central', 'coimbatore central'] 
    },
    { 
      name: 'Ukkadam', 
      region: 'Coimbatore', 
      lat: 10.9900, 
      lon: 76.9600, 
      aliases: ['ukkadam bus stand', 'ukkadam lake'] 
    },
    { 
      name: 'RS Puram', 
      region: 'Coimbatore', 
      lat: 11.0080, 
      lon: 76.9500, 
      aliases: ['r s puram', 'db road rs puram'] 
    },
    { 
      name: 'Peelamedu', 
      region: 'Coimbatore', 
      lat: 11.0280, 
      lon: 77.0100, 
      aliases: ['psg tech peelamedu', 'coimbatore airport peelamedu'] 
    },
    { 
      name: 'Hopes College', 
      region: 'Coimbatore', 
      lat: 11.0250, 
      lon: 77.0020, 
      aliases: ['hopes', 'avinashi road hopes'] 
    },
    { 
      name: 'Singanallur', 
      region: 'Coimbatore', 
      lat: 10.9950, 
      lon: 77.0250, 
      aliases: ['singanallur bus stand', 'singanallur lake'] 
    },
    { 
      name: 'Saravanampatti', 
      region: 'Coimbatore', 
      lat: 11.0805, 
      lon: 76.9958, 
      aliases: ['saravanampatty', 'kgi tech campus', 'chill seve saravanampatti'] 
    },
    { 
      name: 'Ganapathy', 
      region: 'Coimbatore', 
      lat: 11.0380, 
      lon: 76.9800, 
      aliases: ['ganapathy bus stop', 'sathy road ganapathy'] 
    },
    { 
      name: 'Saibaba Colony', 
      region: 'Coimbatore', 
      lat: 11.0250, 
      lon: 76.9450, 
      aliases: ['saibaba temple', 'nsr road'] 
    },
    { 
      name: 'Thudiyalur', 
      region: 'Coimbatore', 
      lat: 11.0800, 
      lon: 76.9380, 
      aliases: ['thudiyalur junction', 'mettupalayam road thudiyalur'] 
    },
    { 
      name: 'Kovaipudur', 
      region: 'Coimbatore', 
      lat: 10.9380, 
      lon: 76.9350, 
      aliases: ['kovai pudur'] 
    },
    { 
      name: 'Pollachi', 
      region: 'Coimbatore District', 
      lat: 10.6609, 
      lon: 77.0048, 
      aliases: ['pollachi bus stand', 'pollachi town'] 
    },
    { 
      name: 'Sulur', 
      region: 'Coimbatore District', 
      lat: 11.0240, 
      lon: 77.1260, 
      aliases: ['sulur air force base', 'sulur bus stand'] 
    },

    // =========================================================================
    // 8. MADURAI & SUBURBS
    // =========================================================================
    { 
      name: 'Mattuthavani', 
      region: 'Madurai', 
      lat: 9.9477, 
      lon: 78.1569, 
      aliases: ['mattuthavani bus stand', 'integrated bus stand madurai', 'mgr bus stand madurai'] 
    },
    { 
      name: 'Periyar Bus Stand', 
      region: 'Madurai', 
      lat: 9.9170, 
      lon: 78.1140, 
      aliases: ['periyar bus stand madurai', 'madurai junction station'] 
    },
    { 
      name: 'Goripalayam', 
      region: 'Madurai', 
      lat: 9.9320, 
      lon: 78.1310, 
      aliases: ['goripalayam mosque', 'goripalayam junction'] 
    },
    { 
      name: 'Simmakkal', 
      region: 'Madurai', 
      lat: 9.9280, 
      lon: 78.1250, 
      aliases: ['simmakkal ground'] 
    },
    { 
      name: 'Tallakulam', 
      region: 'Madurai', 
      lat: 9.9360, 
      lon: 78.1380, 
      aliases: ['tallakulam outhouse', 'tallakulam post office'] 
    },
    { 
      name: 'Anna Nagar (Madurai)', 
      region: 'Madurai', 
      lat: 9.9210, 
      lon: 78.1480, 
      aliases: ['anna nagar madurai', 'ambika theatre'] 
    },
    { 
      name: 'Arapalayam', 
      region: 'Madurai', 
      lat: 9.9360, 
      lon: 78.1060, 
      aliases: ['arapalayam bus stand', 'guru theatre'] 
    },
    { 
      name: 'Teppakulam', 
      region: 'Madurai', 
      lat: 9.9140, 
      lon: 78.1520, 
      aliases: ['vandiyur mariamman teppakulam'] 
    },
    { 
      name: 'Thiruparankundram', 
      region: 'Madurai', 
      lat: 9.8763, 
      lon: 78.0712, 
      aliases: ['thiruparankundram murugan temple', 'thirupparankundram'] 
    },
    { 
      name: 'Melur', 
      region: 'Madurai District', 
      lat: 10.0280, 
      lon: 78.3360, 
      aliases: ['melur bus stand'] 
    },

    // =========================================================================
    // 9. TIRUCHIRAPPALLI (TRICHY) & SUBURBS
    // =========================================================================
    { 
      name: 'Central Bus Stand (Trichy)', 
      region: 'Tiruchirappalli', 
      lat: 10.7930, 
      lon: 78.6870, 
      aliases: ['trichy central', 'central bus stand trichy', 'trichy junction'] 
    },
    { 
      name: 'Chathiram Bus Stand', 
      region: 'Tiruchirappalli', 
      lat: 10.8320, 
      lon: 78.6940, 
      aliases: ['chathiram bus stand trichy', 'st joseph college trichy'] 
    },
    { 
      name: 'Thillai Nagar', 
      region: 'Tiruchirappalli', 
      lat: 10.8220, 
      lon: 78.6870, 
      aliases: ['thillai nagar main road', 'thillainagar'] 
    },
    { 
      name: 'Srirangam', 
      region: 'Tiruchirappalli', 
      lat: 10.8620, 
      lon: 78.6900, 
      aliases: ['srirangam ranganathar temple', 'srirangam rajagopuram'] 
    },
    { 
      name: 'Cantonment', 
      region: 'Tiruchirappalli', 
      lat: 10.8060, 
      lon: 78.6850, 
      aliases: ['cantonment trichy'] 
    },
    { 
      name: 'Thuvakudi', 
      region: 'Tiruchirappalli', 
      lat: 10.7550, 
      lon: 78.8050, 
      aliases: ['nit trichy thuvakudi', 'thuvakudi toll'] 
    },

    // =========================================================================
    // 10. SALEM & SUBURBS
    // =========================================================================
    { 
      name: 'Salem New Bus Stand', 
      region: 'Salem', 
      lat: 11.6680, 
      lon: 78.1460, 
      aliases: ['salem new bus stand', 'meyyanur', 'salem central'] 
    },
    { 
      name: 'Fairlands', 
      region: 'Salem', 
      lat: 11.6780, 
      lon: 78.1450, 
      aliases: ['fairlands salem'] 
    },
    { 
      name: 'Hasthampatti', 
      region: 'Salem', 
      lat: 11.6750, 
      lon: 78.1630, 
      aliases: ['hasthampatti roundtana'] 
    },
    { 
      name: 'Salem Junction', 
      region: 'Salem', 
      lat: 11.6720, 
      lon: 78.1180, 
      aliases: ['salem railway station', 'suramangalam'] 
    },

    // =========================================================================
    // 11. TIRUPPUR & SUBURBS
    // =========================================================================
    { 
      name: 'Tiruppur Old Bus Stand', 
      region: 'Tiruppur', 
      lat: 11.1070, 
      lon: 77.3460, 
      aliases: ['tirupur old bus stand', 'tirupur railway station'] 
    },
    { 
      name: 'Tiruppur New Bus Stand', 
      region: 'Tiruppur', 
      lat: 11.1270, 
      lon: 77.3360, 
      aliases: ['tirupur new bus stand', 'kottaipalayam'] 
    },
    { 
      name: 'Avinashi', 
      region: 'Tiruppur District', 
      lat: 11.1920, 
      lon: 77.2690, 
      aliases: ['avinashi lingeshwarar temple', 'avinashi bus stand'] 
    },

    // =========================================================================
    // 12. ERODE & SUBURBS
    // =========================================================================
    { 
      name: 'Central Bus Stand (Erode)', 
      region: 'Erode', 
      lat: 11.3410, 
      lon: 77.7172, 
      aliases: ['erode bus stand', 'erode central', 'erode junction'] 
    },
    { 
      name: 'Perundurai', 
      region: 'Erode District', 
      lat: 11.2780, 
      lon: 77.5840, 
      aliases: ['perundurai sipcot', 'perundurai bus stand'] 
    },
    { 
      name: 'Bhavani', 
      region: 'Erode District', 
      lat: 11.4500, 
      lon: 77.6830, 
      aliases: ['bhavani sangameshwarar temple', 'bhavani bus stand'] 
    },

    // =========================================================================
    // 13. VELLORE & SUBURBS
    // =========================================================================
    { 
      name: 'New Bus Stand (Vellore)', 
      region: 'Vellore', 
      lat: 12.9320, 
      lon: 79.1360, 
      aliases: ['vellore new bus stand', 'vellore central'] 
    },
    { 
      name: 'Katpadi Junction', 
      region: 'Vellore', 
      lat: 12.9780, 
      lon: 79.1380, 
      aliases: ['katpadi railway station', 'vit vellore katpadi'] 
    },
    { 
      name: 'CMC Hospital (Vellore)', 
      region: 'Vellore', 
      lat: 12.9250, 
      lon: 79.1340, 
      aliases: ['cmc vellore', 'vellore fort'] 
    },
    { 
      name: 'Ranipet', 
      region: 'Ranipet District', 
      lat: 12.9280, 
      lon: 79.3330, 
      aliases: ['ranipet sipcot', 'ranipet bus stand'] 
    },

    // =========================================================================
    // 14. TIRUNELVELI & SUBURBS
    // =========================================================================
    { 
      name: 'Tirunelveli Junction', 
      region: 'Tirunelveli', 
      lat: 8.7280, 
      lon: 77.7150, 
      aliases: ['nellai junction', 'tirunelveli railway station'] 
    },
    { 
      name: 'Palayamkottai', 
      region: 'Tirunelveli', 
      lat: 8.7180, 
      lon: 77.7420, 
      aliases: ['palayamkottai bus stand', 'oxford of south india'] 
    },
    { 
      name: 'New Bus Stand (Tirunelveli)', 
      region: 'Tirunelveli', 
      lat: 8.6980, 
      lon: 77.7280, 
      aliases: ['veinthaankulam bus stand', 'tirunelveli new bus stand'] 
    },

    // =========================================================================
    // 15. OTHER MAJOR TAMIL NADU HUBS
    // =========================================================================
    { name: 'Thanjavur', region: 'Delta Hubs', lat: 10.7870, lon: 79.1378, aliases: ['tanjore', 'brihadeeswarar temple', 'thanjavur new bus stand'] },
    { name: 'Kumbakonam', region: 'Delta Hubs', lat: 10.9602, lon: 79.3845, aliases: ['kumbakonam bus stand', 'mahamaham tank'] },
    { name: 'Dindigul', region: 'Central Hubs', lat: 10.3673, lon: 77.9803, aliases: ['dindigul bus stand', 'dindigul lock'] },
    { name: 'Hosur', region: 'Industrial Hubs', lat: 12.7409, lon: 77.8253, aliases: ['hosur bus stand', 'hosur sipcot', 'bagalur road'] },
    { name: 'Nagercoil', region: 'South Hubs', lat: 8.1833, lon: 77.4119, aliases: ['vadasery bus stand', 'kanyakumari nagercoil'] },
    { name: 'Kanyakumari', region: 'South Hubs', lat: 8.0883, lon: 77.5385, aliases: ['cape comorin', 'vivekananda rock'] },
    { name: 'Cuddalore', region: 'Coastal Hubs', lat: 11.7480, lon: 79.7714, aliases: ['cuddalore port', 'cuddalore bus stand'] },
    { name: 'Villupuram', region: 'Northern Hubs', lat: 11.9401, lon: 79.4861, aliases: ['villupuram junction', 'villupuram bus stand'] }
  ],

  // In-memory cache for dynamic geocoding
  _geocache: {},

  // Clean and phonetically normalize strings for resilient matching in Tamil Nadu
  normalizeQuery(q) {
    if (!q) return '';
    return q.toLowerCase()
      .trim()
      .replace(/[^a-z0-9]/g, '')
      .replace(/^th/, 't')
      .replace(/^ch/, 's')
      .replace(/pp/g, 'p')
      .replace(/tt/g, 't')
      .replace(/kk/g, 'k')
      .replace(/mm/g, 'm')
      .replace(/w/g, 'v');
  },

  // Instant Autocomplete Search (powers live dropdown recommendations as the user types)
  searchSuggestions(query, limit = 6) {
    if (!query || query.trim().length < 1) return [];
    const q = query.trim().toLowerCase();
    const cleanQ = this.normalizeQuery(q);
    const scored = [];

    this.CORRIDOR_LOCALITIES.forEach(loc => {
      const nameLow = loc.name.toLowerCase();
      const cleanName = this.normalizeQuery(nameLow);
      let score = 0;
      let matchedAlias = null;

      if (nameLow === q) {
        score = 100;
      } else if (loc.aliases && loc.aliases.includes(q)) {
        score = 95;
        matchedAlias = q;
      } else if (nameLow.startsWith(q)) {
        score = 80;
      } else if (loc.aliases && loc.aliases.some(a => a.startsWith(q))) {
        score = 75;
        matchedAlias = loc.aliases.find(a => a.startsWith(q));
      } else if (nameLow.includes(q)) {
        score = 60;
      } else if (loc.aliases && loc.aliases.some(a => a.includes(q))) {
        score = 55;
        matchedAlias = loc.aliases.find(a => a.includes(q));
      } else if (cleanName.includes(cleanQ) || (loc.aliases && loc.aliases.some(a => this.normalizeQuery(a).includes(cleanQ)))) {
        score = 45;
        if (loc.aliases) {
          matchedAlias = loc.aliases.find(a => this.normalizeQuery(a).includes(cleanQ));
        }
      }

      if (score > 0) {
        scored.push({
          name: loc.name,
          display: matchedAlias && matchedAlias.toLowerCase() !== loc.name.toLowerCase() 
            ? `${loc.name} (${matchedAlias})`
            : loc.name,
          region: loc.region,
          lat: loc.lat,
          lon: loc.lon,
          score
        });
      }
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit);
  },

  // Fast synchronous check for preloaded locality
  findKnownLocality(name) {
    if (!name) return null;
    const clean = name.trim().toLowerCase();
    const cleanQ = this.normalizeQuery(clean);

    // 1. Exact name match
    const exact = this.CORRIDOR_LOCALITIES.find(l => l.name.toLowerCase() === clean);
    if (exact) return { name: exact.name, region: exact.region, lat: exact.lat, lon: exact.lon };

    // 2. Exact alias match
    const aliasMatch = this.CORRIDOR_LOCALITIES.find(l => l.aliases && l.aliases.includes(clean));
    if (aliasMatch) return { name: aliasMatch.name, region: aliasMatch.region, lat: aliasMatch.lat, lon: aliasMatch.lon };

    // 3. Prefix match
    const prefixMatch = this.CORRIDOR_LOCALITIES.find(l => 
      l.name.toLowerCase().startsWith(clean) || (l.aliases && l.aliases.some(a => a.startsWith(clean)))
    );
    if (prefixMatch) return { name: prefixMatch.name, region: prefixMatch.region, lat: prefixMatch.lat, lon: prefixMatch.lon };

    // 4. Phonetic normalized match
    const phoneticMatch = this.CORRIDOR_LOCALITIES.find(l => {
      if (this.normalizeQuery(l.name) === cleanQ) return true;
      return l.aliases && l.aliases.some(a => this.normalizeQuery(a) === cleanQ);
    });
    if (phoneticMatch) return { name: phoneticMatch.name, region: phoneticMatch.region, lat: phoneticMatch.lat, lon: phoneticMatch.lon };

    // 5. Substring match
    const subMatch = this.CORRIDOR_LOCALITIES.find(l => 
      clean.includes(l.name.toLowerCase()) || l.name.toLowerCase().includes(clean)
    );
    if (subMatch) return { name: subMatch.name, region: subMatch.region, lat: subMatch.lat, lon: subMatch.lon };

    return null;
  },

  // Asynchronous place resolution with persistent OpenStreetMap Nominatim fallback across ALL Tamil Nadu
  async resolvePlace(name) {
    if (!name) return null;
    const clean = name.trim();

    // 1. Check local static database
    const local = this.findKnownLocality(clean);
    if (local) return local;

    // 2. Check local memory / localStorage cache
    const cacheKey = `geo_tn_${clean.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    if (this._geocache[cacheKey]) return this._geocache[cacheKey];
    try {
      const stored = localStorage.getItem(cacheKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        this._geocache[cacheKey] = parsed;
        return parsed;
      }
    } catch {}

    // 3. Fallback to OpenStreetMap Nominatim with Tamil Nadu bias (NOT restricting to Chennai)
    const queries = [
      `${clean}, Tamil Nadu, India`,
      `${clean}, India`
    ];

    for (const queryStr of queries) {
      try {
        const q = encodeURIComponent(queryStr);
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${q}&countrycodes=in&limit=1`;
        const res = await fetch(url, { headers: { 'User-Agent': 'MazhaiAlarm-Sentinel/2.0' } });
        const data = await res.json();
        if (data && data.length > 0) {
          const item = {
            name: clean,
            region: 'Tamil Nadu (Auto-Geocoded)',
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon)
          };
          this._geocache[cacheKey] = item;
          try {
            localStorage.setItem(cacheKey, JSON.stringify(item));
          } catch {}
          return item;
        }
      } catch (e) {
        console.warn('Nominatim geocode query failed for:', queryStr, e);
      }
    }

    return null;
  },

  // Point-to-Line-Segment Haversine Distance (High-Precision corridor projection)
  distToSegment(plat, plon, lat1, lon1, lat2, lon2) {
    const cosLat = Math.cos(plat * Math.PI / 180);
    const dx = (lon2 - lon1) * cosLat;
    const dy = lat2 - lat1;
    if (dx === 0 && dy === 0) {
      return { dist: this.haversineDistance(plat, plon, lat1, lon1), t: 0 };
    }
    const px = (plon - lon1) * cosLat;
    const py = plat - lat1;
    let t = (px * dx + py * dy) / (dx * dx + dy * dy);
    t = Math.max(0, Math.min(1, t));
    const projLat = lat1 + t * (lat2 - lat1);
    const projLon = lon1 + t * (lon2 - lon1);
    return { dist: this.haversineDistance(plat, plon, projLat, projLon), t };
  },

  // Fills large route gaps autonomously using OSRM step landmarks or highway checkpoints
  fillRouteGaps(matchedAreas, sampledCoords, steps, startName, endName, maxGapKm = 5.5) {
    if (matchedAreas.length < 2) return matchedAreas;

    const result = [];
    for (let i = 0; i < matchedAreas.length - 1; i++) {
      result.push(matchedAreas[i]);
      const cur = matchedAreas[i];
      const next = matchedAreas[i + 1];

      const dist = this.haversineDistance(cur.lat, cur.lon, next.lat, next.lon);
      if (dist > maxGapKm && sampledCoords.length > 2) {
        const startIdx = Math.floor(Math.max(0, cur.progress) * (sampledCoords.length - 1));
        const endIdx = Math.ceil(Math.min(1, next.progress) * (sampledCoords.length - 1));

        const numPoints = Math.min(6, Math.floor(dist / maxGapKm));
        for (let p = 1; p <= numPoints; p++) {
          const frac = p / (numPoints + 1);
          const idx = Math.min(sampledCoords.length - 1, Math.max(0, Math.round(startIdx + frac * (endIdx - startIdx))));
          const [lon, lat] = sampledCoords[idx];

          // Check if there is an OSRM road step nearby
          let label = null;
          if (steps && steps.length > 0) {
            const closeStep = steps.find(s => {
              if (!s.maneuver || !s.maneuver.location) return false;
              const [slon, slat] = s.maneuver.location;
              return this.haversineDistance(lat, lon, slat, slon) < 2.5 && 
                     s.name && 
                     s.name.length > 3 && 
                     !result.some(r => r.name.toLowerCase() === s.name.toLowerCase());
            });
            if (closeStep) label = closeStep.name;
          }

          if (!label) {
            const estKm = Math.round(dist * frac);
            label = `${cur.name} - ${next.name} (+${estKm}km)`;
          }

          result.push({
            name: label,
            lat,
            lon,
            region: 'Route Corridor Waypoint',
            progress: cur.progress + frac * (next.progress - cur.progress),
            synthetic: true
          });
        }
      }
    }
    result.push(matchedAreas[matchedAreas.length - 1]);
    return result;
  },

  // Analyzes route with road corridor point-to-segment algorithm & monotonic progress sorting
  async analyzeRouteAreas(startName, endName) {
    const startObj = await this.resolvePlace(startName);
    const endObj = await this.resolvePlace(endName);

    if (!startObj || !endObj) {
      throw new Error(`Could not find coordinates for "${!startObj ? startName : endName}".`);
    }

    let sampledCoords = [];
    let steps = [];

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${startObj.lon},${startObj.lat};${endObj.lon},${endObj.lat}?overview=full&geometries=geojson&steps=true`;
      const res = await fetch(osrmUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      const data = await res.json();
      if (data.routes && data.routes.length > 0 && data.routes[0].geometry && data.routes[0].geometry.coordinates) {
        sampledCoords = data.routes[0].geometry.coordinates; // [[lon, lat], ...]
        if (data.routes[0].legs && data.routes[0].legs[0] && data.routes[0].legs[0].steps) {
          steps = data.routes[0].legs[0].steps;
        }
      }
    } catch (err) {
      console.warn('OSRM route fetch timed out or failed, using linear interpolation fallback:', err);
    }

    // Fallback: If OSRM is unreachable, create an interpolated straight-line corridor between start and end
    if (sampledCoords.length < 2) {
      const stepsCount = 25;
      sampledCoords = [];
      for (let s = 0; s <= stepsCount; s++) {
        const f = s / stepsCount;
        sampledCoords.push([
          startObj.lon + f * (endObj.lon - startObj.lon),
          startObj.lat + f * (endObj.lat - startObj.lat)
        ]);
      }
    }

    const matchedAreas = [];
    const corridorToleranceKm = 0.85; // Strict corridor tolerance prevents opposite direction false matches

    // Point-to-segment scanning across all route vertices
    this.CORRIDOR_LOCALITIES.forEach(loc => {
      let minDist = Infinity;
      let bestProgress = 0;

      for (let i = 0; i < sampledCoords.length - 1; i++) {
        const [lon1, lat1] = sampledCoords[i];
        const [lon2, lat2] = sampledCoords[i + 1];
        const { dist, t } = this.distToSegment(loc.lat, loc.lon, lat1, lon1, lat2, lon2);
        if (dist < minDist) {
          minDist = dist;
          bestProgress = (i + t) / (sampledCoords.length - 1);
        }
      }

      if (minDist <= corridorToleranceKm) {
        matchedAreas.push({
          name: loc.name,
          lat: loc.lat,
          lon: loc.lon,
          region: loc.region,
          dist: minDist,
          progress: bestProgress
        });
      }
    });

    // Filter intermediate matched areas to exclude start and end to avoid displaced endpoints
    const startLow = startObj.name.toLowerCase();
    const endLow = endObj.name.toLowerCase();

    const intermediate = matchedAreas.filter(c => {
      const low = c.name.toLowerCase();
      return low !== startLow && low !== endLow;
    });

    // Sort intermediate stops by chronological route progress
    intermediate.sort((a, b) => a.progress - b.progress);

    // Assemble final sequence strictly bound by Start and Destination
    const sequence = [
      { name: startObj.name, lat: startObj.lat, lon: startObj.lon, region: startObj.region, progress: 0 },
      ...intermediate,
      { name: endObj.name, lat: endObj.lat, lon: endObj.lon, region: endObj.region, progress: 1 }
    ];

    // Deduplicate preserving strict start-to-end order
    const deduped = [];
    const seenNames = new Set();
    sequence.forEach(item => {
      const low = item.name.toLowerCase();
      if (!seenNames.has(low)) {
        seenNames.add(low);
        deduped.push(item);
      }
    });

    // Ensure start is strictly index 0 and destination is strictly the final item
    if (deduped[0].name.toLowerCase() !== startLow) {
      const sIdx = deduped.findIndex(d => d.name.toLowerCase() === startLow);
      if (sIdx > 0) {
        const [sItem] = deduped.splice(sIdx, 1);
        deduped.unshift(sItem);
      }
    }
    if (deduped[deduped.length - 1].name.toLowerCase() !== endLow) {
      const eIdx = deduped.findIndex(d => d.name.toLowerCase() === endLow);
      if (eIdx !== -1 && eIdx < deduped.length - 1) {
        const [eItem] = deduped.splice(eIdx, 1);
        deduped.push(eItem);
      } else if (eIdx === -1) {
        deduped.push({ name: endObj.name, lat: endObj.lat, lon: endObj.lon, region: endObj.region, progress: 1 });
      }
    }

    // Autonomous Gap Filling: If any segment has a gap > 5.5 km, synthesize intermediate waypoints
    const filledAreas = this.fillRouteGaps(deduped, sampledCoords, steps, startObj.name, endObj.name, 5.5);

    // Final string names list
    const areaNames = filledAreas.map(a => a.name);

    return {
      start: startObj,
      end: endObj,
      areas: areaNames, // Array of strings (e.g. ['Ennore', 'Wimco Nagar', ...])
      areaDetails: filledAreas // Array of full objects with lat, lon, region
    };
  },

  // Alias for legacy compatibility with app.js
  async getRouteAndIntermediateAreas(startName, endName) {
    return this.analyzeRouteAreas(startName, endName);
  },

  haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
};

// Global aliases so both RoutingEngine and TamilNaduRoutingEngine work globally
if (typeof window !== 'undefined') {
  window.RoutingEngine = RoutingEngine;
  window.TamilNaduRoutingEngine = RoutingEngine;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RoutingEngine;
}
