#!/bin/bash

rm -rf Dockerfile

# 定义参数
IMAGE_TYPE=$1
NODE_IMAGE=$1
NGINX_IMAGE=$2

# 判断 IMAGE_TYPE 的值
if [ "$IMAGE_TYPE" == "alpine" ]; then
  NODE_IMAGE="node:14-alpine"
  NGINX_IMAGE="nginx:alpine"
else
  NODE_IMAGE="node:14-buster"
  NGINX_IMAGE="nginx:buster"
fi

# 生成 Dockerfile
echo "FROM $NODE_IMAGE AS builder" >> Dockerfile
echo 'WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
' >> Dockerfile
echo "FROM $NGINX_IMAGE AS final" >> Dockerfile
echo 'WORKDIR /app
COPY --from=builder /app/dist/ /usr/share/nginx/html
RUN mkdir -p ./ssl
COPY --from=builder /app/ssl/test/ ./ssl/
EXPOSE 80
EXPOSE 443
ENV APISERVER=http://192.168.131.197:9022
# 复制启动脚本
COPY ./docker-init.sh .
# 设置可执行权限
RUN chmod +x ./docker-init.sh
# 进入容器启动
CMD ["/bin/sh", "./docker-init.sh"]
' >> Dockerfile