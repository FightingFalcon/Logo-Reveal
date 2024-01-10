# Logo-Reveal

This repository contains a JavaScript script used to create a dynamic stagger-grid animation with AnimeJS. 
The script is designed to work with multiple containers on a web page, each containing a grid of items and an SVG element. The primary features include responsive grid creation, scroll-triggered animation, and adjustable visibility for SVG elements.

Implementation Details
- The script targets all elements with the class .stagger-container.
- Each container should have a .stagger-grid class for the grid items and may contain an SVG element.
- Grid items are dynamically generated based on the viewport width and specified item size.
- The animation is centered around the middle item in the grid and is responsive to scrolling.

Usage
- Include this script in your HTML file.
- Add elements with the class .stagger-container in your HTML structure.
- Ensure each .stagger-container has a .stagger-grid for the grid and optionally an SVG element.
- Customize grid item size, row count, and other parameters as needed.
