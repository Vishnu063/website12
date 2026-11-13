FROM nginxinc/nginx-unprivileged:alpine

USER root
RUN apk upgrade --no-cache libxslt

COPY index.html style.css app.js /usr/share/nginx/html/

USER nginx
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/ || exit 1
