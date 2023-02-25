---
title: 'ChakraBaseProvider'
date: '2023-01-01'
---


As of v2.4.2 there is now the addition of **ChakraBaseProvider**. This is a minimal version of ChakraProvider that only supplies theme tokens and not the default component theming.

One of the biggest causes of the large initial JS payload is the size of the component themes. With this approach, you get to apply the theme for just the component you need by using **extendBaseTheme**.

