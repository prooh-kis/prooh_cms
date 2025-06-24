export const ALL_MARKETS = [
  "Delhi NCR"
]

export const ALL_TOUCHPOINTS = [
  "Premium High Street",
  "Golf Course",
  "Neighborhood Premium Mall",
  "Neighborhood Hi-Street",
  "Feeder Route",
  "Arterial Route",
  "CBD-SOHO",
  "Luxury Residential"
]

export const ALL_COHORTS = [
  "Working Professionals-A",
  "Working Professionals-B",
  "Entrepreneurs",
  "HNI (18 yrs - 60 yrs)",
  "Gen-Zs",
  "Gig Workers",
  "College Students (25 yrs - 50 yrs)",
  "Young Adults (18 yrs - 25 yrs)",
  "Diners",
  "Affluent Shoppers"
]

export const DEFINE_ALL_TOUCHPOINTS = [
  {
    type: "Premium High Street",
    definition: "A segment of retail stores and brands that occupy a position between mainstream high-street retailers and luxury brands"
  },
  {
    type: "Golf Course",
    definition: "Designated area specifically designed for playing golf",
  },
  {
    type: "Neighborhood Premium Mall",
    definition: "An upscale shopping center located within or near a residential area, offering a curated mix of high-quality retail stores, dining options, and services",
  },
  {
    type: "Neighborhood Hi-Street",
    definition: "A central, vibrant street in a particular neighborhood that serves as a hub for commerce, social activities, or a gathering place in that area",
  },
  {
    type: "Feeder Route",
    definition: "A transportation route that connects smaller, local areas or neighborhoods to larger, more central routes or hubs",
  },
  {
    type: "Arterial Route",
    definition: "A major roadway or transport route that serves as a primary pathway for traffic, connecting large areas or regions",
  },
  {
    type: "CBD- SOHO",
    definition: "A development trend or an area where both traditional business offices (CBD) and more flexible, small-scale office spaces (SOHO) coexist",
  }, {
    type: "Luxury Residential",
    definition: "A high-end, premium housing designed with top-tier features, materials, and amenities, targeting affluent individuals or families"
  }
];

export const DEFINE_ALL_COHORTS = [
  {
    type: "Working Professionals-A",
    definition: "C-Level Professionals with high level income pockets",
  },
  {
    type: "Working Professionals-B",
    definition: "Professionals with mid level income pockets",
  },
  {
    type: "Entrepreneurs",
    definition: "Having small/medium businesses or cofounders",
  },
  {
    type: "HNI (18 yrs - 60 yrs)",
    definition: "High net worth income individuals",
  },
  {
    type: "Gen-Zs",
    definition: "Tech savy individuals born in mid-to-late 1990s and early 2010s",
  },
  {
    type: "Gig Workers",
    definition: "Individuals who work on a flexible, freelance basis",
  },
  {
    type: "College Students (25 yrs - 50 yrs)",
    definition: "Individuals currently studying in colleges",
  },
  {
    type: "Diners",
    definition: "Individuals who eat at restaurants as preferences",
  },
  {
    type: "Affluent Shoppers",
    definition: "Individuals with higher than average income with significant purchasing power",
  }
]

export const allpois = {
    "Arterial Route": [
      "gas_station",
      "electric_vehicle_charging_station",
      "parking",
      "transit_station",
      "bus_stop",
      "taxi_stand",
      "train_station",
      "airport",
      "convenience_store"
    ],
    "CBD-Corporate Offices": [
      "bank",
      "atm",
      "cafe",
      "coffee_shop",
      "fast_food_restaurant",
      "restaurant",
      "telecommunications_service_provider",
      "insurance_agency",
      "real_estate_agency",
      "travel_agency"
    ],
    "CBD-Govt": [
      "city_hall",
      "courthouse",
      "embassy",
      "local_government_office",
      "police",
      "post_office",
      "school_district"
    ],
    "CBD-SOHO": [
      "cafe",
      "coffee_shop",
      "fast_food_restaurant",
      "bar",
      "bakery",
      "convenience_store",
      "laundry"
    ],
    "Feeder Route": [
      "bus_stop",
      "bus_station",
      "light_rail_station",
      "subway_station",
      "taxi_stand",
      "train_station",
      "convenience_store",
      "fast_food_restaurant"
    ],
    "Golf Course": [
      "golf_course",
      "restaurant",
      "bar"
    ],
    "Govt Hospital": [
      "hospital",
      "medical_lab",
      "pharmacy",
      "doctor",
      "dentist",
      "physiotherapist",
      "drugstore",
      "spa"
    ],
    "High Street": [
      "shopping_mall",
      "clothing_store",
      "electronics_store",
      "department_store",
      "book_store",
      "gift_shop",
      "jewelry_store",
      "market",
      "supermarket",
      "restaurant",
      "cafe"
    ],
    "Joggers Park": [
      "park",
      "playground",
      "fitness_center",
      "sports_club",
      "swimming_pool"
    ],
    "Luxury Mall": [
      "shopping_mall",
      "jewelry_store",
      "clothing_store",
      "restaurant",
      "spa"
    ],
    "Luxury Residential": [
      "resort_hotel",
      "guest_house",
      "grocery_store",
      "pharmacy",
      "bakery"
    ],
    "Neighborhood Hi-Street": [
      "convenience_store",
      "fast_food_restaurant",
      "supermarket",
      "vegetarian_restaurant",
      "pizza_restaurant",
      "bakery",
      "pharmacy"
    ],
    "Neighborhood Premium Mall": [
      "shopping_mall",
      "department_store",
      "electronics_store",
      "home_goods_store",
      "restaurant",
      "cafe"
    ],
    "Premium F&B": [
      "bar",
      "bakery",
      "cafe",
      "coffee_shop",
      "vegetarian_restaurant",
      "ice_cream_shop",
      "indian_restaurant",
      "korean_restaurant"
    ],
    "Premium F&B Cluster": [
      "restaurant",
      "bar",
      "cafe",
      "coffee_shop",
      "fast_food_restaurant"
    ],
    "Premium High Street": [
      "clothing_store",
      "electronics_store",
      "jewelry_store",
      "gift_shop",
      "shopping_mall",
      "book_store",
      "restaurant"
    ],
    "Premium Hotel Cluster": [
      "hotel",
      "resort_hotel",
      "lodging",
      "guest_house",
      "restaurant",
      "spa"
    ],
    "Premium Salons": [
      "beauty_salon",
      "hair_salon",
      "barber_shop",
      "spa"
    ],
    "QSR's": [
      "fast_food_restaurant",
      "pizza_restaurant",
      "coffee_shop",
      "cafe",
      "bakery"
    ]
  }

export const monitoringTypes = [
  {
    icon: "fi fi-ss-brightness flex items-center",
    label: "Day Shot",
    value: "dayShot"
  },
  {
    icon: "fi fi-sr-newspaper flex items-center",
    label: "With Newspaper",
    value: "withNewspaper"
  },
  {
    icon: "fi fi-sr-video-camera-alt flex items-center",
    label: "Loop Video",
    value: "loopVideo"
  },
  {
    icon: "fi fi-ss-moon flex items-center",
    label: "Night Shot",
    value: "nightShot"
  },{
    icon: "fi fi-ss-map-marker-check flex items-center",
    label: "With Geo Tag",
    value: "withGeoTag"
  }
];


export const TIME_ZONES = {
  "t1": [2, 3, 4, 5, 6, 7, 8, 9, 10], // 2-10
  "t2": [11, 12, 13, 14, 15], // 11-3
  "t3": [16, 17, 18, 19, 20], // 4-8
  "t4": [21, 22, 23, 0, 1] // 9-1
}
