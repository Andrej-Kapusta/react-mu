rm -f *.zip;
now=`date +'%Y-%m-%d-%H-%M-%S'`;
zip -r $now.zip ./* -x "./node_modules/*" "./archive/*";
