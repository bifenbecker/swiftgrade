FROM 606042651063.dkr.ecr.eu-central-1.amazonaws.com/service:SDAPS

RUN mkdir /opt/backend && mkdir /opt/venv/
RUN cd /opt/backend
COPY ./ .
RUN mkdir /static
RUN mkdir -p public/answer_sheets/preview/
RUN mkdir -p public/tmp/
RUN mkdir -p public/user_data/
RUN mkdir /cv_logs
RUN /opt/conda/bin/conda create --prefix /opt/venv/backend python=3.7
RUN echo "source activate env" > ~/.bashrc
ENV PATH /opt/conda/envs/env/bin:$PATH
RUN /opt/venv/backend/bin/pip --version
RUN /opt/venv/backend/bin/pip install -r requirements.txt
RUN LDFLAGS=-fno-lto /opt/venv/backend/bin/pip install gunicorn
RUN cp /tmp/sdaps/build/lib.linux-x86_64-3.6/sdaps/image/image.cpython-36m-x86_64-linux-gnu.so /sdaps/image/image.so
RUN /opt/venv/backend/bin/python3.7 manage.py collectstatic --no-input

EXPOSE 8080

CMD [ "sh","-c","/opt/venv/backend/bin/python manage.py migrate && /opt/venv/backend/bin/python manage.py run_seeds --name all && /opt/venv/backend/bin/gunicorn --access-logfile /cv_logs/access.log --error-logfile /cv_logs/error.log   -w 2 -b :8080 swiftgrade_cv.wsgi:application"]
