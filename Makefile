all: build

up:
	docker-compose -f docker-compose.yml up

build:
	docker-compose -f docker-compose.yml up --build

down:
	docker-compose -f docker-compose.yml down -v

clean: down
	sudo rm -rf /home/adesgran/data
	sudo docker volume rm -f postgres || true
	sudo docker system prune -fa || true
	sudo systemctl restart docker

re: clean build