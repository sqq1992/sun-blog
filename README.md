# sun-blog  的koa2博客系统

# 启动项目步骤
1.先启动nginx
2.npm run test-html来启动静态服务
3.npm run dev 启动后端服务

# 文件目录
bin 里面专门跑node的服务代码
app.js 为主业务逻辑入口
html 专门用于测试node后端的前端代码


# 专门通过nginx连接前端和后端  nginx配置
server {
    listen 5007;
    server_name localhost;
    charset utf-8;

    location / {
        proxy_pass http://localhost:5006;
    }

    location /api/ {
        proxy_pass http://localhost:5005;
        proxy_set_header Host $host;
    }
}