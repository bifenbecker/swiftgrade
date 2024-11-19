FROM 606042651063.dkr.ecr.eu-central-1.amazonaws.com/service:node

RUN apt update
RUN npm install yarn -g
RUN mkdir /opt/frontend
RUN cd /opt/frontend
COPY ./ .

EXPOSE 3000

CMD [ "sh","-c","yarn start:prod" ]
