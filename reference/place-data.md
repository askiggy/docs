---
title: Iggy Place Data
label: Place Data
order: 1
---

This page gives an overview of the model-ready data and features that Iggy provides. This is meant to accompany the [Iggy Data Dictionary](/reference/data-dictionary).

# How Iggy thinks about location features

At Iggy, we think about location-related features in terms of **boundaries**, data **sources**, and **aggregations**. These three components form the core of our data model. Put most simply, each Iggy feature is the result of an **aggregation** applied to an underlying data **source** within a **boundary**.

## Boundaries

Many data sets have location fields that link a row of data to a real place on Earth. Depending on the particular location field, that may be a relatively general place (e.g. a **metro area** or **county**) or a very specific place (e.g. a **parcel** or **address**). Traditionally, some of the challenge in dealing with location data involves conversion from specific to general places. For example, a dataset may have a field for **address**. But the available economic data only comes at the **county** level. How to link from the **address** to the relevant **county**, in order to add features from the economic dataset?

We use the term **boundary** to describe the geographic area over which some data is aggregated. Iggy pre-aggregates features to boundary levels ranging from general (**metro area**) to specific (**parcel**) so that users can pull data at exactly the level they need. For example, if your data set includes a **zip code** field, Iggy provides features that have been pre-aggregated at the **zip code** level like **count of restaurants per capita** within each zip.

Currently Iggy provides features pertaining to the following boundaries, from general to specific:

* `metro` – Census Core Based Statistical Area, identified by CBSA FIPS
* `county` – County, identified by 5-digit FIPS
* `locality` – City, identified by ID from the Who's on First gazetteer
* `zipcode` – Zip Code, identified by 5-digit zip code
* `census_tract` – Census Tract, identified by 11-digit census tract GEOID
* `cbg` – Census Block Group, identified by 12-digit census block group GEOID
* `isochrone_walk_10m` – 10-min Walk Isochrone, identified by local parcel ID

The most fine-grained boundary type we currently offer is the **10-min walk isochrone**, which is the boundary that encompasses the walkable area within 10 min of a parcel or address. By providing features aggregated at this fine-grained level, users with addresses or geographic coordinates can add hyper-local features to their models.

## Data Sources

A **data source** describes the underlying geographic data that is aggregated within a boundary. Each **data source** has rows that represent points, lines, or polygons with geographic coordinates.

Many different types of data can be construed as geographic, such as local businesses, demographics, and topography. Our demo dataset incorporates features computed from the following **data sources**:

### Points of Interest (`poi`)

* Points of interest are businesses and services with a physical presence including restaurants, manufacturing sites, and community centers.
* Our `poi` features are aggregated from an underlying dataset of points, each representing a distinct point of interest and categorized based on the [Iggy Ontology](#iggy-ontology).

### American Community Survey (`acs`)

* The U.S. Census ACS data includes information about demographics, household composition, employment, commute patterns, and housing. Iggy currently relies on ACS data collected over the 5-year period 2014-2019. The primary advantage of using multi-year estimates is the increased statistical reliability for less populated areas and small population subgroups.
* Only census-designated boundaries (`county`, `census_tract`, and `cbg`) incorporate features from `acs`, as these are the levels at which ACS data is reported and provided.

### Water (`water`)

* Iggy produces features that summarize the coastline, rivers, and lakes within a boundary.
* Our `water` features are aggregated from an underlying dataset that represents coastline as lines, and rivers and lakes as polygons.

### Parks (`park`)

* We also provide features calculated based on national, state, and local parks within a boundary.
* Our underlying `park` data represents each park as a polygon.

## Data Attributes

Each **data source** also has one or more **attributes** describing each row that can be used to filter aggregations and derive more interesting features:

### `poi`

`poi` data attributes indicate the POI category, and whether it is a brand/chain:

* Ontology Top-level Category Attributes ([see Iggy Ontology](#iggy-ontology))
  * `is_{top_level_category}`
* Ontology Sub-level Category Attributes ([see Iggy Ontology](#iggy-ontology))
  * `is_{sub_level_category}`
* Chain
  * `is_brandname` indicates whether POI is a brand or chain (e.g. McDonald’s, Dollar Store, Pep Boys)

### `acs`

`acs` data attributes indicate a particular Census summary statistic about the relevant boundary (`county`, `census_tract`, or `cbg`). They cover a variety of types of information:

#### Demographics

Includes attributes related to age (e.g. `median_age`), gender (e.g. `pop_sex_male`, `pop_sex_female_age_5_to_9`), race/ethnicity (e.g. `pop_race_asian`), and birthplace/citizenship (e.g. `pop_citizenship_us_naturalized`).

#### Social

Includes attributes surrounding household composition (e.g. `households_female_head_with_children`, `households_cohabiting_couple`), education (e.g. `pop_adult_education_less_than_high_school`), and veteran status (e.g. `pop_veterans`)

#### Economic

Includes attributes indicating income (e.g. `households_with_annual_income_200000_or_more`, `pop_below_100_pct_poverty_level`), employment status (e.g. `pct_in_labor_force_status_civilian_employed`), and employment industry (e.g. `pop_works_industry_manufacturing`)

#### Commute

Includes attributes indicating (pre-2020) commute habits, including method (e.g. `pop_commutes_by_public_transport_rail`), time (`pop_commute_departure_0630_to_0659`), and duration (`pop_commute_travel_time_20_to_24_min`)

#### Housing

Includes attributes dealing with housing units type (e.g. `housing_units_boat_rv_van`), age (`housing_units_built_1939_or_earlier`), ownership status (`housing_units_renter_occupied`), size (`housing_units_10_to_19_in_structure`), and value (`housing_units_value_150000_to_199999`)

### `water`

`water` data attributes indicate the type of water body.

* Type of water body
  * `is_coastline`
  * `is_river`
  * `is_lake`

### `park`

`park` data attributes indicate the type of park.

* Type of park
  * `is_local_park`
  * `is_state_park`
  * `is_private_park`
  * `is_national_park`
  * `is_national_forest`
  * `is_public_park`

The full set of underlying data sources and attributes is detailed in the [Iggy Data Dictionary](/reference/data-dictionary).

# Iggy Ontology

We use the Iggy Ontology to categorize places in the poi data source. The ontology consists of two levels, detailed below with examples:

## `business`

* `bar`
  * Drinking establishments where alcoholic beverages are served
  * Examples: Missfits Tavern, Barcelona Bar, The American Legion Post 30
* `child_care`
  * Child day care services
  * Examples: KinderCare, Lakeview Headstart, Trinity Lutheran Church And Preschool
* `convenience_store_or_pharmacy`
  * Convenience stores, drug stores, and pharmacies
  * Examples: Mini Mart, Walmart Pharmacy, Kwik Trip
* `cosmetic_and_personal_care_retail`
  * Barber shops, beauty salons, nail salons, diet centers, and other personal care retail services
  * Examples: Nails by Betty, Family Salon, Mat Su Tattoo & Body Piercing
* `death_care`
  * Services pertaining to death care including cemeteries, crematoriums, funeral homes, and funeral services
  * Examples: Park Cemetery, Baird Funeral Home, Old Chapel Burial Ground
* `dry_cleaning_and_laundry`
  * Dry cleaning and laundry services
  * Examples: Big Springs Laundry, Champs Cleaners, Sam's Custom Cleaners
fueling_station
  * Gas and electric vehicle fueling stations and other petroleum products wholesalers
  * Examples: Amoco, Red Bank Municipal Court Charting Station, Speedy Cafe
* `gambling`
  * Casinos and other gambling locations
  * Examples: Debbie's Slots Lounge, Texas Poker Supply, Papa Ray's Sports Bar, Legendary Waters Resort *& Casino
* `games_and_amusement_recreation`
  * Locations for amusement and recreation, including arcades, amusement parks, equestrian, and bowling alleys
  * Examples: West End Bowling & Arcade, ESCAPE Alaska, Silver Wind Stables
* `golf_and_country_club_recreation`
  * Locations for golf courses and country clubs
  * Examples: Belvedere Golf Club, Indian Hills Country Club, Creekside Mini Golf
* `grocery_store`
  * Grocery stores and supermarkets
  * Examples: Pathmark, Country Grocery Store, Nick's Supermarket
* `gyms_and_fitness_recreation`
  * Gyms and fitness centers
  * Examples: Orangetheory Fitness, Jazzercise, Yoga Nest Venice
* `hazardous_waste_disposal_service`
  * Services for managing hazardous waste, including septic tank related services, hazardous waste treatment, and disposal
  * Examples: Carlisle Trash Collection, Heartland Dredging, Dixie Dumpsters
* `marinas_and_yacht_clubs`
  * Marinas and yacht clubs
  * Examples: Sugartree Marina, Vermilion Yacht Club, Johnny's Marina & RV Park
* `martial_arts_and_other_sports_instruction`
  * Businesses that provide sports instruction including martial arts
  * Examples: Excel Taekwondo Academy, React Elite Cheer and Tumble, Goldfish Swim School
* `recycling_and_salvage`
  * Recycling collection and processing centers, and auto or metal salvage
  * Examples: Green Recovery Recycling, Fulton Auto Salvage, Montgomery County Solid Waste District
* `restaurant`
  * Full  *service, limited  *service, and self  *service restaurants including cafeterias, buffets, and snack bars
  * Examples: China King, Trent City Pizzeria, Heavenly Hot Dogs, Toby's Supper Club
* `sightseeing_transportation`
  * Businesses that provide transportation for land or water  *based sightseeing
  * Examples: Beasley's Fishing Charters, Old Town Charters, Private Yacht Charters Florida
* `skiing_facilities`
  * Ski resorts, ski lifts, and ski parks
  * Examples: Snow Creek Ski Area, Tri Town Ski Village, Springhill Winter Park, Mogul Buster Ski & Snowboard School
* `specialty_food_retail`
  * Stores providing specialized food, including bakeries, confectionary, fish and seafood markets, produce markets, meat markets, and other specialty food
  * Examples: Sage Baking Company, Dorothy's Candies, Snow Creek Meat Processing, Seafood America, Fiesta Empanada
* `specialty_retail`
  * Specialized retail including book stores and florists
  * Examples: Swan's Fine Books, Lenora's Flowers and Gifts, Barnes & Noble
* `spectator_sports_arenas_and_clubs`
  * Sports clubs and spectator sports venues, including racetracks
  * Examples: Saratoga Woods Swim Club, Charles Watson Stadium, Atlanta Dragway
* `waste_disposal_service`
  * General waste disposal services, not solely focused on hazardous waste or recycling
  * Examples: Junk King Reno, Ron's Tree Removal, Bobcat Disposal

## `cultural`

* `historical_site`
  - Designated historical sites
  - Examples: Iowa State Capitol, Swing Around Rosie Mural, Deborah Sampson Monument
* `museum`
  - Museums and historical foundations
  - Examples: Brigham City Museum, Chester Gould Dick Tracy Museum, Pasadena Fire Museum
* `nature_recreation`
  - Zoos and botanical gardens
  - Examples: Penguin Encounter, Wildlife Safari, Bear Canyon Ranch and Petting Zoo, The Estate at Florentine Gardens, BVA Compass Roof Garden
* `performance_venue`
  - Venues for performing arts, sports, and similar events
  - Examples: Nat Bailey Stadium, Sadler Ranch, Austin City Limits Studio, Fillmore Auditorium
* `religious_organization`
  - Places of worship and religiously-affiliated charitable organizations
  - Examples: Maranatha Romanian Baptist Church, Holy Transfiguration Monastery, The Soul Factory Inc, St Andrew's Church
* `sports_games_or_other_amusement_recreation`
  - Race tracks and other spectator sports
  - Examples: Atlanta Motor Speedway, Verizon Wireless Center, K1 Speed, Super Rink National Sports Center

## `education`

* `elementary_or_secondary_school`
  - Public and private elementary, middle, and high schools
  - Examples: Springdale High School, Pacelli Catholic High School, San Marino Montessori
* `post_secondary_school`
  - Colleges, junior colleges, universities, and professional schools
  - Examples: Mesalands Community College, Temple University, Concorde Career Institute Tampa
* `specialty_school`
  - Specialty schools including music schools, cooking schools, art schools, language schools, and technical or trade schools
  - Examples: French For the Future, Kutenai Art Therapy Institute, Gemini School of Visual Arts & Communication

## `government`

* `fire_protection`
  - Fire Departments
  - Examples: Bossier City Fire Department Station 3, Manilla Volunteer Fire Department
* `incarceration_location`
  - Correctional institutions where people are incarcerated
  - Examples: Kirkland Correctional Institution, Oceana County. Jail, Wicomico County Detention Center
* `public_safety`
  - Police stations and other justice, public order, and safety activities
  - Examples: Federal Bureau of Investigation, Carroll County Sheriff, Flash Point Investigations

## `health_care`

* `dentistry`
  - Dentists, prosthodontists, and orthodontists
  - Examples: Optimal Dental, Henson Orthodontics
* `general_health_care`
  - General medical and surgical hospitals, and general physicians
  - Examples: Hampstead Primary Care, Trumann Medical Clinic, Marian Medical Center
* `mental_health_care`
  - Offices of mental health practitioners and physicians, and outpatient substance abuse centers
  - Examples: The Counseling Palette, Lifecare Family Services, Cindy Goldsmith LCSW
* `specialty_health_care`
  * other specialized health practitioners
  - Examples: Eye Health Services, Reflection Ridge Chiropractic, Healthcore Physical Therapy, Lakeridge Recovery Long Beach
* `urgent_health_care`
  - Urgent care centers
  - Examples: Baptist Health Urgent Care, Get Well Urgent Care, PhysicianOne Urgent Care

## `industrial`

* `manufacturing`
  * equipment, and other types
  - Examples: Premier Aircraft, Kelly's Appliances, FirstBuild, Gas Electric Parts
* `power_generation`
  - Electric power generation facilities, including hydroelectric, solar, and wind
  - Examples: St Charles Solar, Hamakua Energy Plant, FirstEnergy Springdale Power Station

## `social_and_community_services`

* `environment_conservation_or_wildlife_organization`
  - Environmental, conservation, and wildlife preservation organizations
  - Examples: Bluegrass Doberman Rescue, Landmarks Preservation Society of Southeast, Lake Tahoe Wildlife Care
* `social_advocacy_organization`
  - Other social advocacy organizations
  - Examples: American Legion, Fraternal Order of Eagles
* `youth_individual_or_family_service`
  - Youth, individual, and family support services
  - Examples: Big Brothers Big Sisters, SequelCare, YMCA, Boys & Girls Club of Newport Beach

## `transportation`

* `parking`
  - Parking lots and garages
  - Examples: Zion Park, Memorial Plaza Garage, Galaxy Valet Services
* `rail_transportation`
  - Commuter and freight rail stops, terminals, and railroad administration
  - Examples: MTA New York City Transit Astoria Blvd, Corona West Metrolink Station, SEPTA Kingsessing Av & 65th St
* `road_transportation`
  - Bus stops, terminals, and administration
  - Examples: New Jersey Transit SUNSET RD AT BENTLY LN, Alameda Contra Costa Transit District 14th St Filbert St, Nantucket Regional Transit Authority End of Madaket Road
* `water_transportation`
  - Inland water passenger transportation including ferries
  - Examples: Protection Island Ferry, MBTA Commuter. Boat, Carnival Cruise Lines
* `airport`
  - Airports supporting fixed-wing aircraft
  - Examples: Lewis and Clark Airstrip, Nettle Creek Landings, Chicago O'Hare International Airport
* `heliport`
  - Helipads and heliports
  - Examples: Charlevoix Area Hospital, High Alpine, La National Guard
* `other_air_transportation`
  - Air fields supporting dirigibles, hot air balloons, and ultralights
  - Examples: Flying Machines Airstrip, Ron's Ultralight Fld, Portage Lake Muni
* `other_transportation`
  - Mixed mode and other urban transit stops and administration
  - Examples: Sunset Empire Transportation District Thousand Trail, Tri Rail Sheridan Street Station, Baltimore Water Taxi Canton

# Aggregations and Normalizations

Given a boundary (like a zip code) and a data source (like POIs), Iggy produces features by running an **aggregation** of the data intersecting the boundary. **Aggregations** range from simple (i.e. counts of items intersecting a boundary) to more complex spatial functions (i.e. square km in the intersection between a boundary and a data source like lakes).

In addition to **aggregations**, Iggy also provides features that have additional normalization calculated on top of the **aggregation**, like dividing by the boundary population or area.

The following is a list of the various aggregations and normalizations that are used to produce Iggy features.

## Aggregations

* `[none]`
  Features with no aggregation are generated by taking the raw value from the boundary itself, or from a boundary-linked data source like acs
* `count`
  Count of distinct rows from the underlying data source that intersect a boundary. If the count feature is associated with a data attribute, then the count indicates the number of distinct rows having that particular attribute. For example, the feature poi_is_education_count indicates the number of distinct rows from the poi dataset having the attribute is_education=True
* `intersects`
  A boolean feature indicating whether the boundary intersects any row within the underlying data source
* `intersecting_area_in_sqkm`
  A float feature indicating the total area (in sq km) of the intersection between a boundary and any row in the underlying polygon data source. This can only be computed for data sources whose rows are polygons, like park and water.
* `intersecting_length_in_sqkm`
  A float feature indicating the total length (in km) of the intersection between a boundary and any row in the underlying line data source. This can only be computed for data sources whose rows are lines, like water where is_coastline=True.

## Normalizations

* `per_sqkm`
  Divides the aggregated feature value by the boundary area, in sq km
* `per_capita`
  Divides the aggregated feature value by the boundary population

# Interpreting Features

[The Data Dictionary](/reference/data-dictionary) provides a complete listing of the available Iggy features at each boundary level.

In general, features are named using the following convention:

```
{data_source}[_{data attribute}]_{aggregation}[_{normalization}]
```

For example, the feature `poi_is_museum_count_per_capita` is calculated for a particular boundary by taking the data source poi, filtering for rows where `is_museum=True`, applying the aggregation count within the boundary, and finally applying the `per_capita` normalization to divide the count by the boundary population.

Some feature names deviate slightly from this convention in order to make them more interpretable. For example, the feature `lake_pct_area_intersecting_boundary` is an easier way of expressing the feature generated from lake data source where attribute `is_lake=True`, applying the `intersecting_area_in_sqkm` aggregation, and the `per_sqkm` normalization. The Data Dictionary is searchable by **data source**, **attribute**, **aggregation**, and **normalization** as well as **feature name**.
