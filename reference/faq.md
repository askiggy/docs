---
title: Frequently Asked Questions
description: "Answers to frequently asked questions about how to work with Iggy Data and IggyEnrich."
label: 'FAQs'
order: 10
---

# Key Concepts

## What is an Isochrone?

An isochrone is the area accessible from a point within a certain time threshold, given a particular method of travel. An isochrone (iso = equal, chrone = time) is defined as “a line drawn on a map connecting points at which something occurs or arrives at the same time”. This is also used interchangeably with “Walk/Bike/Drive Time” or “Travel Time”.

## What is a Quadkey?

A quadkey refers to a roughly square patch on Earth that can be represented as a map tile. Quadkeys are two-dimensional tile XY coordinates that are combined into one-dimensional strings called quadtree keys, or “quadkeys” for short. Each quadkey uniquely identifies a single tile at a particular level of detail.

We use quadkeys as the smallest unit/boundary of analysis in our sample datasets.

[You can read more about Quadkeys from Bing Maps Tile System](https://docs.microsoft.com/en-us/bingmaps/articles/bing-maps-tile-system#tile-coordinates-and-quadkeys)

## How are quadkeys and isochrones related?

We provide features that refer to isochrone boundaries centered on a quadkey. For example, `population_qk_isochrone_walk_10m` gives the population within an area reachable via a 10-minute walk from the center of a quadkey. This feature is computed by aggregating data (population) within a boundary (the 10-minute isochrone), centered on the pertinent quadkey.

If you were to visualize `population_qk_isochrone_walk_10m` on a map, you’d notice that each quadkey/tile has its own feature value, and that the change in feature values between adjacent quadkeys is gradual. This is expected because the isochrone boundaries centered on adjacent quadkeys largely overlap.

# Working with IggyEnrich

## Why don't I see latitude and longitude in the dataset?

Our dataset represents places in terms of _boundaries_ – from quadkeys (most fine-grained) to counties (coarse-grained). Each of the boundary tables that comes in our dataset has a `geometry` column which defines the location _(polygon)_ of each row.

If you want to use Iggy to create features for an input point (latitude/longitude), one way to do this is using the [IggyEnrich python](https://www.github.com/askiggy/iggy-enrich-python) module. The primary use of the IggyEnrich class within this module is to enrich a user’s dataframe of points by mapping from input _point_ (latitude/longitude) to the enclosing boundaries in order to retrieve the relevant features.

So let’s say you have a data frame containing points, and want to append a bunch of Iggy columns describing the vicinity of each point. Your data frame (`df` in the line of code provided below) needs to have a latitude and longitude column specified:

```
iggy.enrich_df(df, latitude_col="latitude", longitude_col="longitude")
```

Behind the scenes, this code appends columns of Iggy features to `df` by looking up the quadkey associated with each row’s “latitude” and “longitude”, and then mapping from that quadkey to the desired boundary (e.g. CBG or zip code).

[Learn more about IggyEnrich](https://github.com/askiggy/iggy-enrich-python)

## What if my locations are addresses?

You will need to geocode your addresses (convert them from an address string into lat/lng coordinates) before using Iggy. There are a number of geocoding services available on the internet. Here are a few examples to get you started:

* [Mapbox Geocoding API](https://docs.mapbox.com/api/search/geocoding/)
* [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview)
* [Bing Maps Location API](https://docs.microsoft.com/en-us/bingmaps/rest-services/locations/)

# Working with Iggy Data

## How do I load Iggy data and analyze it directly from BigQuery?

> I tried to load the files as external tables in BigQuery, but the conversion of geo columns, such as `POINT` and `POLYGON`, to Bigquery geography functions is not direct.

You can use the following query to import Iggy data into a BigQuery table:

```sql
create table <project>.<dataset>.<new_table> as (
  select * EXCEPT (geometry), ST_GEOGFROMTEXT(geometry)
  as geometry
  from <project>.<dataset>.<external_table>
);
```

## How often is the ACS census data updated?

The ACS data we provide through Iggy refers to the most recently published 5-year estimates (currently 2014-2019). The data is collected over 5 years. The advantages of [using 5-year estimates rather than 1-year estimates](https://www.census.gov/programs-surveys/acs/guidance/estimates.html) is improved statistical reliability, and coverage of geographic boundaries with small sample sizes.

## Where do household income and hose value data come from?

Household income and house value data come from the ACS.

In most cases we present ACS data using the bins published by the ACS. In some cases we combine multiple bins for consistency. If you need features with more fine-grained bins, [please get in touch!](mailto:help@askiggy.com)

# Support

## How do I get help using Iggy?

Email us at help@askiggy.com with any questions you may have. Please include as much information as you can about your project and where you’re running into issues, as well as code samples where possible.
