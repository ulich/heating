if [ $1 = on ]; then
	./gpio-utils disable 7
	echo making an
fi 

if [ $1 = off ]; then
	./gpio-utils enable 7
	echo making aus
fi
