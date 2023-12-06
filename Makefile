#编译环境：node:18.17 npm@9.6.7
#如果编译失败：1、尝试删除目录node_modules
#

.PHONY: all

all:
	npm cache clean --force
	rm -rf ./node_modules
	npx pnpm install
	cd packages/mermaid && npm link

