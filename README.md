# Iggy Docs

## Section Templates

### Setting Template Metadata

Define metadata fields from the top of the markdown file using `---` notation.

```md
---
title: 'What is Iggy?'
description: 'An explainer on what is Iggy'
url: 'https://www.askiggy.com'
---

Markdown body content
```

### Metadata Options

key | type | description
---|---|---
`title` | `string` | The title to be displayed on the module
`label` | `string` | The display title for the associated nav item
`description` | `string` | A short description of the content or page
`order` | `number` | The order this page should appear on the nav list relative to its siblings
`display_as` | `'text'`, `'link'`, `'none'` | Controls how the page item appears on the nav list. Defaults to `'link'`.
`url` | `string` | Link the nav item as an external url.


### Home Modules (`home/modules`)

Home modules are content areas that appear on the home page.

#### What is Iggy (`what-is-iggy.md`)

#### Open Data Module (`open-data.md`)

Display

key  | type | description
---|---|---
`featured_datasets` | `[string]` | Array of Open Data dataset ids

### Open Data (`open-data`)

#### Dataset Category (`/open-data/{categoryId}.md`)

key | type | description
---|---|---
`datasets` | `[string]` | Array of dataset IDs to include. This can accept basic `*` matchers.
`exclude_datasets` | `[string]` | Array of dataset IDs to exclude when using `*` matchers.
