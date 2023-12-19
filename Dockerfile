FROM node:14-buster AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:buster AS final
WORKDIR /app
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

