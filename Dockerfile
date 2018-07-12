FROM navikt/java:8

RUN apt-get install build-essential checkinstall && apt-get build-dep imagemagick -y &&
    wget http://www.imagemagick.org/download/ImageMagick-6.8.7-7.tar.gz &&
    tar xzvf ImageMagick-6.8.9-1.tar.gz &&
    cd ImageMagick-6.8.9-1/ &&
    ./configure --prefix=/opt/imagemagick-6.8 && make &&
    checkinstall

RUN apt-get update && apt-get -y install ghostscript && apt-get clean

COPY app/target/app.jar /app/app.jar

ENV JAVA_OPTS="-Xmx512m \
               -Djava.security.egd=file:/dev/./urandom \
               -Dspring.profiles.active=nais"