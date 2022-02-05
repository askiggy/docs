# Iggy Docs Content

This is the source content repository for the [`docs.askiggy.com`](https://docs.askiggy.com) website. Commits to the `main` branch of this repository will automatically get pushed to the [`askiggy/iggy-docs`](https://github.com/askiggy/iggy-docs) project and deployed to [the Iggy Docs staging site](https://docs.iggy.cloud).

## Managing Content

### Setting Template Metadata

Define metadata fields from the top of the markdown file using `---` notation. Here's an example:

```md
---
title: 'What is Iggy?'
description: 'An explainer on what is Iggy'
url: 'https://www.askiggy.com'
---

Markdown body content
```

### Metadata Options

The following table lists the common metadata keys that can be defined in each document file.

key | type | description
---|---|---
`title` | `string` | The title to be displayed on the module.
`label` | `string` | The display title for the associated nav item.
`description` | `string` | A short description of the content or page.
`slug` | `string` | The slug used to generate the relative path to the page.
`order` | `number` | The order this page should appear on the nav list relative to its siblings.
`url` | `string|boolean` | Define a path or url for this page. Set to `false` to disable linking to the page and only display as a nav header.

## Special Section Templates

### Home Modules (`/home/modules`)

Home modules are content areas that appear on the home landing page of the docs site.

* `what-is-iggy.md` – the "What is Iggy" panel
* `open-data.md` – the "Open Data" panel, which takes the following options:
  key  | type | description
  ---|---|---
  `featured_datasets` | `[string]` | Array of Open Data dataset IDs.

### Open Data (`/open-data`)

The Iggy Open Data section content is partly generated from an index file that is fetched from GCS.

#### Datasets (`/open-data/datasets{datasetID}`)

Content rendered from this index file can be overwritten or supplemented by providing markdown or json files with names that match the datasets' IDs in the `/open-data/datasets` folder.

For example, adding an `open-data/datasets/acs_state_demographics.md` file will merge the contents of this file into the compiled document view for the `acs_state_demographics` dataset.

#### Dataset Category (`/open-data/{categoryId}.md`)

Categories allow for creating subgroups of datasets.

key | type | description
---|---|---
`title` | `string` | The title of the category
`datasets` | `[string]` | Array of dataset IDs to include. This can accept basic `*` matchers.
`exclude_datasets` | `[string]` | Array of dataset IDs to exclude when using `*` matchers.
