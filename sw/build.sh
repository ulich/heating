OUTDIR=$PWD/build
WWWOUT=$OUTDIR/www/heating
OUT=$PWD/heating.tar.gz
OVERLAY=$PWD/src/overlay

rm -rf $OUT $OUTDIR
r.js -o build.js
if [ "$?" -eq 0 ]; then
    cd build
    rm $WWWOUT/build.txt
    rm -rf $WWWOUT/partials
    cp -r $OVERLAY/* $OUTDIR
    tar czf $OUT * --no-same-owner
    cd ..
fi