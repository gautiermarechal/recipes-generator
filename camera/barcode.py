import cv2 #Read image
from pyzbar.pyzbar import decode
import pandas as pd
import numpy as np

cap= cv2.VideoCapture(0)
cap.set(3,640) #3 - Width
cap.set(4,480) #4 - Height
camera = True #Il faudra ajouter: If button is pressed then true, else = False pour l'appli

df = pd.read_csv('en.openfoodfacts.org.products.tsv', sep = '\t') #reads doc
font = cv2.FONT_HERSHEY_PLAIN #font pour lecture live
found = [] #list of ingredients present, keep it like this but need to add a "ajouter a liste des integredients" fonctionnalité
no_data = []

while camera == True:
    success, frame = cap.read() 
    
    for code in decode(frame):
        barcode = code.data.decode('utf-8')
        yy = code.type
        text = "Barcode: {} type: {}".format(barcode,yy)
        cv2.putText(frame,str(code.data),(50,50), font,3,(255,0,0),3) #enables live
        if barcode not in found:
            if (int(barcode) in df.code.values):
                found.append(barcode)
                print(barcode)
                print(df.loc[df['code'] == int(barcode),'product_name'])
            if (int(barcode) not in df.code.values):
                no_data.append(barcode)
                print('Product not found. Please enter product manually')
    cv2.imshow('Testing-code-scan', frame)
    cv2.waitKey(1)
    if cv2.waitKey(1) & 0xFF == 27: #touche 's' ou 'q'
        break
if text:
    print(text)
cap.release()
cv2.destroyAllWindows()


    
"""
cap= cv2.VideoCapture(0)
cap.set(3,640) #3 - Width
cap.set(4,480) #4 - Height
camera = True #If button is pressed then true, else = False; pour l'app

df = pd.read_csv('en.openfoodfacts.org.products.tsv', sep = '\t')

used_codes = df['code'] #list of barcodes in .tsv file

barcode_name = []
prod = []
while camera == True:
    success, frame = cap.read() #success is basically a boolean and frame is what we're interested in
    
    for bcode in decode(frame):
#       if bcode.data.decode('utf-8') not in used_codes:
#            print('Barcode not readable. Please enter mannually')
#       if bcode.data.decode('utf-8') in used_codes:
        test = bcode.data.decode('utf-8')
        barcode_name.append(test)
        prod = df.loc[df['code'] == barcode_name,'product_name']
        #time.sleep(5) #pour laisser un peu de temps entre chaque scan
        print(prod)
    cv2.imshow('Testing-code-scan', frame)
    cv2.waitKey(1)

img = cv2.imread('delete.jpg')
print(decode(img))
"""