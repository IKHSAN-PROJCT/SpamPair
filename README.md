# SpamPair

pkg update -y 

pkg upgrade -y

pkg install git -y 

pkg install nodejs -y 

git clone https://github.com/IKHSAN-PROJCT/SpamPair.git

cd SpamPair

npm init -y 

npm install pino readline @whiskeysockets/baileys

node spam.js
