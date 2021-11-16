---
id: 'open-data'
title: 'Iggy Open Data'
label: 'Open Data'
---

We’ve done the drudgework of sourcing, interpreting, and cleaning geographic datasets. It should be easier for data scientists and machine learning engineers to access these data. That’s why we’re releasing ready-to-ingest versions of these datasets so that you can get to work faster.

### What's the difference between Features and Properties?

A Feature is a thing in the world with a geometry and a set of Properties. A Feature’s geometry defines its location. Geometries have types. A `Point` geometry represents a specific point on the globe, a single longitude and latitude. A `Polygon` geometry represents a shape that defines a thing or area.

Properties describe a feature. A Feature’s properties are an arbitrary set of key/value pairings like `total population: 27465` or `bicycle_access: True`. Within a dataset, all Features share the same types of key/value pairings (though some can have a null value).

### What's here?

Iggy’s open datasets come in two formats: CSV and GeoJSON.

In CSV format, each row represents a feature. There is always a `geometry` column that provides the feature geometry in Well-known Text (WKT) string format. The remaining columns each represent a property.

In GeoJSON format, each row is a JSON string giving the geojson representation of a single feature. The JSON has a key `”geometry”` that provides the geometry type and coordinates, and a key `”properties”` that details the feature property key value pairs.
