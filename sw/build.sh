rm -rf build
rm heating.tar.gz
mkdir -p build/www/heating

cd app
npm run build
npm run deploy
cd ..

cp -r overlay/* build
sed 's/\/heating\/static\//https:\/\/ulich.github.io\/heating\/static\//g' app/build/index.html > build/www/heating/index.html

cd build
tar czf ../heating.tar.gz *
