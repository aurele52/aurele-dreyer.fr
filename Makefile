NAME			=	transcendance

all				:	$(NAME)

$(NAME)		: 
			@docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

up				:
			@docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

down			:
			@docker-compose -f docker-compose.yml -f docker-compose.prod.yml down

clean			: 	
			@docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v
			@docker system prune -fa

re				:	clean all

dev				: 
			@docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
			@cd apps && npm run dev

dev-down	:
			@fuser -k 3000/tcp || true
			@fuser -k 5173/tcp || true
			@docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

dev-clean	: 	
			@fuser -k 3000/tcp || true
			@fuser -k 5173/tcp || true
			@docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
			@docker system prune -fa

dev-re		:	dev-clean dev

.PHONY: down up clean re dev dev-down dev-clean dev-re