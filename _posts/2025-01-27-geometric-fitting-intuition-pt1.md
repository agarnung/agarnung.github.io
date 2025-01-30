---
title: Geometric fitting intuition pt. I
tags: [math, geometry]
style: fill
color: info
description: A friendly introduction to geometric fitting algorithms
---

<img src="../assets/blog_images/2025-01-27-geometric-fitting-intuition-pt1/geompt1.png" alt="geompt1" width=500>

## Introduction

Many concepts for analyzing a geometric problem are applicable to other contexts. For example, in 3D problems involving the computation of distances between pairs of objects (points, line segments, triangles, tetrahedra, etc.), each type of object can be analyzed using specific knowledge about its shape. The unifying idea that brings these problems under a common framework is that objects can be parameterized using zero (point), one (line segment), two (triangle, rectangle), or three (tetrahedron, cube) parameters.
The squared distance between any two points is a quadratic polynomial in the appropriate parameters. A search within the domain of this quadratic function will lead to the parameters corresponding to the closest points on the objects, and thus to the minimum squared distance between them. This provides a powerful and generalizable approach for solving geometric fitting problems in a least-squares sense.

## Paper

To the benefict of better visualization, you can access the post main content in the LaTex PDF attached below:

<script src="/assets/js/pdf.js"></script>

<div class="container text-center" id="pdf-container" style="min-height: 100%;">
  <div id="viewerContainer align-items-center">
    <div id="pdf-viewer" class="mt-6"></div>
  </div>
  <h4 class="font-weight-bold" style="text-align: right; margin-top: 5px"><a target="_blank" href="{{ '/assets/blog_pdfs/2025-01-27-geometric-fitting-intuition-pt1/geometric-fitting-intuition-pt1.pdf' }}">Open as PDF</a></h4>
</div>

<script>
  var url = '../assets/blog_pdfs/2025-01-27-geometric-fitting-intuition-pt1/geometric-fitting-intuition-pt1.pdf';

  pdfjsLib.getDocument(url).promise.then(function (pdf) {
    var viewer = document.getElementById('pdf-viewer');

    for (var pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      var pageContainer = document.createElement('div');
      pageContainer.className = 'pdf-page';

      var canvas = document.createElement('canvas');
      canvas.className = 'pdf-page-canvas';
      pageContainer.appendChild(canvas);

      viewer.appendChild(pageContainer);

      renderPage(pageNumber, canvas, pdf);
    }
  });

  function renderPage(pageNumber, canvas, pdf) {
    pdf.getPage(pageNumber).then(function (page) {
      var viewport = page.getViewport({ scale: 0.2 });
      var scale = canvas.clientWidth / viewport.width;

      var scaledViewport = page.getViewport({ scale: scale });

      var context = canvas.getContext('2d');
      canvas.height = scaledViewport.height;
      canvas.width = scaledViewport.width;

      var renderContext = {
        canvasContext: context,
        viewport: scaledViewport,
      };

      page.render(renderContext);
    });
  }
</script>

## References

[1] https://understandinglinearalgebra.org/sec-least-squares.html

