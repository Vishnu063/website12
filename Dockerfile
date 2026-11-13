FROM nginx:alpine
RUN apk upgrade --no-cache libxslt
COPY index.html style.css app.js /usr/share/nginx/html/
EXPOSE 80
