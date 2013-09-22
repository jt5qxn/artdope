
rm crystal.css
cat css/base.css >> crystal.css 
for css in $(ls css/*.css)
do
  if test $css != 'css/base.css'; then
    echo $css
    cat $css >> crystal.css
  fi
done

rm crystal.js
cat js/base.js >> crystal.js 
for js in $(ls js/*.js)
do
  if test $js != 'js/base.js'; then
    echo $js
    cat $js >> crystal.js
  fi
done
