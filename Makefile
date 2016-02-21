all: static
silent:
	  @:
static: app/public/img app/public/fonts silent
	@mkdir -p app/public/css app/public/js
	@cp www/build/favicon.ico app/public/
	@cp www/build/css/site.css app/public/css/
	@cp www/build/js/site.js app/public/js/
	@cd tojsx && node tojsx.js ../www/build/index.html ../app/client/
www:
	@cd www && git pull origin master >/dev/null 2>&1 && make deploy
app/public/%: www/build/% FORCE
	@rsync -cr --exclude="**/slides/" $</ $@
run:
	cd app && meteor run
clean:
	@rm -rf app/public/* app/client/views/navigation.jsx app/client/views/intro.jsx

.PHONY: static www run
FORCE:
