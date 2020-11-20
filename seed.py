from app import db
from models import Scanner1Img

import os

print('STARTING SEED...')
db.drop_all()
db.create_all()

scanner_1_files = os.listdir('static/images/scanner_1_imgs')
print(scanner_1_files)

Scanner1Img.add_all_imgs(scanner_1_files)

db.session.commit()