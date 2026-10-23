// High-Precision Tamil Nadu Micro-Locality, Autocomplete & Corridor Routing Engine (100% Free)
const RoutingEngine = {
  // Comprehensive Micro-Locality Database with exact coordinates, regions, and search aliases
  CORRIDOR_LOCALITIES: [
    // --- North Chennai: Coastal Corridor ---
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
      aliases: ['basin bridge junction'] 
    },

    // --- North Chennai: Manali / Minjur / Inland Corridor ---
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
      aliases: ['redhills', 'semmaneri redhills', 'red hills bus terminus'] 
    },
    { 
      name: 'Puzhal', 
      region: 'North Chennai (Inland)', 
      lat: 13.1580, 
      lon: 80.1980, 
      aliases: ['puzhal camp', 'puzhal jail'] 
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
      aliases: ['retteri junction', 'retteri bridge'] 
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
      aliases: ['mkb nagar depot'] 
    },

    // --- Central Chennai Corridors ---
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
      aliases: ['chintadripet mrts'] 
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
      name: 'T. Nagar', 
      region: 'Central Chennai', 
      lat: 13.0418, 
      lon: 80.2341, 
      aliases: ['tnagar', 't nagar', 'thyagaraya nagar', 'panagal park', 't nagar bus terminus'] 
    },
    { 
      name: 'Kodambakkam', 
      region: 'Central Chennai', 
      lat: 13.0510, 
      lon: 80.2220, 
      aliases: ['kodambakkam bridge'] 
    },
    { 
      name: 'West Mambalam', 
      region: 'Central Chennai', 
      lat: 13.0370, 
      lon: 80.2230, 
      aliases: ['mambalam station', 'mambalam'] 
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

    // --- OMR / South IT Expressway Corridor ---
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
      aliases: ['thiruvanmiyur bus terminus', 'thiruvanmiyur signal'] 
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

    // --- Velachery / Medavakkam / Pallikaranai Corridor ---
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
      name: 'Kovilambakkam', 
      region: 'Velachery / Medavakkam', 
      lat: 12.9300, 
      lon: 80.1900, 
      aliases: ['kovilambakkam junction'] 
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
      name: 'Mambakkam', 
      region: 'Velachery / Medavakkam', 
      lat: 12.8300, 
      lon: 80.1550, 
      aliases: ['mambakkam junction'] 
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

    // --- GST Road Corridor ---
    { 
      name: 'Kathipara', 
      region: 'GST Corridor', 
      lat: 13.0070, 
      lon: 80.2030, 
      aliases: ['kathipara flyover', 'kathipara cloverleaf', 'guindy kathipara'] 
    },
    { 
      name: 'St. Thomas Mount', 
      region: 'GST Corridor', 
      lat: 12.9980, 
      lon: 80.1950, 
      aliases: ['st thomas mount railway station', 'mount metro'] 
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
      aliases: ['pallavaram flyover', 'pallavaram bus stand'] 
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
      aliases: ['tambaram sanatorium', 'tb hospital'] 
    },
    { 
      name: 'Tambaram', 
      region: 'GST Corridor', 
      lat: 12.9249, 
      lon: 80.1000, 
      aliases: ['tambaram railway station', 'tambaram bus stand', 'tambaram market'] 
    },
    { 
      name: 'Perungalathur', 
      region: 'GST Corridor', 
      lat: 12.9050, 
      lon: 80.0880, 
      aliases: ['perungalathur bus stop', 'perungalathur bypass'] 
    },
    { 
      name: 'Vandalur', 
      region: 'GST Corridor', 
      lat: 12.8910, 
      lon: 80.0810, 
      aliases: ['vandalur zoo', 'crescent college', 'vandalur bridge'] 
    },
    { 
      name: 'Guduvancheri', 
      region: 'GST Corridor', 
      lat: 12.8430, 
      lon: 80.0630, 
      aliases: ['guduvanchery bus terminus'] 
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

    // --- West Corridor / Poonamallee / Ambattur ---
    { 
      name: 'Koyambedu', 
      region: 'West Chennai', 
      lat: 13.0694, 
      lon: 80.1948, 
      aliases: ['cmbt', 'koyambedu bus terminus', 'koyambedu market', 'koyambedu metro'] 
    },
    { 
      name: 'Maduravoyal', 
      region: 'West Chennai', 
      lat: 13.0630, 
      lon: 80.1620, 
      aliases: ['maduravoyal flyover', 'maduravoyal bypass'] 
    },
    { 
      name: 'Porur', 
      region: 'West Chennai', 
      lat: 13.0382, 
      lon: 80.1565, 
      aliases: ['porur roundtana', 'porur junction', 'sri ramachandra hospital'] 
    },
    { 
      name: 'Iyyappanthangal', 
      region: 'West Chennai', 
      lat: 13.0390, 
      lon: 80.1380, 
      aliases: ['iyyappanthangal bus depot'] 
    },
    { 
      name: 'Kumananchavadi', 
      region: 'West Chennai', 
      lat: 13.0450, 
      lon: 80.1180, 
      aliases: ['kumananchavadi signal'] 
    },
    { 
      name: 'Poonamallee', 
      region: 'West Chennai', 
      lat: 13.0487, 
      lon: 80.1054, 
      aliases: ['poonamallee bus terminus', 'poonamallee bypass'] 
    },
    { 
      name: 'Mogappair', 
      region: 'West Chennai', 
      lat: 13.0840, 
      lon: 80.1750, 
      aliases: ['mogappair east', 'mogappair west', 'golden flats'] 
    },
    { 
      name: 'Ambattur Estate', 
      region: 'West Chennai', 
      lat: 13.0980, 
      lon: 80.1620, 
      aliases: ['ambattur industrial estate', 'ambattur ot'] 
    },
    { 
      name: 'Ambattur', 
      region: 'West Chennai', 
      lat: 13.1143, 
      lon: 80.1548, 
      aliases: ['ambattur railway station', 'ti cycles'] 
    },
    { 
      name: 'Avadi', 
      region: 'West Chennai', 
      lat: 13.1147, 
      lon: 80.1018, 
      aliases: ['avadi checkpost', 'avadi bus terminus', 'hvf avadi'] 
    },
    { 
      name: 'Sriperumbudur', 
      region: 'West Chennai', 
      lat: 12.9699, 
      lon: 79.9482, 
      aliases: ['sriperumbudur sipcot', 'hyundai sriperumbudur'] 
    },
    { 
      name: 'Kanchipuram', 
      region: 'Tamil Nadu Major Hubs', 
      lat: 12.8340, 
      lon: 79.7030, 
      aliases: ['kanjeevaram', 'kanchi'] 
    },

    // --- Major Tamil Nadu Hubs ---
    { name: 'Coimbatore', region: 'Tamil Nadu Major Hubs', lat: 11.0168, lon: 76.9558, aliases: ['kovai', 'gandhipuram'] },
    { name: 'Madurai', region: 'Tamil Nadu Major Hubs', lat: 9.9252, lon: 78.1198, aliases: ['mattuthavani', 'meenakshi amman temple'] },
    { name: 'Tiruchirappalli', region: 'Tamil Nadu Major Hubs', lat: 10.7905, lon: 78.7047, aliases: ['trichy', 'thillai nagar', 'central bus stand trichy'] },
    { name: 'Salem', region: 'Tamil Nadu Major Hubs', lat: 11.6643, lon: 78.1460, aliases: ['salem new bus stand'] },
    { name: 'Tirunelveli', region: 'Tamil Nadu Major Hubs', lat: 8.7139, lon: 77.7567, aliases: ['nellai', 'palayamkottai'] },
    { name: 'Erode', region: 'Tamil Nadu Major Hubs', lat: 11.3410, lon: 77.7172, aliases: ['erode bus stand'] },
    { name: 'Tiruppur', region: 'Tamil Nadu Major Hubs', lat: 11.1085, lon: 77.3411, aliases: ['tirupur'] },
    { name: 'Vellore', region: 'Tamil Nadu Major Hubs', lat: 12.9165, lon: 79.1325, aliases: ['cmc vellore', 'vellore fort'] },
    { name: 'Hosur', region: 'Tamil Nadu Major Hubs', lat: 12.7409, lon: 77.8253, aliases: ['hosur bus stand'] },
    { name: 'Thanjavur', region: 'Tamil Nadu Major Hubs', lat: 10.7870, lon: 79.1378, aliases: ['tanjore', 'brihadeeswarar temple'] },
    { name: 'Dindigul', region: 'Tamil Nadu Major Hubs', lat: 10.3673, lon: 77.9803, aliases: ['dindigul bus stand'] },
    { name: 'Nagercoil', region: 'Tamil Nadu Major Hubs', lat: 8.1833, lon: 77.4119, aliases: ['kanyakumari', 'vadasery'] },
    { name: 'Cuddalore', region: 'Tamil Nadu Major Hubs', lat: 11.7480, lon: 79.7714, aliases: ['cuddalore port'] }
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

  // Instant Autocomplete Search (powers live dropdown recommendation as the user types)
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

      // Exact name match
      if (nameLow === q) {
        score = 100;
      } 
      // Exact alias match (e.g. "chemmencherry" -> "Semmancheri")
      else if (loc.aliases && loc.aliases.includes(q)) {
        score = 95;
        matchedAlias = q;
      }
      // Name starts with query
      else if (nameLow.startsWith(q)) {
        score = 80;
      }
      // Alias starts with query
      else if (loc.aliases && loc.aliases.some(a => a.startsWith(q))) {
        score = 75;
        matchedAlias = loc.aliases.find(a => a.startsWith(q));
      }
      // Name contains query
      else if (nameLow.includes(q)) {
        score = 60;
      }
      // Alias contains query
      else if (loc.aliases && loc.aliases.some(a => a.includes(q))) {
        score = 55;
        matchedAlias = loc.aliases.find(a => a.includes(q));
      }
      // Phonetic normalized match
      else if (cleanName.includes(cleanQ) || (loc.aliases && loc.aliases.some(a => this.normalizeQuery(a).includes(cleanQ)))) {
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

  // Asynchronous place resolution with persistent OpenStreetMap Nominatim fallback
  async resolvePlace(name) {
    if (!name) return null;
    const clean = name.trim();

    // 1. Check local static database
    const local = this.findKnownLocality(clean);
    if (local) return local;

    // 2. Check local memory / localStorage cache
    const cacheKey = `geo_${clean.toLowerCase()}`;
    if (this._geocache[cacheKey]) return this._geocache[cacheKey];
    try {
      const stored = localStorage.getItem(cacheKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        this._geocache[cacheKey] = parsed;
        return parsed;
      }
    } catch {}

    // 3. Fallback to OpenStreetMap Nominatim with Tamil Nadu bias
    try {
      const q = encodeURIComponent(`${clean}, Chennai, Tamil Nadu, India`);
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${q}&countrycodes=in&limit=1`;
      const res = await fetch(url, { headers: { 'User-Agent': 'MazhaiAlarm-Sentinel/2.0' } });
      const data = await res.json();
      if (data && data.length > 0) {
        const item = {
          name: clean,
          region: 'Tamil Nadu (OSM Geocoded)',
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
      console.warn('Nominatim geocode fallback failed for:', clean, e);
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

  // Analyzes route with road corridor point-to-segment algorithm & monotonic progress sorting
  async analyzeRouteAreas(startName, endName) {
    const startObj = await this.resolvePlace(startName);
    const endObj = await this.resolvePlace(endName);

    if (!startObj || !endObj) {
      throw new Error(`Could not find coordinates for "${!startObj ? startName : endName}".`);
    }

    let sampledCoords = [];
    try {
      // 5-second timeout controller for OSRM public service
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${startObj.lon},${startObj.lat};${endObj.lon},${endObj.lat}?overview=full&geometries=geojson`;
      const res = await fetch(osrmUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      const data = await res.json();
      if (data.routes && data.routes.length > 0 && data.routes[0].geometry && data.routes[0].geometry.coordinates) {
        sampledCoords = data.routes[0].geometry.coordinates; // [[lon, lat], ...]
      }
    } catch (err) {
      console.warn('OSRM route fetch timed out or failed, using linear interpolation fallback:', err);
    }

    // Fallback: If OSRM is unreachable, create an interpolated straight-line corridor between start and end
    if (sampledCoords.length < 2) {
      const steps = 25;
      sampledCoords = [];
      for (let s = 0; s <= steps; s++) {
        const f = s / steps;
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

    // Ensure start is at index 0 and destination is at the final index
    if (!matchedAreas.some(c => c.name.toLowerCase() === startObj.name.toLowerCase())) {
      matchedAreas.unshift({ name: startObj.name, lat: startObj.lat, lon: startObj.lon, progress: -0.01 });
    }
    if (!matchedAreas.some(c => c.name.toLowerCase() === endObj.name.toLowerCase())) {
      matchedAreas.push({ name: endObj.name, lat: endObj.lat, lon: endObj.lon, progress: 1.01 });
    }

    // Sort strictly in direction of travel (Start -> End)
    matchedAreas.sort((a, b) => a.progress - b.progress);

    // Deduplicate
    const finalAreas = [];
    const areaNames = [];
    matchedAreas.forEach(item => {
      if (!areaNames.some(n => n.toLowerCase() === item.name.toLowerCase())) {
        finalAreas.push(item);
        areaNames.push(item.name);
      }
    });

    return {
      start: startObj,
      end: endObj,
      areas: areaNames, // Array of strings (e.g. ['Ennore', 'Wimco Nagar', ...])
      areaDetails: finalAreas // Array of full objects
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
