import os
import sys
from pathlib import Path

# Directory configuration
current_dir = os.path.dirname(os.path.abspath(__file__))
pythonpath = current_dir

# Create logs directory
log_dir = Path(current_dir) / "logs"
log_dir.mkdir(exist_ok=True)

# Gunicorn config
bind = "0.0.0.0:8000"
workers = 4
worker_class = "uvicorn.workers.UvicornWorker"
reload = True

# Logging
accesslog = str(log_dir / "access.log")
errorlog = str(log_dir / "error.log")
loglevel = "info"
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"'
