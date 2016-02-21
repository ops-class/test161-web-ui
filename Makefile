all: silent
silent:
	  @:
static: app/public/css app/public/js app/public/img app/public/fonts app/public/favicon.ico | silent
	@cd tojsx && node tojsx.js ../www/build/index.html ../app/client/
www:
	@cd www && git pull origin master >/dev/null 2>&1 && make deploy
app/public/%: www/build/% www
	@rsync -cr $< $@

.PHONY: static www
