# Viblo Javascript SDK

[![Build Status](https://travis-ci.org/viblo-asia/sdk-js.svg?branch=master)](https://travis-ci.org/viblo-asia/sdk-js)
[![npm version](https://badge.fury.io/js/viblo-sdk.svg)](https://badge.fury.io/js/viblo-sdk)

---
## Installing

```
npm install --save viblo-sdk
```
## Basic usage
### - Markdown:
Create folder libs include file **markdown.js** (libs/markdown.js)
```
import { createRenderer } from 'viblo-sdk/markdown';

const md = createRenderer({
  baseURL: 'http://localhost:3000',
  absoluteURL: false,
  embed: {
    wrapperClass: 'embed-responsive embed-responsive-16by9',
    iframeClass: 'embed-responsive-item',
  },
  katex: {
    maxSize: 500,
    maxExpand: 100,
    maxCharacter: 1000,
  },
});

export default md;
```
### Reactjs:

Create components **index.js** (components/Markdown/index.js)
```
import React from 'react';
import PropTypes from 'prop-types'
import md from './libs/markdown';

const Markdown = ({ markdown }) => {
  const rawHtml = md.render(markdown);

  return (
    <div className="md-contents" dangerouslySetInnerHTML={{ __html: rawHtml }} />
  );
}

Markdown.propTypes = {
  markdown: PropTypes.string,
}

Markdown.defaultProps = {
  markdown: '',
}

export default Markdown;

```
Create page **index.js**
```
import Markdown from './components/Markdown'

const Preview = () => {
  return (
    <Markdown markdown={'This is content markdown'} />
  );
}

export default Preview;
```
### Vuejs:
Create components **Mardown.vue** (components/Mardown.vue)
```
<template>
    <div v-html="html"/>
</template>

<script>
    import md from './libs/markdown';

    export default {
        props: {
            content: {
                type: String,
                required: true,
            },
        },

        computed: {
            html() {
                return md.render(this.content);
            },
        },
    };
</script>
```
Create page **index.vue**
```
<template>
   <Markdown :content={'This is content markdown'} />
</template>
<script>
    import Markdown from './components/Markdown.vue'

    export default {
        components: {
            Markdown,
        }
    }
</script
```
[How to use Markdown?](https://viblo.asia/helps/cach-su-dung-markdown-bxjvZYnwkJZ)
---
