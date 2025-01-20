---
title: Shape Normalization 
tags: [image processing]
style: light
color: secondary
description: A technique to normalize shapes for robustness against varying geometry in identification tasks.
---

## Shape Normalization

The application of certain transformations (e.g., affine) to a binary shape (e.g., contour) can help normalize it against perspective changes in such a way that its main axes align with the coordinates, achieving an effect similar to the T-Net in PointNet. 

This is a way to normalize the shape of objects to make them robust against varying geometry in tasks such as identification.

The basic idea is that after normalization, the object will have a unit scatter matrix multiplied by a constant, which indicates that the shape is as compact as possible.

### Reference

*Image Processing Principles and Applications*, Tinku Acharya & Ajoy K. Ray, p. 200.

