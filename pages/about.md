---
layout: page
title: About
permalink: /about/
weight: 3
---

# **About Me**

Hi, I am **{{ site.author.name }}** :globe_with_meridians:,<br>

<p style="text-align: justify;">
My interests focus on the research and development of analytical techniques and machine learning for computer vision and image processing to continuously improve a variety of applications, with an emphasis on cutting-edge systems and processes that involve object inspection and measurement algorithms, particularly in digital images and 3D point clouds. Additionally, I am deeply interested in large language models (LLMs), multimodal models (VLMs), generative and diffusion models, and their deployment across diverse real-world applications.
</p>

<div class="text-center my-4">
  <a href="{{ '/assets/cv_es.pdf' | relative_url }}" class="btn btn-primary btn-lg mr-2" target="_blank">
    <i class="fas fa-download mr-2" aria-hidden="true"></i>Download Resume (ES)
  </a>
  <a href="{{ '/assets/cv_en.pdf' | relative_url }}" class="btn btn-primary btn-lg" target="_blank">
    <i class="fas fa-download mr-2" aria-hidden="true"></i>Download Resume (EN)
  </a>
</div>

<div class="row">
{% include about/skills.html title="Programming Skills" source=site.data.programming-skills %}
{% include about/skills.html title="Other Skills" source=site.data.other-skills %}
</div>

## **Professional experience**
<div class="row">
{% include about/timeline_experience.html %}
</div>

## **Education**
<div class="row">
{% include about/timeline.html %}
</div>

{% include about/contact.html %}

