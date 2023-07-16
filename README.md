# Soleadify-Veridion-Assignment

Assignment Software Engineer ETA 17 July 2023

Handbook and documentation:
https://mirceas-ideas.gitbook.io/soleadify-veridion-assignment/

How to start the app:

Step 0 First you want to run elastic on your local env:

```
docker network create elastic
docker pull docker.elastic.co/elasticsearch/elasticsearch:8.8.2
docker run --name elasticsearch --net elastic -p 127.0.0.1:9200:9200 -p 127.0.0.1:9300:9300 -e "discovery.type=single-node" -t docker.elastic.co/elasticsearch/elasticsearch:8.8.2
```

Step 1:
Set elastic-password in config.yml you can take the password from the terminal where you run the last command for elastic

Step 2:
Run minikube (i use: `minikube start --memory 6192 --cpus 6 --driver docker`)

Step 3:
Note: you can change .\config.yml settings to mach your resources.
from the main folder run:

```
kubectl apply -f .\config.yml
kubectl apply -f .\main-api.yml
```

when main-api is running:

```
kubectl apply -f .\data-extractor-job.yml
```

Step 4 run:

```
kubectl get svc
minikube service main-api
```

Copy url and open: /statistics
http://127.0.0.1:63655/statistics

Or take the url and use it within the postman collection to call the API

Other util commands:

build docker image:
`docker build -t mirceah99/soleadify-data-extractor:v1.0.12 .`

```
kubectl get deployment
kubectl delete deployment data-extractor-deployment
```
