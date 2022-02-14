---
title: United States Dataset Statistics
label: 'U.S. Dataset Statistics'
description: "Summary of statistices around the features we aggregate, where we aggregate, and how we aggregate for the United States region."
order: 2
---

# Features (Data) We Aggregate

* 7.9 million US POIs, including:
  * 2.3 million businesses
  * 829,000 transportation-related areas
  * 790,000 health care facilities
  * 440,000 cultural locations
  * 154,000 educational institutions
  * 52,000 government buildings and areas
  * 16,000 industrial areas
  * 10,000 social and community services
* 2.2 million natural and man-made water features, including coastline, rivers, lakes, canals, and reservoirs
* 434,000 local, state, and national parks

**Note:** These are top level categorizations only, however the full dataset is broken down further into subcategories. For instance, we categorize educational institutions further into `specialty_school`, `elementary_or_secondary_school`, and `post_secondary_school`.

# Where We Aggregate

## Quadkeys and 10-Minute Walk Areas

We use quadkeys (see ["What is a quadkey?"](./faq.md#what-is-a-quadkey?)) as the smallest boundary/unit of analysis in our datasets. Each of these quadkeys (at zoom level 19) represents a tile on the Earth's surface with a side length of roughly 75m. We generate quadkey data across the United States (including Puerto Rico, the Virgin Islands, and the Northern Mariana Islands), covering  7.7 million square kilometers. We generate summary statistics for the types of features described above within a 10 minute walk of each quadkey.

For example, the field `public_park_count` tells you how many parks open to the public are within a 10 minute walk of a given quadkey in our `<metro>_qk_isochrone_walk_10m_*` tables.

[Jump to “How We Aggregate”](#how-we-aggregate) for more details.

## Other Boundaries

Iggy has also aggregated geospatial features across other common jurisdictions, including:

* 31,839 postal codes
* 72,635 U.S. Census Tracts
* 215,980 U.S. Census Block Groups
* 2,115 counties
* 929 metropolitan areas
* 25,298 localities

# How We Aggregate

We generate “summary” statistics within each of the boundary types described for each type of feature described above. These statistics include:

* Counts of features
* Per capita counts of features
* For water features and park land, we provide the intersecting area. For instance, `state_park_intersecting_area_in_sqkm` would tell you how much land area is covered by state parks within the given area (ex. Within a specific county). For convenience, we also provide the percentage of the total area covered. In this example, the field would be called `state_park_pct_area_intersecting_boundary`.
* Total length of coastline within the boundary, as `coast_intersecting_length_in_km`.
* For convenience, we also provide booleans flags for water and coastline, so you can refer to `lake_intersects` to see if a particular area contains any lakes, for instance.
