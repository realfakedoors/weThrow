source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.3'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.1.0'
# Use postgresql as the database for Active Record.
gem 'pg', '~> 1.1'
# Use Puma as the app server.
gem 'puma', '~> 5.0'
# Use webpacker to bundle modules.
gem 'webpacker'
# Integrate React.js with Rails views. https://github.com/reactjs/react-rails
gem 'react-rails'
# Pair JSON Web Tokens with Devise for authentication.
gem 'devise-jwt', '~> 0.7.0'
# We'll be storing our bigger data files, like photos, externally on AWS's Simple Storage Service (S3).
gem "aws-sdk-s3", "~> 1.91"
# Secure environment variables.
gem 'figaro'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.4', require: false
# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible.
gem 'rack-cors'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'listen', '~> 3.3'
  gem 'spring'
  # Open outgoing emails in the browser.
  gem 'letter_opener'
  # Auto-run tests.
  gem 'guard'
  gem 'guard-minitest'
end

group :test do
  gem 'capybara'
  gem 'minitest'
  gem 'minitest-reporters'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
