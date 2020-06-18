install:
	npm install

run:
	bin/page-loader.js

test:
	npm test

lint:
	npx eslint .

publish: 
	npm publish --dry-run