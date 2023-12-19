echo '
server {
    listen      80;
    server_name 0.0.0.0;

    root /usr/share/nginx/html;
    index index.html index.htm;

    location / {
        try_files $uri /index.html;
    }

    location /api {
        rewrite ^/api/(.*)$ /a1f90a1c9fbd3160b8374b2ea52b93e9/$1 break;
        proxy_pass '${APISERVER}';
    }
}
server {
    listen      443 ssl;
    server_name 0.0.0.0;

    ssl_certificate /app/ssl/certificate.pem;
    ssl_certificate_key /app/ssl/private.key;

    root /usr/share/nginx/html;
    index index.html index.htm;

    location / {
        try_files $uri /index.html;
    }

    location /api {
        rewrite ^/api/(.*)$ /a1f90a1c9fbd3160b8374b2ea52b93e9/$1 break;
        proxy_pass '${APISERVER}';
    }
}
' >/etc/nginx/conf.d/default.conf
cat /etc/nginx/conf.d/default.conf

nginx -g 'daemon off;'
