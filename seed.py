from app import db
from models import Image

import os

print('STARTING SEED...')
db.drop_all()
db.create_all()

scanner_1_files = os.listdir('static/images/scanner_1_imgs')
p_2020_rain_kids_files = os.listdir('static/images/photo_2020_rain_kids_imgs')
p_2020_cdmx_files = os.listdir('static/images/photo_2020_cdmx_imgs')
p_2019_suburbs_files = os.listdir('static/images/photo_2019_suburbs_imgs')
p_2019_jeremy_files = os.listdir('static/images/photo_2019_jeremy_imgs')
p_2019_innocent_x_files = os.listdir('static/images/photo_2019_innocent_x_imgs')
p_2019_brett_files = os.listdir('static/images/photo_2019_brett_imgs')
p_2018_wing_files = os.listdir('static/images/photo_2018_wing_imgs')
p_2018_ppl_fashion_files = os.listdir('static/images/photo_2018_ppl_fashion_imgs')
p_2018_flowers_files = os.listdir('static/images/photo_2018_flowers_imgs')
p_2017_lifestyle_items_files = os.listdir('static/images/photo_2017_lifestyle_items_imgs')
p_2016_1_files = os.listdir('static/images/photo_2016_1_imgs')

Image.add_all_imgs(scanner_1_files, 'scanner_1_imgs')
Image.add_all_imgs(p_2020_rain_kids_files, 'photo_2020_rain_kids_imgs')
Image.add_all_imgs(p_2020_cdmx_files, 'photo_2020_cdmx_imgs')
Image.add_all_imgs(p_2019_suburbs_files, 'photo_2019_suburbs_imgs')
Image.add_all_imgs(p_2019_jeremy_files, 'photo_2019_jeremy_imgs')
Image.add_all_imgs(p_2019_innocent_x_files, 'photo_2019_innocent_x_imgs')
Image.add_all_imgs(p_2019_brett_files, 'photo_2019_brett_imgs')
Image.add_all_imgs(p_2018_wing_files, 'photo_2018_wing_imgs')
Image.add_all_imgs(p_2018_ppl_fashion_files, 'photo_2018_ppl_fashion_imgs')
Image.add_all_imgs(p_2018_flowers_files, 'photo_2018_flowers_imgs')
Image.add_all_imgs(p_2017_lifestyle_items_files, 'photo_2017_lifestyle_items_imgs')
Image.add_all_imgs(p_2016_1_files, 'photo_2016_1_imgs')

db.session.commit()