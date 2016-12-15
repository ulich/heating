rm -rf build
rm heating.tar.gz
mkdir -p build/www/heating

cd app
npm run build
cd ..
mv app/build/* build/www/heating

find build -name "*.map" -exec rm -rf {} \;

cp -r overlay/* build
cd build
tar czf ../heating.tar.gz *
