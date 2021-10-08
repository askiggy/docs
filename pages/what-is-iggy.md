---
order: 1
title: What is Iggy?
published: false
---

Iggy makes location data accessible to developers. Our tools allow you to ask questions about locations and their context in the broader world. It is the first developer toolkit that simplifies access to complex location data. Our customers are using Iggy to build location features faster and expand what's possible with location data. Easily implement data as varied as weather, environmental risk and POIs into your product, tools and apps.

# How do I start using Iggy?

* You will need to [sign up for a free Iggy account](https://www.askiggy.com/signup)
* You will need some locations as points (a single point on Earth, represented by a `latitude` and `longitude`), or any other GeoJSON geometry, such as polygons or linestrings
* Select and download an [Open Dataset](/datasets)

# Getting Started with Open Data

## What's the difference between Features and Properties?

A Feature is a thing in the world with a geometry and a set of Properties. A Feature's geometry defines its location. Geometries have types. A Point geometry represents a specific point on the globe, a single longitude and latitude. A Polygon geometry represents a shape that defines a thing or area. Within the Iggy API, Feature geometries are represented using GeoJSON.

A Feature's Properties are an arbitrary set of key/value pairings like total population: 27465 or bicycle_access: True. Within a dataset, all Features share the same types of key/value pairings (though some can have a null value). Properties describe a Feature.

When using Iggy's Open Data, a dataset will either have Features or just Properties. Geometries can be large and slower to work with, so using Properties can help speed up your project's performance when you don't need the geometry.

## What's here?

You can ask Iggy what's at a location (a point), and get data for that location. For example: You can ask Iggy what census tract a location is in, get data about that census tract, whether the neighborhoods votes red or blue, and many other things.

## What's nearest?

You can ask Iggy what's the nearest feature to a location, within a radius. For example: You can ask what or where the nearest bar, fire station, airport, wildfire, and more is within a kilometer and we'll return the feature that's closest to your location.

## What's around here?

You can ask Iggy to retrieve all of the places around your locations within a radius. You can set a radius in meters and find all the features in the dataset that are within that radius. So if you need to know how many and where all the parks are within a kilometer of your locations, you can ask Iggy.

## What else can I do with Iggy?

We've designed our datasets to be easy to work with and there's a lot more you can do than is outlined here. For starters, you can take your polygons and linestrings or any other GeoJSON geometry and enrich them with anyu of our open datasets. If you want to know what's reachable from a location in some amount of time and method of travel, you can do that too (this is a special feature, please contact us if you're interested).

## What data does Iggy have?

We have [over 100 different datasets](/datasets) for everything from hospitals and bars to current wildfires and census demographic data data.
