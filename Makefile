static: app/public/css app/public/js app/public/img app/public/fonts app/public/favicon.ico
	cd tojsx && node tojsx.js ../www/build/index.html ../app/client/
www:
	cd www && git pull origin master && make deploy
app/public/%: www/build/% www
	@rsync -cr $< $@

.PHONY: static www
