FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/states/browser /usr/share/nginx/html
