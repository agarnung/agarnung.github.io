---
layout: page
title: About
permalink: /about/
weight: 3
---

<h1><strong data-i18n="about.title">About Me</strong></h1>

<p data-i18n-html="about.hi_html" data-i18n-var-name="{{ site.author.name }}">Hi, I am <strong>{{ site.author.name }}</strong> :globe_with_meridians:,</p>

<p style="text-align: justify;" data-i18n="about.description">
My interests focus on the research and development of analytical techniques and machine learning for computer vision and image processing to continuously improve a variety of applications, with an emphasis on cutting-edge systems and processes that involve object inspection and measurement algorithms, particularly in digital images and 3D point clouds. Additionally, I am deeply interested in large language models (LLMs), multimodal models (VLMs), generative and diffusion models, and their deployment across diverse real-world applications.
</p>

<div class="text-center my-4">
  <a href="{{ '/assets/cv_es.pdf' | relative_url }}" class="btn btn-primary btn-lg mr-2" target="_blank">
    <i class="fas fa-download mr-2" aria-hidden="true"></i><span data-i18n="about.resume_es">Download Resume (ES)</span>
  </a>
  <a href="{{ '/assets/cv_en.pdf' | relative_url }}" class="btn btn-primary btn-lg" target="_blank">
    <i class="fas fa-download mr-2" aria-hidden="true"></i><span data-i18n="about.resume_en">Download Resume (EN)</span>
  </a>
</div>

<div class="row">
{% include about/skills.html title_key="about.programming_skills" title="Programming Skills" source=site.data.programming-skills %}
{% include about/skills.html title_key="about.other_skills" title="Other Skills" source=site.data.other-skills %}
</div>

<h2><strong data-i18n="about.professional_experience">Professional experience</strong></h2>
<div class="row">
{% include about/timeline_experience.html %}
</div>

<h2><strong data-i18n="about.education">Education</strong></h2>
<div class="row">
{% include about/timeline.html %}
</div>

{% include about/contact.html %}
