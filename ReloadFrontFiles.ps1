cd ./front
npm run build
cd ..
rmdir -Force -Recurse .\wwwroot\
mkdir ./wwwroot/
cp .\front\dist\* ./wwwroot
cp .\front\dist\assets\* ./wwwroot\assets\