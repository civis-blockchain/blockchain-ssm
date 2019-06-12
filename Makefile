NAME   	:= civisblockchain/ssm
IMG    	:= ${NAME}:${VERSION}
LATEST  := ${NAME}:latest

clean: clean-ssm clean-ssm-java

package: package-ssm package-ssm-java

push: push-ssm push-ssm-java

push-latest: push-latest-ssm

clean-ssm:
	rm -fr build

package-ssm:
	@docker build --build-arg VERSION=${VERSION} -f infra/build/Ssm_Dockerfile -t ${IMG} .

push-ssm:
	@docker push ${IMG}

push-latest-ssm:
	@docker tag ${IMG} ${LATEST}
	@docker push ${LATEST}

clean-ssm-java:
	./sdk/java/gradlew -p ./sdk/java  clean

package-ssm-java:
	./sdk/java/gradlew -p ./sdk/java build -i

push-ssm-java:
	./sdk/java/gradlew -p ./sdk/java publish -P version=${VERSION}

inspect-ssm:
	docker run -it ${IMG} sh

package-chaincode:
	@docker-compose -f infra/build/docker-compose.build-ssm.yml run package-chaincode
