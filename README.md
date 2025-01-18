# agarnung.github.io

This portfolio is based on [portfolYOU](https://github.com/yousinix/portfolYOU/tree/master?tab=readme-ov-file).

---

## Instructions for creating a portfolio with Jekyll and Bundler

### 1. Install Jekyll to test the website

Follow the official installation instructions for [Jekyll on Ubuntu](https://jekyllrb.com/docs/installation/ubuntu/) and for [testing GitHub Pages sites with Jekyll locally](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll).

#### Steps:

1. Install the necessary dependencies:
	```bash
	sudo apt-get install ruby-full build-essential zlib1g-dev
	```
2. Set up the environment to install Ruby gems in your user directory:
	```bash
	echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
	echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
	echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
	source ~/.bashrc
	```
3. Install Jekyll and Bundler. If you run into permission issues, use sudo gem install jekyll bundler, although installing gems locally (without sudo) is preferred:
	```bash
	gem install jekyll bundler
	```
4. Verify that Jekyll and Bundler are correctly installed:
	```bash
	jekyll --version
	```
If Bundler isn't installed, follow the instructions on [GeeksforGeeks](https://www.geeksforgeeks.org/how-to-install-ruby-bundler-on-linux/).

Further problems? Keep reading...

### 2) Launch Jekyll and test the website

Follow the official instructions to test GitHub Pages sites with [Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll).

**Steps**:

1.  Navigate to your project directory. For example:
	```bash
	cd /opt/proyectos/agarnung.github.io
	```
2. Create an initial Gemfile with Bundler:
	```bash
	bundle init
	```
3. Open the Gemfile and add the following lines to include Jekyll and the jekyll-gist plugin:
	```bash
	gem 'jekyll'
	gem 'jekyll-gist'
	```
4. Create a _config.yml file in the root of your project with the following basic configuration:
	```yml
	title: agarnung.github.io
	description: My personal portfolio
	baseurl: "" # Empty for local development
	url: ""     # Empty for local development

	plugins:
	  - jekyll-gist
	```
5. Open the _includes/elements/github_edit_footer.html file and leave it empty to avoid errors while testing locally. Later, when the repository is finished and public, you can add the following content:
	```html
	<footer class="github-footer">
	    This page is <b>open source</b>. Noticed a typo? <br />
	    Or something unclear? {% github_edit_link "Improve it on GitHub" %}.
	</footer>
	```
6. Install the dependencies with:
	```bash
	bundle install
	```
7. Verify that the Jekyll gem is installed correctly:
	```bash
	bundle exec jekyll --version
	```
8. Run your Jekyll site locally with:
	```bash
	bundle exec jekyll serve
	```
### Done!
You can now access your website locally at http://127.0.0.1:4000. If you encounter any issues, check the _config.yml and Gemfile, or refer to the official Jekyll documentation.









